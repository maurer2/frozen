import React, {Fragment} from 'react';
import {Text, Color, Box} from 'ink';
import BigText from 'ink-big-text';

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
    <Box>
      <BigText text="ICE Status" font="simple" align="center"  colors={['red']} space={false}/>
    </Box>

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
