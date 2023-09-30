import React from 'react';
import { Box, Text, BoxProps } from 'ink';

type Props = Pick<BoxProps, 'marginBottom'> & {
  speedValue?: number;
};

const Speed = ({ speedValue = 0, marginBottom = 0 }: Props) => {
  // number between 0 and 320;
  const speedValueSafe = Math.min(Math.max(0, speedValue), 320);

  return (
    <Box marginBottom={marginBottom}>
      <Text bold>Current speed: </Text>
      <Text>{speedValueSafe} km/h</Text>
    </Box>
  );
};

export default Speed;
