'use strict';

const rnGenerator = require('..');
const assert = require('assert').strict;

assert.strictEqual(rnGenerator(), 'Hello from rnGenerator');
console.info('rnGenerator tests passed');
