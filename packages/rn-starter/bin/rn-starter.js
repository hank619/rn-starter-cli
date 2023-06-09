/*
 * @Author: Hong.Zhang
 * @Date: 2023-06-08 15:57:33
 * @Description: 
 */
const program = require('commander');
const Creator = require('../lib');

program
  .description('A CLI for creating a rn scaffold project')
  .version(require('../package.json').version)
  .option('-n, --name <projectName>', 'name of project to be created')
  .parse(process.argv);

const options = program.opts();
const projectName = options.name;

if (!projectName) {
  program.help();
}

new Creator(projectName).create();