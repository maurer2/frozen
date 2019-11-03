import React from 'react';
import {Box, Color, Text} from 'ink';
import ProgressBar from 'ink-progress-bar';


const Route = (progress) => {
  const progressMapped = 69 / 100;

  return (
    <Box>
      <Color white>
        <Text bold>
          <span>Route progress: </span>
        </Text>
        <Box width={25} textWrap="truncate">
          <ProgressBar percent={progressMapped}/>
        </Box>
        <Text bold>
          <span> {progressMapped * 100}%</span>
        </Text>
      </Color>
    </Box>
  )
};

module.exports = Route;
