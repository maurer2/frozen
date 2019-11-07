import * as http from 'http';
import * as url from 'url';

import random from 'lodash/random';
import { Status, Trip, TestResponse } from './types';

import statusJson from './dumps/status.json';
import tripJson from './dumps/trip.json';

const status: Status = statusJson;
const { trip }: { trip: Trip } = tripJson;
const test: TestResponse = {
  speed: random(0, 300, false),
  timestamp: Date.now(),
};

const routesMap: { [name: string]: Status | Trip | TestResponse } = {
  '/status': status,
  '/trip': trip,
  '/test': test,
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
  const routes = Object.keys(routesMap);
  const routeIsMatching: boolean = routes.some((route: string) => currentRoute.includes(route));

  if (routeIsMatching) {
    const dataFromRoute = routesMap[currentRoute];
    const dataStringified: string = JSON.stringify(dataFromRoute);

    return createJSONResponse(response, dataStringified);
  }

  return createErrorResponse(response);
});

server.listen(8080, (error?: Error): void => {
  if (error) {
    console.log('Error', error);
  }

  console.log('Listening on 8080: http://localhost:8080/test');
});
