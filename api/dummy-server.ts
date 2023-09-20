import http, {type ServerResponse, type IncomingMessage, type Server} from 'node:http';
import url from 'node:url';

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
type RoutePayloads = typeof routesMap[RouteNames];

// const getRouteData = (routeName: RouteNames): RoutePayloads => {
//   const routes = Object.keys(routesMap);
//   const routeIsMatching: boolean = routes.some((route: string) => route.includes(routeName));

//   if (!routeIsMatching || !(routeName in routesMap)) {
//     return null;
//   }

//   return (routeName === '/test') ? getTestData() : routesMap[routeName];
// };

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

// todo make generic and move it to types
function isValidRouteName(route: string, routes: typeof routeNames): route is RouteNames {
  return routes.includes(route as RouteNames);
}

const server: Server = http.createServer((
  request: IncomingMessage,
  response: ServerResponse,
): ServerResponse => {
  const { url: urlRaw } = request;
  if (!urlRaw) {
    return createErrorResponse(response);
  }

  const currentRoute = url.parse(urlRaw)?.pathname;
  if (!currentRoute || !isValidRouteName(currentRoute, routeNames)) {
    return createErrorResponse(response);
  }

  const routeData = match<RouteNames>(currentRoute)
    .with('/test', () => getTestData())
    .with(
      P.when((route) => isValidRouteName(route, routeNames)),
      (route) => routesMap[route]
    )
    .otherwise(() => createErrorResponse(response));

  // const routeData = getRouteData(currentRoute);
  // if (!routeData) {
  //   return createErrorResponse(response);
  // }

  const routeDataStringified = JSON.stringify(routeData);

  return createJSONResponse(response, routeDataStringified);
});

server.listen(8080, (error?: Error): void => {
  if (error) {
    console.log('Error', error);
  }

  console.log('Listening on 8080: http://localhost:8080/test');
});
