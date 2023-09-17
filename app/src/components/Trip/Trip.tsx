import React, {ReactElement} from 'react';
import {Box, Text} from 'ink';

const Trip = (stations): ReactElement => {
  return (
    <Box>
      <Box width={25}>
        <Text>
          <span>Stations: </span>
        </Text>
      </Box>
      <Box>
        <ul>
          {stations.stations.map((station, key) => (
            <li key={key}>
              <Text>
                {station}
              </Text>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  )
};

export default Trip;
