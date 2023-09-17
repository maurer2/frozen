import React, {ReactElement} from 'react';
// @ts-ignore
import {Box, Text} from 'ink';
// @ts-ignore
import ProgressBar from 'ink-progress-bar';

const Route = (progress): ReactElement => {
  const progressMapped = 69 / 100;

  return (
    <Box>
      <Text bold>
        <span>Route progress: </span>
      </Text>
      <Box width={25}>
        <ProgressBar percent={progressMapped}/>
      </Box>
      <Text bold>
        <span> {progressMapped * 100}%</span>
      </Text>
    </Box>
  )
};

export default Route;
