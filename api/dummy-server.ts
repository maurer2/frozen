import * as http from 'http';
import * as url from 'url';

import random from 'lodash/random';

import statusJson from './dumps/status.json';
import tripJson from './dumps/trip.json';

const routesMap = {
  '/status': statusJson,
  '/trip': tripJson,
  '/test': {
    speed: random(0, 300, false),
    timestamp: Date.now(),
  },
} as { [name: string]: any };

const createJSONResponse = (response: http.ServerResponse, data: string) => {
  const dataStringified = JSON.stringify(data);

  response.setHeader('Content-Type', 'application/json');
  response.end(dataStringified);

  return response;
};

const createErrorResponse = (response: http.ServerResponse) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write('404');
  response.end();

  return response;
};

const server: http.Server = http.createServer((
  request: http.IncomingMessage,
  response: http.ServerResponse,
) => {
  const { url: urlRaw } = request;
  const currentRoute: string = url.parse(urlRaw).pathname;
  const hasMatchingRoute: boolean = (Object.keys(routesMap) as string[])
    .some((route: string) => currentRoute.includes(route));

  if (hasMatchingRoute) {
    const dataOfRoute: string = routesMap[currentRoute];

    return createJSONResponse(response, dataOfRoute);
  }

  return createErrorResponse(response);
});

server.listen(8080, (error?: Error) => {
  if (error) {
    console.log('Error', error);
  }

  console.log('Listening on 8080: http://localhost:8080/test');
});
