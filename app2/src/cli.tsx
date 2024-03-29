#!/usr/bin/env ts-node
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from 'ink';
import React from 'react';

import App from './App.js';

const queryClient = new QueryClient();

// run app in fullscreen
if (process.env.NODE_ENV === 'production') {
  // taken from https://github.com/vadimdemedes/ink/issues/263#issuecomment-1634312819
  const enterFullscreenCommand = '\x1b[?1049h';
  const leaveFullscreenCommand = '\x1b[?1049l';

  process.stdout.write(enterFullscreenCommand);
  process.on('exit', (): void => {
    process.stdout.write(leaveFullscreenCommand);
  });
}

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
