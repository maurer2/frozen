import React, {Fragment} from 'react';
import {Color, Box} from 'ink';
import importJsx from 'import-jsx';

const Header = importJsx('./components/Header');
const Route = importJsx('./components/Route');
const Trip = importJsx('./components/Trip');

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
      <Header width="50%" />

      <Box width={10} textWrap="truncate" flexBasis={10}>
        <Route progress="85.12345" />
      </Box>

      <Trip stations={stations} />

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
      </Box>
    </Box>
  )
};

module.exports = App;
