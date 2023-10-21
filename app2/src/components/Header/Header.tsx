import type { ReactElement } from 'react';

import { Box, type BoxProps } from 'ink';
import BigText from 'ink-big-text';
import React from 'react';

type Props = Pick<BoxProps, 'marginBottom' | 'width'>;

function Header({ marginBottom = 0, width = '100%' }: Props): ReactElement {
  const colors = ['red'];

  return (
    <Box marginBottom={marginBottom} width={width}>
      <BigText
        align="center"
        colors={colors}
        font="block"
        space={false}
        text="ICE-Status"
      />
    </Box>
  );
}

export default Header;
