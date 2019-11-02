import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Text, Color, Box} from 'ink';
import { readConfigurationFile } from 'tslint/lib/configuration';

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
      "Frankfurt (Main) Hbf",
    ],
  },
  status: {
    wagonClass: 'SECOND',
    speed: 250,
    latitude: '51.957258833333334',
    longitude: '12.905845666666666',
  }
}

const App = ({ name }) => (
  <Box width="100%" padding={1}>
    <Text>
      Status
    </Text>
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

App.propTypes = {
  name: PropTypes.string,
};

App.defaultProps = {
  name: 'Stranger',
};

module.exports = App;
