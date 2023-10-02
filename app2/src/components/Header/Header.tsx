import type { ReactElement } from 'react';
import React from 'react';
import { Box, type BoxProps } from 'ink';
import BigText from 'ink-big-text';

type Props = Pick<BoxProps, 'width' | 'marginBottom'>;

function Header({ width = '100%', marginBottom = 0 }: Props): ReactElement {
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
}

export default Header;
