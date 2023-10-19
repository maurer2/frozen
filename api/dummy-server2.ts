import dotenv from 'dotenv';
import http, {
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from 'node:http';
import { URL } from 'node:url';
import { P, match } from 'ts-pattern';

import type { IcePortal } from './routes/iceportal';

import routesJSONIcePortal from './routes/iceportal.json';

dotenv.config({ debug: true, path: `${__dirname}/../.env` });

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
    const routeData = match(currentRoute)
      .with(
        P.when((route) => Object.values(routesJSONIcePortal).includes(route)),
        (route) => createJSONResponse(response, JSON.stringify({ url: route })),
      )
      .otherwise(() => createErrorResponse(response));

    return routeData;
  },
);

const serverUrl = new URL(`${process.env.URL}:${process.env.PORT}`);

server.listen(
  serverUrl.port,
  parseInt(serverUrl.hostname, 10),
  (error?: Error): void => {
    if (error) {
      console.error('Error', error);
      process.exit();
    }

    const routeList = Object.keys(routesJSONIcePortal).map((route) => ({
      url: new URL(
        (routesJSONIcePortal as IcePortal)[route],
        serverUrl.href,
      ).toString(),
    }));
    console.table(routeList);
  },
);
