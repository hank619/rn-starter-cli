'use strict';

const template = require('..');
const assert = require('assert').strict;

assert.strictEqual(template(), 'Hello from template');
console.info('template tests passed');
