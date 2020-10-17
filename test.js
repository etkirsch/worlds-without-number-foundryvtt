'use strict';

const jest = require('jest');
require('babel-polyfill');

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

process.on('unhandledRejection', (err) => {
  throw err;
});

let argv = process.argv.slice(2);
argv.push("--verbose");
jest.run(argv);
