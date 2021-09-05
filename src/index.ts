const { spawn } = require('child_process');
const path = require("path");

function main() {
  const copy = spawn(
    'xcopy',
    ['/s/e', `${path.resolve(__dirname, 'config')}`, `${path.resolve(process.cwd())}`],
    { stdio: 'inherit' }
  );
  copy.on('close', () => {
    spawn('cmd.exe', ['/c', 'yarn'], { stdio: 'inherit' });
  });
}
main();
