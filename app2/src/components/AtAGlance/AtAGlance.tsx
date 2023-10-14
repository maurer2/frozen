import type { ReactElement } from 'react';
import React from 'react';
import { Box, Text, type BoxProps } from 'ink';
import dayjs from 'dayjs';

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
  const tripDateFormatted = dayjs(trip.tripDate, 'YYYY-MM-DD').format('DD/MM/YYYY');

  return (
    <Box marginBottom={marginBottom} flexDirection="row" gap={2}>
      <Box paddingX={1} flexGrow={1} flexBasis={0} borderStyle={borderStyle}>
        <Text bold>Date: </Text>
        <Text>{tripDateFormatted}</Text>
      </Box>
      <Box paddingX={1} flexGrow={1} flexBasis={0} borderStyle={borderStyle}>
        <Text bold>Train: </Text>
        <Text>{trip.trainType} {trip.vzn}</Text>
      </Box>
      <Box paddingX={1} flexGrow={1} flexBasis={0} borderStyle={borderStyle}>
        <Text bold>Stops: </Text>
        <Text>{trip.stops.length}</Text>
      </Box>
      <Box paddingX={1} flexGrow={1} flexBasis={0} borderStyle={borderStyle}>
        <Text bold>Route length: </Text>
        <Text>{distanceFormatter.format(trip.totalDistance / 1000)}</Text>
      </Box>
    </Box>
  );
};

export default AtAGlance;
