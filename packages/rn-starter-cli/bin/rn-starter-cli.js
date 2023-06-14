#!/usr/bin/env node

/*
 * @Author: Hong.Zhang
 * @Date: 2023-06-08 15:57:33
 * @Description: 
 */
const program = require('commander');
const Creator = require('../lib');

const pkg = require('../package.json');

program
  .description('A CLI for creating an rn scaffold project')
  .arguments('<projectName>')
  .version(pkg.version)
  .action((projectName) => {
    new Creator(projectName).create();
  });

program.parse(process.argv);