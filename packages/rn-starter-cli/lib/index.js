'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const ora = require('ora');
const generateBase = require('./generateBase');
const generateAddOn = require('./generateAddOn');

module.exports = class Creator {
  
  constructor(projectName) {
    this.projectName = projectName;

  }
  async create() {
    const folder = path.join(process.cwd(), this.projectName);
    if (fs.existsSync(folder)) {
      console.log(`A folder already exists at ${chalk.red(folder)}! Please choose another name`);
      process.exit(1);
    }

    try {
      const child = spawn('npx', ['--help']);
      await new Promise((resolve, reject) => {
        child.once('error', reject);
        child.once('close', resolve);
      });
    } catch(error) {
      if (error != null && error.code === 'ENOENT') {
        console.log(
          `Couldn't find ${chalk.blue(
            'npx'
          )}! Please install it by running ${chalk.blue('npm install -g npx')}`
        );
        process.exit(1);
      } else {
        throw error;
      }
    }
    
    const spinner = ora('Generating Base Project').start();
    await generateBase(this.projectName);

    spinner.text = 'Generating add-on plugins';

    await generateAddOn(this.projectName);

    try {
      spawn.sync('git', ['init'], { cwd: folder });
      spawn.sync('git', ['branch', '-M', 'main'], { cwd: folder });
      spawn.sync('git', ['add', '.'], { cwd: folder });
      spawn.sync('git', ['commit', '-m', 'chore: initial commit'], {
        cwd: folder,
      });
    } catch (e) {
      console.log(chalk.red(`Could not initialize git repo`));
    }

    spinner.succeed('Generating project complete');
    
    console.log(`🎉  Successfully created project ${chalk.yellow(this.projectName)}.`);
    console.log(
      `👉  Get started with the following commands:\n\n` +
      chalk.cyan(` ${chalk.gray('$')} cd ${this.projectName}\n`) +
      chalk.cyan(` ${chalk.gray('$')} yarn install && yarn pods`)
    );
  }
}