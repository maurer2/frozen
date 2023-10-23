import dotenv from 'dotenv';
import http, {
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from 'node:http';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { P, match } from 'ts-pattern';

import type { Route, Routes } from './routes/index.js';

import routesIcePortal from './routes/iceportal.json' assert { type: 'json' };
import routesWifionice from './routes/wifionice.json' assert { type: 'json' };

const dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ debug: true, path: `${dirname}/../.env` });

const routesWithApiResponses: Routes = {
  ...routesIcePortal.routes,
  ...routesWifionice.routes,
};
const routesWithApiResponsesValues: Route[] = Object.values(
  routesWithApiResponses,
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
        P.when((route) => routesWithApiResponsesValues.some(
          ({ pathname }) => pathname === route,
        )),
        (route) => {
          const matchingRoute: Route | undefined = routesWithApiResponsesValues.find(
            ({ pathname }) => pathname === route,
          );

          if (!matchingRoute) {
            createErrorResponse(response);
          }

          // todo trigger otherwise without match
          return import(
            `./saved-api-responses/${matchingRoute?.savedApiResponse}`,
            {
              assert: { type: 'json' },
            }
          )
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

    const routeList = routesWithApiResponsesValues.map((currentRoute) => ({
      url: new URL(currentRoute.pathname, serverUrl.href).toString(),
      // eslint-disable-next-line perfectionist/sort-objects
      json: `${dirname}/saved-api-responses/${currentRoute.savedApiResponse}`,
    }));
    console.table(routeList);
  },
);
