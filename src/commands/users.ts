import { setUser } from "../config";
import { selectUserByName, createUser } from "../lib/db/queries/users";

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