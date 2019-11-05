import * as http from 'http';
import * as url from 'url';

import statusJson from './dumps/status.json';
import tripJson from './dumps/trip.json';

const routesMap = {
  '/status': statusJson,
  '/trip': tripJson,
};

const server = http.createServer((request, response) => {
  const { url: urlRaw } = request;
  const currentRoute = url.parse(urlRaw).pathname;
  const hasMatchingRoute = Object.keys(routesMap).some(route => currentRoute.includes(route));

  if (hasMatchingRoute) {
    const matchingRoute = routesMap[currentRoute];

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(matchingRoute));

    return response;
  }

  response.writeHead(404);
  response.end();

  return response;
});

server.listen(8080, (error) => {
  if (error) {
    console.log('Error', error);
  }

  console.log('Listening on 8080');
});
