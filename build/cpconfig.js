const { exec } =  require('child_process');
const path  =  require("path");

function main() {
  exec(
    `mkdir ${path.resolve(process.cwd(), "dist/config")} && xcopy /s/e "${path.resolve(
      process.cwd(),
      "src/config"
    )}" "${path.resolve(process.cwd(), "dist/config")}"`
  );
}

main();
