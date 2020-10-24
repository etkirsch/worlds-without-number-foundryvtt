'use strict';

const jest = require('jest');
require('babel-polyfill');

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

process.on('unhandledRejection', (err) => {
  throw err;
});

const argv = process.argv.slice(2);
argv.push('--watch');
jest.run(argv);
