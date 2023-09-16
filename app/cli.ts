import React from 'react';
// @ts-ignore
import {render} from 'ink';
// @ts-ignore
import meow from 'meow';

// @ts-ignore
import App from './src/App.tsx';

// https://github.com/sindresorhus/meow/issues/222
const cli = meow({ importMeta: import.meta })

// @ts-ignore
render(React.createElement(App, cli.flags));
