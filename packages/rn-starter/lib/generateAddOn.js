/*
 * @Author: Hong.Zhang
 * @Date: 2023-06-08 17:23:09
 * @Description: 
 */
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const ADD_ON_FILES = path.resolve(__dirname, '../../template/template');
const BINARIES = /(gradlew|\.(jar|keystore|png|jpg|gif))$/;

const copyDir = async (source, dest, options) => {
  const files = fs.readdir(source);

  for (const f of files) {
    const target = path.join(dest, ejs.render(f, options));

    const file = path.join(source, f);
    const stats = fs.statSync(file);

    if (stats.isDirectory()) {
      await copyDir(file, target);
    } else if (!file.match(BINARIES)) {
      const content = await fs.readFile(file, 'utf8');
      fs.writeFileSync(target, ejs.render(content, options));
    } else {
      fs.copyFileSync(file, target);
    }
  }
};

export async function generateAddOn(projectName) {
  const folder = path.join(process.cwd(), projectName);
  await copyDir(ADD_ON_FILES, folder, { projectName });
}