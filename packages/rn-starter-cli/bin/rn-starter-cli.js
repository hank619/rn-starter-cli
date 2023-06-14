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
  .command(pkg.name)
  .description('A CLI for creating an rn scaffold project')
  .version(pkg.version)
  .arguments('<projectName>')
  .action((projectName) => {
    new Creator(projectName).create();
  })
  .parse(process.argv);