#!/usr/bin/env node
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const meow = require('meow');

const App = importJsx('./src/App');

const cli = meow();

render(React.createElement(App, cli.flags));
