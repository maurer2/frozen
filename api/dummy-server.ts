import http, {type ServerResponse, type IncomingMessage, type Server} from 'node:http';
import url from 'node:url';

import random from 'lodash/random';

import statusJson from './dumps/trip-pp9.json';
import tripJson from './dumps/status-00p.json';
import usageInfoJson from './dumps/usage_info-f8r.json';

import {statusSchema, type StatusNew} from './schemas/status/status'
import {tripSchema, type TripNew} from './schemas/trip/trip'
import type {UsageInfoNew} from './schemas/usage-info/usage-info'

export type TestResponse = {
  status: StatusNew | null,
  trip: TripNew | null,
  usageInfo: UsageInfoNew,
  timestamp: number;
}

// typeguards
// workaround until const import is implemented: https://github.com/microsoft/TypeScript/issues/32063
const isStatusNew = (unknownObject: unknown): unknownObject is StatusNew => {
  return statusSchema.safeParse(unknownObject).success;
}

const isTripNew = (unknownObject: unknown): unknownObject is TripNew => {
  return tripSchema.safeParse(unknownObject).success;
}

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

const routesMap: Record<string, StatusNew | TripNew | TestResponse> = {
  '/status': statusJson as StatusNew,
  '/trip': tripJson as TripNew,
  '/test': getTestData(),
};

const getRouteData = (routeName: string): StatusNew | TripNew | TestResponse | boolean => {
  const routes = Object.keys(routesMap);
  const routeIsMatching: boolean = routes.some((route: string) => route.includes(routeName));

  if (!routeIsMatching) {
    return false;
  }

  return (routeName === '/test') ? getTestData() : routesMap[routeName];
};

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
  const { url: urlRaw } = request;

  if (!urlRaw) {
    return createErrorResponse(response);
  }

  const currentRoute = url.parse(urlRaw)?.pathname;

  if (!currentRoute) {
    return createErrorResponse(response);
  }

  const routeData = getRouteData(currentRoute);

  if (!routeData) {
    return createErrorResponse(response);
  }

  const routeDataStringified: string = JSON.stringify(routeData);

  return createJSONResponse(response, routeDataStringified);
});

server.listen(8080, (error?: Error): void => {
  if (error) {
    console.log('Error', error);
  }

  console.log('Listening on 8080: http://localhost:8080/test');
});
