import React from 'react';
import {Text, useApp, Box, useInput} from 'ink';
import Spinner from 'ink-spinner';

import Header from './components/Header/Header.jsx';

const acceptedKeys = ['q'] as const satisfies readonly string[];
type AcceptedKeys = typeof acceptedKeys[number];

export default function App() {
  const {exit} = useApp();

  useInput((input: AcceptedKeys | (string & {}), key): void => {
    if (!((acceptedKeys as ReadonlyArray<string>).includes(input))) {
      return;
    }

    if (input === 'q' || key.escape) {
      exit();
    }
  });

  return (
    <>
      <Box>
        <Header width="100%" />
      </Box>
      <Box>
        <Text color="white">
          <Spinner type="aesthetic" />
          {' '}
        </Text>
        <Text>Press "q" to quit.</Text>
      </Box>
    </>
  );
}
