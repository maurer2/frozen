import React from 'react';
import {Box, Text} from 'ink';

const Trip = (stations) => {
  
  return (
    <Box>
      <Box>
        <span>Stations: </span>
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

module.exports = Trip;
