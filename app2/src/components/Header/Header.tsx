import React, {ReactElement} from 'react';
import {Box, BoxProps} from 'ink';
import BigText from 'ink-big-text';

type Props = Pick<BoxProps, 'width'> & {
  // width?: BoxProps['width'];
}

const Header = ({width}: Props): ReactElement  => {
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
