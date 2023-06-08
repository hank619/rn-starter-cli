'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const ora = require('ora');
const { generateBase } = require('./generateBase');


module.exports = class Creator {
  
  constructor(projectName) {
    super();
    this.projectName = projectName;
  
  }
  async create() {
    const folder = path.join(process.cwd(), this.projectName);
    if (fs.pathExistsSync(folder)) {
      console.log(`A folder already exists at ${chalk.red(folder)}! Please choose another name`);
      process.exit(1);
    }

    try {
      const child = spawn('npx', ['--help']);
      await new Promise((resolve, reject) => {
        child.once('error', reject);
        child
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
  }
}