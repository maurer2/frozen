import type { ReactElement } from 'react';
import React from 'react';
import { Text, useApp, Box, useInput } from 'ink';
import Spinner from 'ink-spinner';
import { Alert } from '@inkjs/ui';

import env from './env.js';
import Header from './components/Header/Header.js';
import Route from './components/Route/Route.js';
import Trip from './components/Trip/Trip.js';
import Speed from './components/Speed/Speed.js';
import AtAGlance from './components/AtAGlance/AtAGlance.js';

import useAPI from './hooks/useAPI.js';

// import JSON_Trip from '../../api/dumps/status-00p.json' assert { type: 'json' };
// import type { TripNew } from '../../api/schemas/trip/trip.js';

const acceptedKeys = ['q'] as const satisfies readonly string[];
type AcceptedKeys = (typeof acceptedKeys)[number];

const url = new URL(`${env.URL}:${env.PORT}`);

export default function App(): ReactElement {
  const { exit } = useApp();

  const queries = useAPI(url);
  // prettier-ignore
  const { data: dataStatus, isLoading: isLoadingStatus } = queries.useGetStatusData();
  // prettier-ignore
  const { data: dataTrip, isLoading: isLoadingTrip } = queries.useGetTripData();
  // console.log(dataStatus, isLoadingStatus);
  // console.log(dataTrip, isLoadingTrip);

  // eslint-disable-next-line @typescript-eslint/ban-types
  useInput((input: AcceptedKeys | (string & {}), key): void => {
    if (input === 'q' || key.escape) {
      exit(); // doesn't seem to work in tsx watch mode
    }
  });

  return (
    <>
      <Header width="100%" marginBottom={2} />

      {!dataTrip || !dataStatus ? (
        <Alert variant="error">
          <Text>API couldn't be fetched.</Text>
        </Alert>
      ) : (
        <>
          {!isLoadingTrip && dataTrip && (
            <AtAGlance trip={dataTrip.trip} marginBottom={2} />
          )}
          {!isLoadingStatus && dataStatus && (
            <Speed marginBottom={2} speedValue={dataStatus.speed} />
          )}
          {!isLoadingTrip && dataTrip && (
            <>
              <Route marginBottom={2} trip={dataTrip.trip} />

              <Trip marginBottom={2} stops={dataTrip.trip.stops} />
            </>
          )}
          <Box>
            <Text color="white">
              <Spinner type="aesthetic" />{' '}
            </Text>
            <Text>Press "q" or "ESC" to quit.</Text>
          </Box>
        </>
      )}
    </>
  );
}
