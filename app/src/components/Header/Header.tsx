import React, {ReactElement} from 'react';
// @ts-ignore
import {Box} from 'ink';
// @ts-ignore
import BigText from 'ink-big-text';

const Header = ({width}): ReactElement  => {
  const colors = ['red'];

  return (
    <Box marginBottom={2} width={width}>
      <BigText
        text="ICE-Status"
        font="simple"
        align="center"
        colors={colors}
        space={false}
      />
    </Box>
  )
};

export default Header;
