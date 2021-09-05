const { spawn } = require('child_process');
const path = require('path');

function main() {
  const copy = spawn(
    'xcopy',
    ['/s/e', `${path.resolve(__dirname, 'config')}`, `${path.resolve(process.cwd())}`],
    { stdio: 'inherit' }
  );
  copy.on('close', () => {
    const yarn = spawn('cmd.exe', ['/c', 'yarn'], { stdio: 'inherit' });
    yarn.on('close', () => {
      const husky = spawn('cmd.exe', ['/c', 'git', 'init', '&&', 'yarn', 'prepare'], {
        stdio: 'inherit',
      });
      husky.on('close', () => {
        spawn('cmd.exe', ['/c', 'npx', 'husky', 'add', '.husky/pre-commit', 'yarn test'], {
          stdio: 'inherit',
        });

        spawn('cmd.exe', ['/c', 'npx', 'husky', 'add', '.husky/pre-commit', 'yarn lint'], {
          stdio: 'inherit',
        });
      });
    });
  });
}
main();
