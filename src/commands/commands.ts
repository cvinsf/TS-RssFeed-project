import { setUser } from "src/config";

type CommandHandler = (cmdName: string, ...args: string[]) => void;
export type CommandsRegistry = Record<string, CommandHandler>


export function handlerLogin(cmdName: string, ...args: string[]) {
    if (!args || args.length === 0) {
        throw new Error("a username is required");
    }
    const username = args[0];
    setUser(String(username));
    console.log(`user set to: ${username}`);
}

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    if (!cmdName) {
        throw new Error('Command name is required');
    }

    registry[cmdName] = handler;
    
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    const handler = registry[cmdName];
    
    if (!handler) {
        console.log(`unknown command: ${cmdName}`);
        return;
    }
    try {
        handler(cmdName, ...args);
    } catch(err) {
        console.error(`error running command "${cmdName}":`, err instanceof Error ? err.message : err);
        process.exit(1);
    }

}


// function initState() {
//     const rl = createInterface({
//         input: process.stdin,
//         output: process.stdout,
//         prompt: "> gator"
//     });
// }


// function getCommands(): Record<string, any> {
//     return {
//         login: {
//             name: "login",
//             description: "sets the current user in the config"

//         },
//         register: {
//             name: "register",
//             description: "adds a new user to the database"

//         },
//         users: {
//             name: "users",
//             description: "lists all the users in the database"

//         }
//     }
// }