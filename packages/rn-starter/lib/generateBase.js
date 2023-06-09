/*
 * @Author: Hong.Zhang
 * @Date: 2023-06-08 16:27:17
 * @Description: 
 */
const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');

const REACT_NATIVE_VERSION = '0.71.10';

const FILES_TO_REMOVE = [
  'App.tsx',
  'index.js'
];

const DEPENDENCIES_TO_ADD = {
  "@ant-design/react-native": "^5.0.4",
  "@react-native-camera-roll/camera-roll": "^5.6.0",
  "@react-native-community/segmented-control": "^2.2.2",
  "@react-native-community/slider": "^4.3.1",
  "@react-native-picker/picker": "^2.4.4",
  "@react-navigation/native": "^6.0.12",
  "@react-navigation/native-stack": "^6.8.0",
  "@reduxjs/toolkit": "^1.8.5",
  "react-intl": "^6.1.1",
  "react-native-gesture-handler": "^2.6.0",
  "react-native-safe-area-context": "^4.3.3",
  "react-native-screens": "^3.17.0",
  "react-redux": "^8.0.2",
};

const DEV_DEPENDENCIES_TO_ADD = {
  "@formatjs/cli": "^4.2.7",
};

module.exports = async function generateBase(projectName) {
  const folder = path.join(process.cwd(), projectName);
  const args = [
    `react-native@latest`,
    'init',
    projectName,
    '--version',
    REACT_NATIVE_VERSION,
    '--skip-install',
  ];

  await new Promise((resolve, reject) => {
    // `npx react-native init <projectName> --version <REACT_NATIVE_VERSION> --template react-native-template-typescript --skip-install`
    const child = spawn('npx', args);
    let stderr = '';
    child.stderr?.setEncoding('utf8');
    child.stderr?.on('data', (data) => {
      stderr += data;
    });

    child.on('close', resolve);
    child.on('error', reject);
    child.once('exit', (code) => {
      if (code === 1) {
        reject(new Error(stderr));
      }
    });
  });

  for (file of FILES_TO_REMOVE) {
    fs.rmSync(path.join(folder, file));
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(folder, 'package.json'), 'utf8')
  );
  const { scripts, dependencies, devDependencies } = pkg;
  scripts.pods = 'npx pod-install --quiet';
  for (const [dep, version] of Object.entries(DEPENDENCIES_TO_ADD)) {
    dependencies[dep] = version;
  }
  for (const [dep, version] of Object.entries(DEV_DEPENDENCIES_TO_ADD)) {
    devDependencies[dep] = version;
  }

  fs.writeFileSync(
    path.join(folder, 'package.json'),
    JSON.stringify(pkg, null, 2)
  );

}