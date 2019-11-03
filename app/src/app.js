import React, {Fragment} from 'react';
import {Color, Box} from 'ink';
import BigText from 'ink-big-text';
import importJsx from 'import-jsx';

const Header = importJsx('./components/Header');

// dummyData
const data = {
  trip: {
    trainType: 'ICE',
    tripDate: '2019-10-27',
    totalDistance: '512694',
    stops: [
      "Berlin Hbf",
      "Berlin Südkreuz",
      "Halle (Saale)",
      "Erfurt",
      "Kassel-Wilhelmshöhe",
      "Hanau",
      "Frankfurt (Main) Hbf"
    ],
  },
  status: {
    wagonClass: 'SECOND',
    speed: 250,
    latitude: '51.957258833333334',
    longitude: '12.905845666666666',
  }
}

const App = () => (
  <Box width="100%" padding={1} flexDirection="column">
    <Header />

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
);

module.exports = App;
