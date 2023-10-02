import uid from 'uid';
import fs from 'fs-extra';

// urls
const routesMap = {
  status: 'https://iceportal.de/api1/rs/tripInfo/trip',
  trip: 'https://iceportal.de/api1/rs/status',
  usage_info: 'http://login.wifionice.de/usage_info/',
};

const fetchDataFromApi = (url) => {
  const fetchedData = fetch(url)
    .then((response) => {
      const { ok, statusText } = response;

      if (!ok) {
        throw new Error(statusText);
      }

      return response.json();
    })
    .catch((error) => {
      throw new Error(error);
    });

  return fetchedData;
};

const dumpData = (data, name) => new Promise((resolve, reject) => {
  const randomHash = uid(3);
  const newFile = fs.createWriteStream(`./dumps/${name}-${randomHash}.json`);

  newFile.on('error', (error) => {
    reject(error);
  });

  newFile.on('finish', () => {
    resolve('done');
  });

  newFile.write(JSON.stringify(data), 'utf8');
  newFile.end();
});

const fetchApiData = (url, name) => {
  fetchDataFromApi(url)
    .then((data) => {
      dumpData(data, name)
        .then(() => console.log(`done ${name}`))
        .catch((error) => {
          throw new Error(error);
        });
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

fetchApiData(routesMap.status, 'status');
fetchApiData(routesMap.trip, 'trip');
fetchApiData(routesMap.usage_info, 'usage_info');
