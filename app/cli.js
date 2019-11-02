#!/usr/bin/env node
const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');
const meow = require('meow');

const app = importJsx('./src/app');

const cli = meow(`
  Usage
    $ app

  Options
      --name Your name

  Examples
    $ app --name=Jane
    Hello, Jane
`);

render(React.createElement(app, cli.flags));
