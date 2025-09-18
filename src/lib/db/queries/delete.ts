import { db } from "..";
import { users } from "../schema";

export async function resetTables() {
    await db.delete(users);
    console.log("Rows in users deleted.")
}