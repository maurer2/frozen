#!/usr/bin/env ts-node
import React from 'react';
import { render } from 'ink';
// import meow from 'meow';
import App from './App.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// const cli = meow(
//   `
//   Usage
//     $ my-ink-cli

//   Options
//     --name  Your name

//   Examples
//     $ my-ink-cli --name=Jane
//     Hello, Jane
// `,
//   {
//     importMeta: import.meta,
//     // flags: {
//     // 	name: {
//     // 		type: 'string',
//     // 	},
//     // },
//   },
// );

// run app in fullscreen
// taken from https://github.com/vadimdemedes/ink/issues/263#issuecomment-1634312819
const enterFullscreenCommand = '\x1b[?1049h';
const leaveFullscreenCommand = '\x1b[?1049l';

process.stdout.write(enterFullscreenCommand);
process.on('exit', (): void => {
  process.stdout.write(leaveFullscreenCommand);
});

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
