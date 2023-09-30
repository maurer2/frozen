import React from 'react';
import { Text, useApp, Box, useInput } from 'ink';
import Spinner from 'ink-spinner';

import Header from './components/Header/Header.js';
import Route from './components/Route/Route.js';
import Trip from './components/Trip/Trip.js';
import Speed from './components/Speed/Speed.js';

import useAPI from './hooks/useAPI.js';

// import JSON_Trip from '../../api/dumps/status-00p.json' assert { type: 'json' };
// import type { TripNew } from '../../api/schemas/trip/trip.js';

const acceptedKeys = ['q'] as const satisfies readonly string[];
type AcceptedKeys = (typeof acceptedKeys)[number];

export default function App() {
  const { exit } = useApp();

  const queries = useAPI('http://localhost:8080');
  // prettier-ignore
  const { data: dataStatus, isLoading: isLoadingStatus } = queries.useGetStatusData();
  const { data: dataTrip, isLoading: isLoadingTrip } = queries.useGetTripData();
  // console.log(dataStatus, isLoadingStatus);
  // console.log(dataTrip, isLoadingTrip);

  useInput((input: AcceptedKeys | (string & {}), key): void => {
    // if (!(acceptedKeys as ReadonlyArray<string>).includes(input)) {
    //   return;
    // }

    if (input === 'q' || key.escape) {
      exit();
    }
  });

  return (
    <>
      <Box>
        <Header width="100%" marginBottom={2} />
      </Box>
      {!isLoadingStatus && dataStatus && (
        <Box>
          <Speed marginBottom={2} speedValue={dataStatus.speed} />
        </Box>
      )}
      <Box>
        <Route marginBottom={2} progressValue={50} />
      </Box>
      {!isLoadingTrip && dataTrip && (
        <Box>
          <Trip marginBottom={2} stops={dataTrip.trip.stops} />
        </Box>
      )}
      <Box>
        <Text color="white">
          <Spinner type="aesthetic" />{' '}
        </Text>
        <Text>Press "q" to quit.</Text>
      </Box>
    </>
  );
}
