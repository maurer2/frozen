import fs from 'fs-extra';
import { nanoid } from 'nanoid';
import fetch from 'node-fetch';

const routesMap = {
  trip: 'https://iceportal.de/api1/rs/tripInfo/trip',
  status: 'https://iceportal.de/api1/rs/status',
  'usage-info': 'https://login.wifionice.de/usage_info/',
} as const;

const fetchDataFromApi = (url: string) => {
  const fetchedData = fetch(url)
    .then((response) => {
      const { ok, statusText } = response;

      if (!ok) {
        throw new Error(statusText);
      }

      return response.json();
    })
    .catch((error: unknown) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log("couldn't fetch data from api");
    });

  return fetchedData;
};

const saveData = (data: unknown, endpointName: string) =>
  new Promise((resolve, reject) => {
    const newFile = fs.createWriteStream(
      `./saved-api-responses/${endpointName}-${nanoid()}.json`
    );

    newFile.on('error', (error) => {
      reject(error);
    });

    newFile.on('finish', () => {
      resolve('done');
    });

    newFile.write(JSON.stringify(data, undefined, 4), 'utf8');
    newFile.end();
  });

const fetchApiData = (url: string, name: string) => {
  fetchDataFromApi(url)
    .then((data: unknown) => {
      saveData(data, name)
        .then(() => console.log(`"${name}" was fetched successfully`))
        .catch((error: unknown) => {
          if (error instanceof Error) {
            throw error;
          }
          throw new Error(`${name} fetching failed`);
        });
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

fetchApiData(routesMap.status, 'status');
fetchApiData(routesMap.trip, 'trip');
fetchApiData(routesMap['usage-info'], 'usage-info');
