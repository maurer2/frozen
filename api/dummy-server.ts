import * as http from 'http';
import * as url from 'url';

import random from 'lodash/random';
import { Status, Trip, TestResponse } from './types';

import statusJson from './dumps/status.json';
import tripJson from './dumps/trip.json';

const status: Status = statusJson;
const { trip }: { trip: Trip } = tripJson;

const getTestData = (): TestResponse => ({
  speed: random(0, 300, false),
  timestamp: Date.now(),
});

const routesMap: { [name: string]: Status | Trip | TestResponse } = {
  '/status': status,
  '/trip': trip,
  '/test': getTestData(),
};

const getRouteData = (routeName: string): Status | Trip | TestResponse | boolean => {
  const routes = Object.keys(routesMap);
  const routeIsMatching: boolean = routes.some((route: string) => route.includes(routeName));

  if (!routeIsMatching) {
    return false;
  }

  return (routeName === '/test') ? getTestData() : routesMap[routeName];
};

const createJSONResponse = (response: http.ServerResponse, data: string): http.ServerResponse => {
  response.setHeader('Content-Type', 'application/json');
  response.end(data);

  return response;
};

const createErrorResponse = (response: http.ServerResponse): http.ServerResponse => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write('404');
  response.end();

  return response;
};

const server: http.Server = http.createServer((
  request: http.IncomingMessage,
  response: http.ServerResponse,
): http.ServerResponse => {
  const { url: urlRaw } = request;
  const currentRoute: string = url.parse(urlRaw).pathname;
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
