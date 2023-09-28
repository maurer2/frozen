import React, { ReactElement } from 'react';
import { Box, BoxProps } from 'ink';
import BigText from 'ink-big-text';

type Props = Pick<BoxProps, 'width' | 'marginBottom'> & {
  // width?: BoxProps['width'];
};

const Header = ({ width, marginBottom = 0 }: Props): ReactElement => {
  const colors = ['red'];

  return (
    <Box marginBottom={marginBottom} width={width}>
      <BigText
        text="ICE-Status"
        font="block"
        align="center"
        colors={colors}
        space={false}
      />
    </Box>
  );
};

export default Header;
