import { ChildProcess } from 'child_process';

/* eslint-disable */
const { spawn } = require('child_process');
const path = require('path');
/* eslint-enable */

function alldone(cps: ChildProcess[], cb: () => void) {
  let count = cps.length;
  cps.forEach((cp) => {
    cp.on('close', () => {
      count -= 1;
      if (count === 0) cb();
    });
  });
}

function main() {
  const config = spawn(
    'xcopy',
    ['/s/e/q/y', `${path.resolve(__dirname, 'config')}`, `${path.resolve(process.cwd())}`],
    { stdio: 'inherit' }
  );
  const build = spawn(
    'xcopy',
    [
      '/s/e/i/q/y',
      `${path.resolve(__dirname, '../build')}`,
      `${path.resolve(process.cwd(), 'build/')}`,
    ],
    { stdio: 'inherit' }
  );
  const test = spawn(
    'xcopy',
    [
      '/s/e/i/q/y',
      `${path.resolve(__dirname, '../test')}`,
      `${path.resolve(process.cwd(), 'test/')}`,
    ],
    { stdio: 'inherit' }
  );
  alldone([config, build, test], () => {
    const yarn = spawn('cmd.exe', ['/c', 'yarn'], { stdio: 'inherit' });
    yarn.on('close', () => {
      const husky = spawn('cmd.exe', ['/c', 'git', 'init', '&&', 'yarn', 'prepare'], {
        stdio: 'inherit',
      });
      husky.on('close', () => {
        const action1 = spawn(
          'cmd.exe',
          ['/c', 'npx', 'husky', 'add', '.husky/pre-commit', 'yarn test'],
          {
            stdio: 'inherit',
          }
        );
        action1.on('close', () => {
          spawn('cmd.exe', ['/c', 'npx', 'husky', 'add', '.husky/pre-commit', 'yarn lint'], {
            stdio: 'inherit',
          });
        });
      });
    });
  });
}

main();
