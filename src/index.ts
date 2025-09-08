import { type CommandsRegistry, registerCommand, runCommand, handlerLogin } from "./commands/commands";


function main() {
  if (process.argv.length < 3) {
    console.error('Not enough arguments were provided');
    process.exit(1);
  }
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin)
  const cmdName = process.argv[2];
  const args = process.argv.slice(3);
  
  runCommand(registry, cmdName, ...args);
}

main();