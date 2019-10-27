import uid from 'uid';
import fs from 'fs-extra';
import fetch from 'node-fetch';

// urls
const routesMap = {
  'status': '/https://iceportal.de/api1/rs/tripInfo/trip',
  'trip': 'https://iceportal.de/api1/rs/status',
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

const dumpData = data => new Promise((resolve, reject) => {
  const randomHash = uid(3);
  const newFile = fs.createWriteStream(`status-${randomHash}.json`);

  newFile.on('error', () => {
    reject();
  });

  newFile.on('finish', () => {
    resolve('done');
  });

  newFile.write(JSON.stringify(data), 'utf8');
  newFile.end();
});

fetchDataFromApi('https://iceportal.de/api1/rs/status')
  .then((data) => {
    console.log(data);

    dumpData(data)
      .then(() => {
        console.log('done');
      })
      .catch((error) => {
        console.log('error', error);
      });
  });
