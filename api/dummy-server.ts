import http, {type ServerResponse, type IncomingMessage, type Server} from 'node:http';
import {URL}  from 'node:url';

import random from 'lodash/random';
import { match, P } from 'ts-pattern';

import statusJson from './dumps/trip-pp9.json';
import tripJson from './dumps/status-00p.json';
import usageInfoJson from './dumps/usage_info-f8r.json';

import {type StatusNew} from './schemas/status/status'
import {type TripNew} from './schemas/trip/trip'

import {isStatusNew, isTripNew} from './types'
import type {TestResponse} from './types';

const getTestData = (): TestResponse => ({
  status: isStatusNew(statusJson)
    ? {
      ...statusJson,
      speed: random(0, 300, false),
    } : null,
  trip: isTripNew(tripJson)
    ? tripJson
    : null,
  usageInfo: usageInfoJson,
  timestamp: Date.now(),
});

const routeNames = ['/status', '/trip', '/test'] as const;
type RouteNames = typeof routeNames[number];

const routesMap: Record<RouteNames, StatusNew | TripNew | TestResponse | null> = {
  '/status': isStatusNew(statusJson) ? statusJson : null,
  '/trip': isTripNew(tripJson) ? tripJson : null,
  '/test': getTestData(),
};
// type RoutePayloads = typeof routesMap[RouteNames];

const createJSONResponse = (response: ServerResponse, data: string): ServerResponse => {
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

const server: Server = http.createServer((
  request: IncomingMessage,
  response: ServerResponse,
): ServerResponse => {
  const { url } = request;
  // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/54920
  if (!url) {
    return createErrorResponse(response);
  }

  const currentRoute = new URL(url, `https://${request.headers.host}`).pathname;

  // https://github.com/microsoft/TypeScript/issues/29729#issuecomment-567871939
  const routeData = match<RouteNames | (string & {})>(currentRoute)
    .with('/', () => createErrorResponse(response))
    // getTestData needs to be dynamic
    .with('/test', () => createJSONResponse(response, JSON.stringify(getTestData())))
    // ignore strings that are not RouteNames
    .with(
      P.when((route): route is RouteNames => routeNames.includes(route as RouteNames)),
      (route) => createJSONResponse(response, JSON.stringify(routesMap[route]))
    )
    .otherwise(() => createErrorResponse(response));

  return routeData;
});

server.listen(8080, (error?: Error): void => {
  if (error) {
    console.log('Error', error);
  }

  console.log('Listening on 8080: http://localhost:8080/test');
});
