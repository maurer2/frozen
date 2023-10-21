import type { ReactElement } from 'react';

import { ProgressBar } from '@inkjs/ui';
import { Box, type BoxProps, Text } from 'ink';
import React from 'react';

import type { TripNew } from '../../../../api/schemas/trip/trip.js';

type Props = Pick<BoxProps, 'marginBottom'> & {
  trip: TripNew['trip'];
};

const Route = ({ marginBottom = 0, trip }: Props): ReactElement => {
  const { actualPosition, totalDistance } = trip;
  const progressInPercentage = (actualPosition * 100) / (totalDistance + Number.EPSILON);
  // const progressValueSafe = Math.min(Math.max(0, progressInPercentage), 100);
  const percentageFormatter = new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 2,
    style: 'percent',
  });

  return (
    <Box marginBottom={marginBottom}>
      <Text bold>Route progress: </Text>
      <Box width={40}>
        <ProgressBar value={progressInPercentage} />
      </Box>
      <Text> {percentageFormatter.format(progressInPercentage / 100)}</Text>
    </Box>
  );
};

export default Route;
