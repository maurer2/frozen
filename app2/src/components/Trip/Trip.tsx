import React from 'react';
import { Box, Text, BoxProps } from 'ink';
import { OrderedList, Badge } from '@inkjs/ui';

import type { TripNew } from '../../../../api/schemas/trip/trip.js';
type Props = Pick<BoxProps, 'marginBottom'> & {
  stops: TripNew['trip']['stops'];
};

const Trip = ({ stops, marginBottom = 0 }: Props) => {
  return (
    <Box marginBottom={marginBottom}>
      <Text bold>Stations: </Text>
      <Box>
        <OrderedList>
          {stops.map((station, index) => (
            <OrderedList.Item key={station?.station?.evaNr ?? index}>
              <Box gap={2}>
                <Text>{station?.station?.name ?? '-'}</Text>
                <Badge color="blue">Not passed</Badge>
              </Box>
            </OrderedList.Item>
          ))}
        </OrderedList>
      </Box>
    </Box>
  );
};

export default Trip;
