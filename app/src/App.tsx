import React, {Fragment} from 'react';
// @ts-ignore
import {Color, Box, Text} from 'ink';

// @ts-ignore
import Header from './components/Header/Header.tsx';
// @ts-ignore
import Query from './components/Query/Query.tsx';
// @ts-ignore
import Route from './components/Route/Route.tsx';
// @ts-ignore
import Trip from './components/Trip/Trip.tsx';

// dummyData
const data = {
  trip: {
    trainType: 'ICE',
    TrainNumber: '1536',
    tripDate: '2019-10-27',
    totalDistance: '512694',
    stops: [
      'Berlin Hbf',
      'Berlin Südkreuz',
      'Halle (Saale)',
      'Erfurt',
      'Kassel-Wilhelmshöhe',
      'Hanau',
      'Frankfurt (Main) Hbf',
    ],
  },
  status: {
    wagonClass: 'SECOND',
    speed: 250,
    latitude: '51.957258833333334',
    longitude: '12.905845666666666',
  }
}

const App = () => {
  const stations = data.trip.stops;

  return (
    <Box width={20} padding={1} flexDirection="column" justifyContent="flex-start">
      {/* <Box paddingBottom={1}>
        <Text>
          Test
        </Text>
      </Box> */}

      <Header width="50%"/>

      {/*
      <Box paddingBottom={1}>
        <Query  />
      </Box>
      */}

      {/* <Box width={10} flexBasis={10}>
        <Route progress="85.12345" />
      </Box> */}

      <Trip stations={stations} />

      {/*
      <Box>
        <dl>
        {Object.keys(data.status).map((key) => (
          <Fragment key={key}>
            <dt>
              <Color white>
                {key}
              </Color>
            </dt>
            <dd>
              <Color red>
                {data.status[key]}
              </Color>
            </dd>
          </Fragment>
          ))}
        </dl>
      </Box> */}
    </Box>
  )
};

export default App;
