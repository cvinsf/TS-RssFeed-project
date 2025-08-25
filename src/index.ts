import { setUser, readConfig } from "./config"

function main() {
  setUser("Charlie");
  const config = readConfig();
  console.log(config);
}

main();