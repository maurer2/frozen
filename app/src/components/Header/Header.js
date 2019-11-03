import React from 'react';
import {Box} from 'ink';
import BigText from 'ink-big-text';

const Header = () => {
  const colors = ['red']; 

  return (
    <Box>
      <BigText
        text="ICE-Status"
        font="simple"
        align="center"
        colors={colors}
        space={false}/>
    </Box>
  )
};

module.exports = Header;
