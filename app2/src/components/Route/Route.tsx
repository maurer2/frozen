import React from 'react';
import { Box, Text, BoxProps } from 'ink';
import { ProgressBar } from '@inkjs/ui';

type Props = Pick<BoxProps, 'marginBottom'> & {
  progressValue?: number;
};

const Route = ({ progressValue = 0, marginBottom = 0 }: Props) => {
  // number between 0 and 100;
  const progressValueSafe = Math.min(Math.max(0, progressValue), 100);

  return (
    <Box marginBottom={marginBottom}>
      <Text bold>
        Route progress:
        {' '}
      </Text>
      <Box width={40}>
          <ProgressBar value={progressValue} />
      </Box>
      <Text>
        {' '}
        {progressValueSafe}%
      </Text>
    </Box>
  );
};

export default Route;
