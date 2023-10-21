import type { ReactElement } from 'react';

import { Box, type BoxProps, Text } from 'ink';
import React from 'react';

import type { StatusNew } from '../../../../api/schemas/status/status.js';

type Props = Pick<BoxProps, 'marginBottom'> & {
  speedValue: StatusNew['speed'],
};

const speedFormatter = new Intl.NumberFormat('en-GB', {
  style: 'unit',
  unit: 'kilometer-per-hour',
  unitDisplay: 'short',
});

const Speed = ({ marginBottom = 0, speedValue = 0 }: Props): ReactElement => {
  // number between 0 and 320;
  const speedValueSafe = Math.min(Math.max(0, speedValue), 320);

  return (
    <Box marginBottom={marginBottom}>
      <Text bold>Current speed: </Text>
      <Text>{speedFormatter.format(speedValueSafe)}</Text>
    </Box>
  );
};

export default Speed;
