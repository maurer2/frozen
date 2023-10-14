import random from 'lodash.random';
import http, {
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from 'node:http';
import { URL } from 'node:url';
import { P, match } from 'ts-pattern';

import type { TestResponse } from './types';

import tripJson from './dumps/status-00p.json';
import statusJson from './dumps/trip-pp9.json';
import usageInfoJson from './dumps/usage_info-f8r.json';
import { type StatusNew } from './schemas/status/status';
import { type TripNew } from './schemas/trip/trip';
import { type UsageInfoNew } from './schemas/usage-info/usage-info';
import { isStatusNew, isTripNew } from './types';

const getTestData = (): TestResponse => ({
  status: isStatusNew(statusJson)
    ? {
      ...statusJson,
      speed: random(0, 320, false),
    }
    : null,
  timestamp: Date.now(),
  trip: isTripNew(tripJson) ? tripJson : null,
  usageInfo: usageInfoJson,
});

const routeNames = [
  '/status',
  '/tripInfo/trip',
  '/usage_info',
  '/test',
] as const;
type RouteNames = (typeof routeNames)[number];

const routesMap: Record<
  RouteNames,
  StatusNew | TestResponse | TripNew | UsageInfoNew | null
> = {
  '/status': isStatusNew(statusJson) ? statusJson : null,
  '/test': getTestData(),
  '/tripInfo/trip': isTripNew(tripJson) ? tripJson : null,
  '/usage_info': usageInfoJson,
};

const createJSONResponse = (
  response: ServerResponse,
  data: string,
): ServerResponse => {
  response.setHeader('Content-Type', 'application/json');
  response.end(data);

  return response;
};

const createErrorResponse = (response: ServerResponse): ServerResponse => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write('404');
  response.end();

  return response;
};

const server: Server = http.createServer(
  (request: IncomingMessage, response: ServerResponse): ServerResponse => {
    const { headers, url } = request;
    // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/54920
    if (!url) {
      return createErrorResponse(response);
    }

    const currentRoute = new URL(url, `https://${headers.host}`).pathname;

    // https://github.com/microsoft/TypeScript/issues/29729#issuecomment-567871939
    // eslint-disable-next-line @typescript-eslint/ban-types
    const routeData = match(currentRoute)
      // getTestData needs to be dynamic
      .with('/test', () => createJSONResponse(response, JSON.stringify(getTestData())))
      // ignore strings that are not RouteNames
      .with(
        P.when((route): route is RouteNames => routeNames.includes(route as RouteNames)),
        (route) => createJSONResponse(response, JSON.stringify(routesMap[route])),
      )
      .otherwise(() => createErrorResponse(response));

    return routeData;
  },
);

server.listen(8080, 'localhost', (error?: Error): void => {
  if (error) {
    console.error('Error', error);
    process.exit();
  }

  const routeList = routeNames.map((route) => ({
    url: new URL(route, 'http://localhost:8080/').toString(),
  }));
  console.table(routeList);
});
