import dotenv from 'dotenv';
import http, {
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from 'node:http';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { P, match } from 'ts-pattern';

import type { Routes } from './routes/index.js';

import routesIcePortal from './routes/iceportal.json' assert { type: 'json' };
import routesWifionice from './routes/wifionice.json' assert { type: 'json' };

const dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ debug: true, path: `${dirname}/../.env` });

const savedApiResponses: Routes['savedApiResponses'] = {
  ...routesIcePortal.savedApiResponses,
  ...routesWifionice.savedApiResponses,
};

// todo check for duplicates that would get overwritten
const routes: Routes['pathnames'] = {
  ...routesIcePortal.pathnames,
  ...routesWifionice.pathnames,
};

const routesValueKeyMap = Object.fromEntries(
  Object.entries(routes).map(([routeKey, routePath]) => [routePath, routeKey]),
);

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
  async (
    request: IncomingMessage,
    response: ServerResponse,
  ): Promise<ServerResponse> => {
    const { headers, url } = request;
    // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/54920
    if (!url) {
      return createErrorResponse(response);
    }

    const currentRoute = new URL(url, `https://${headers.host}`).pathname;
    const routeData = await match(currentRoute)
      .with(
        P.when((route) => Object.values(routes).includes(route)),
        (route) => {
          const routeKey = routesValueKeyMap[route];
          const savedApiResponseFileName = savedApiResponses[routeKey];

          // todo trigger otherwise without match
          return import(`./saved-api-responses/${savedApiResponseFileName}`, {
            assert: { type: 'json' },
          })
            .then((file) => createJSONResponse(response, JSON.stringify(file)))
            .catch(() => createErrorResponse(response));
        },
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

    const routeList = Object.keys(routes).map((route) => ({
      url: new URL(routes[route], serverUrl.href).toString(),
    }));
    console.table(routeList);
  },
);
