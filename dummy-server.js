import * as http from 'http';
import * as url from 'url';
import * as statusJSON from './dumps/status.json';
import * as tripJSON from './dumps/trip.json';

const urlMap = {
  '/status': statusJSON,
  '/trip': tripJSON,
};

const server = http.createServer((request, response) => {
  const { url: urlRaw } = request;
  const urlParsed = url.parse(urlRaw);
  const routeName = urlParsed.pathname;

  if (Object.keys(urlMap).includes(routeName)) {
    response
      .setHeader('Content-Type', 'application/json');

    return response.end(JSON.stringify(urlMap[routeName]));
  }

  return response.end('404');
});

server.listen(8080, (error) => {
  if (error) {
    console.log('Error', error);
  }

  console.log('Listening on 8080');
});
