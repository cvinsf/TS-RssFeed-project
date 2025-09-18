import { resetTables } from "src/lib/db/queries/delete";

export async function handlerReset(_: string) {
  await resetTables();
  console.log("Resetting the database...");
}