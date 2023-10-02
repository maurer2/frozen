import type { ReactElement } from 'react';
import React from 'react';
import { Box, Text, type BoxProps } from 'ink';

import type { TripNew } from '../../../../api/schemas/trip/trip.js';

type Props = Pick<BoxProps, 'marginBottom'> & {
  trip: TripNew['trip'];
};

const distanceFormatter = new Intl.NumberFormat('en-GB', {
  style: 'unit',
  unit: 'kilometer',
  unitDisplay: 'long',
});

const AtAGlance = ({ trip, marginBottom = 0 }: Props): ReactElement => {
  const borderStyle: BoxProps['borderStyle'] = 'double';

  return (
    <Box marginBottom={marginBottom} flexDirection="row" gap={2}>
      <Box paddingX={1} flexGrow={1} borderStyle={borderStyle}>
        <Text bold>Date: </Text>
        <Text>{trip.tripDate}</Text>
      </Box>
      <Box paddingX={1} flexGrow={1} borderStyle={borderStyle}>
        <Text bold>Train type: </Text>
        <Text>{trip.trainType}</Text>
      </Box>
      <Box paddingX={1} flexGrow={1} borderStyle={borderStyle}>
        <Text bold>Stops: </Text>
        <Text>{trip.stops.length}</Text>
      </Box>
      <Box paddingX={1} flexGrow={1} borderStyle={borderStyle}>
        <Text bold>Route length: </Text>
        <Text>{distanceFormatter.format(trip.totalDistance / 1000)}</Text>
      </Box>
    </Box>
  );
};

export default AtAGlance;
