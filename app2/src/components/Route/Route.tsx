import type { ReactElement } from 'react';
import React from 'react';
import { Box, Text, type BoxProps } from 'ink';
import { ProgressBar } from '@inkjs/ui';

import type { TripNew } from '../../../../api/schemas/trip/trip.js';

type Props = Pick<BoxProps, 'marginBottom'> & {
  trip: TripNew['trip'];
};

const Route = ({ trip, marginBottom = 0 }: Props): ReactElement => {
  const { actualPosition, totalDistance } = trip;
  const progressInPercentage = (actualPosition * 100) / (totalDistance + Number.EPSILON);
  // const progressValueSafe = Math.min(Math.max(0, progressInPercentage), 100);
  const percentageFormatter = new Intl.NumberFormat('en-GB', {
    style: 'percent',
    maximumFractionDigits: 2,
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
