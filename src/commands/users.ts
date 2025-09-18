import { readConfig, setUser } from "../config";
import { selectUserByName, createUser, getUsers } from "../lib/db/queries/users";
import { resetTables } from "src/lib/db/queries/delete";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const userName = args[0];
  const existingUser = await selectUserByName(userName)
     
  if (!existingUser) {
    throw new Error(`User: ${userName} does not exist. Please register first.`);
  }

  setUser(userName);
  console.log("User switched successfully!");
}


export async function handlerRegister(cmdName: string, ...args: string[]) {
    console.log("🚀 Register handler called!"); 
    if (args.length !== 1) {
        throw new Error(`registration requires a username`);
  }
  const name = args[0];

  console.log("About to check if user exists:", name);
  const existingUser = await selectUserByName(name);
  console.log("User check completed, result:", existingUser);

  if (existingUser) {
    throw new Error(`User: ${name} exists, create a new user`);
  } 
  
  console.log("About to create user:", name);
  const newUser = await createUser(name);
  console.log("User creation completed:", newUser);
    
  setUser(name);
  console.log(`User ${name} has been created successfully`);
  console.log("User data:", newUser);
}

export async function handlerReset(cmdName: string) {
  console.log("Resetting the database...");
  resetTables();
}

export async function handlerGetUsers(_: string) {
  const allUsers = await getUsers();
  const config = readConfig();
  const currentUserName = config.currentUserName;

  if (allUsers.length === 0) {
    console.log("No users found in the database.");
    return;
  }
  console.log("Retrieving Users...");
  allUsers.forEach(user => {
    if (user.name === currentUserName) {
      console.log( `* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  })
}