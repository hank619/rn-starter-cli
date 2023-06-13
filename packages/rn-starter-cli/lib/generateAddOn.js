/*
 * @Author: Hong.Zhang
 * @Date: 2023-06-08 17:23:09
 * @Description: 
 */
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const ADD_ON_FILES = path.resolve(__dirname, '../template');
const BINARIES = /(gradlew|\.(jar|keystore|png|jpg|gif))$/;

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

const copyDir = async (source, dest, options) => {
  const files = fs.readdirSync(source);

  for (const f of files) {
    const sourceFile = path.join(source, f);
    const sourceStats = fs.statSync(sourceFile);
    const targetFile = path.join(dest, ejs.render(f, options));

    if (sourceStats.isDirectory()) {
      ensureDirectoryExists(targetFile);
      await copyDir(sourceFile, targetFile);
    } else if (!sourceFile.match(BINARIES)) {
      const content = fs.readFileSync(sourceFile, 'utf8');
      fs.writeFileSync(targetFile, ejs.render(content, options));
    } else {
      fs.copyFileSync(sourceFile, targetFile);
    }
  }
};

module.exports = async function generateAddOn(projectName) {
  const folder = path.join(process.cwd(), projectName);
  await copyDir(ADD_ON_FILES, folder, { projectName });
}