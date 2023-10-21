import type { ReactElement } from 'react';

import dayjs from 'dayjs';
import { Box, type BoxProps, Text } from 'ink';
import React from 'react';

import type { TripNew } from '../../../../api/schemas/trip/trip.js';

type Props = Pick<BoxProps, 'marginBottom'> & {
  trip: TripNew['trip'];
};

const distanceFormatter = new Intl.NumberFormat('en-GB', {
  style: 'unit',
  unit: 'kilometer',
  unitDisplay: 'long',
});

const AtAGlance = ({ marginBottom = 0, trip }: Props): ReactElement => {
  const borderStyle: BoxProps['borderStyle'] = 'double';
  const tripDateFormatted = dayjs(trip.tripDate, 'YYYY-MM-DD').format('DD/MM/YYYY');

  return (
    <Box flexDirection="row" gap={2} marginBottom={marginBottom}>
      <Box borderStyle={borderStyle} flexBasis={0} flexGrow={1} paddingX={1}>
        <Text bold>Date: </Text>
        <Text>{tripDateFormatted}</Text>
      </Box>
      <Box borderStyle={borderStyle} flexBasis={0} flexGrow={1} paddingX={1}>
        <Text bold>Train: </Text>
        <Text>{trip.trainType} {trip.vzn}</Text>
      </Box>
      <Box borderStyle={borderStyle} flexBasis={0} flexGrow={1} paddingX={1}>
        <Text bold>Stops: </Text>
        <Text>{trip.stops.length}</Text>
      </Box>
      <Box borderStyle={borderStyle} flexBasis={0} flexGrow={1} paddingX={1}>
        <Text bold>Route length: </Text>
        <Text>{distanceFormatter.format(trip.totalDistance / 1000)}</Text>
      </Box>
    </Box>
  );
};

export default AtAGlance;
