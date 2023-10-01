import React from 'react';
import { Box, Text, BoxProps } from 'ink';

import type { StatusNew } from '../../../../api/schemas/status/status.js';

type Props = Pick<BoxProps, 'marginBottom'> & {
  speedValue: StatusNew['speed'],
};

const Speed = ({ speedValue = 0, marginBottom = 0 }: Props) => {
  // number between 0 and 320;
  const speedValueSafe = Math.min(Math.max(0, speedValue), 320);

  return (
    <Box marginBottom={marginBottom}>
      <Text bold>Current speed: </Text>
      <Text>{speedValueSafe} kph</Text>
    </Box>
  );
};

export default Speed;
