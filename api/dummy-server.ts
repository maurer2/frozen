import * as http from 'http';
import * as url from 'url';

import statusJson from './dumps/status.json';
import tripJson from './dumps/trip.json';

const routesMap = {
  '/status': statusJson,
  '/trip': tripJson,
} as { [name: string]: any };

const server: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  const { url: urlRaw } = request;
  const currentRoute: string = url.parse(urlRaw).pathname;
  const hasMatchingRoute: boolean = (Object.keys(routesMap) as string[])
    .some((route: string) => currentRoute.includes(route));

  if (hasMatchingRoute) {
    const matchingRoute: string = routesMap[currentRoute];

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(matchingRoute));

    return response;
  }

  response.writeHead(404);
  response.end();

  return response;
});

server.listen(8080, (error?: Error) => {
  if (error) {
    console.log('Error', error);
  }

  console.log('Listening on 8080');
});
