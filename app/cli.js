#!/usr/bin/env node
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const meow = require('meow');

const app = importJsx('./src/app');

const cli = meow();

render(React.createElement(app, cli.flags));
