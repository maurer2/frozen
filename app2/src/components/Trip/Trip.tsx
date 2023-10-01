import React from 'react';
import { Box, Text, BoxProps } from 'ink';
import { OrderedList, Badge, BadgeProps } from '@inkjs/ui';

import type { TripNew } from '../../../../api/schemas/trip/trip.js';

type Props = Pick<BoxProps, 'marginBottom'> & {
  stops: TripNew['trip']['stops'];
};

type PositionStatus= (TripNew['trip']['stops'][number])['info']['positionStatus'];
type PositionStatusBadge = Record<PositionStatus, BadgeProps['color']>;

const positionStatusBadgeMap: PositionStatusBadge = {
  'passed': 'magenta',
  'departed': 'blue',
  'future': 'white'
}

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
                <Badge color={positionStatusBadgeMap[station?.info?.positionStatus ?? 'red']}>
                  {station?.info?.positionStatus ?? '-'}
                </Badge>
              </Box>
            </OrderedList.Item>
          ))}
        </OrderedList>
      </Box>
    </Box>
  );
};

export default Trip;
