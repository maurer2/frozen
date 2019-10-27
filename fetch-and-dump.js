import uid from 'uid';
import fs from 'fs-extra';
import fetch from 'node-fetch';

// urls
const routesMap = {
  status: 'https://iceportal.de/api1/rs/tripInfo/trip',
  trip: 'https://iceportal.de/api1/rs/status',
};

const fetchDataFromApi = (url) => {
  const fetchedData = fetch(url)
    .then((response) => {
      const { ok, statusText } = response;

      if (!ok) {
        return new Error(statusText);
      }

      return response.json();
    });

  return fetchedData;
};

const dumpData = (data, name) => new Promise((resolve, reject) => {
  const randomHash = uid(3);
  const newFile = fs.createWriteStream(`./dumps/${name}-${randomHash}.json`);

  newFile.on('error', () => {
    reject();
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
          console.log('error', error);
        });
    })
    .catch((error) => {
      console.log('error', error);
    });  
};

fetchApiData(routesMap.status, 'status');
fetchApiData(routesMap.trip, 'trip');
