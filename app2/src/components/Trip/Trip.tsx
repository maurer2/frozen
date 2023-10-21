import type { ReactElement } from 'react';

import { Badge, type BadgeProps, OrderedList } from '@inkjs/ui';
import { Box, type BoxProps, Text } from 'ink';
import React from 'react';

import type { Stop } from '../../../../api/schemas/trip/trip.js';

type Props = Pick<BoxProps, 'marginBottom'> & {
  stops: Stop[];
};

type PositionStatus = Stop['info']['positionStatus'];
type PositionStatusBadge = Record<PositionStatus, BadgeProps['color']>;

const positionStatusBadgeMap: PositionStatusBadge = {
  arrived: 'red',
  departed: 'blue',
  future: 'white',
  passed: 'magenta',
};

const Trip = ({ marginBottom = 0, stops }: Props): ReactElement => (
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

export default Trip;
