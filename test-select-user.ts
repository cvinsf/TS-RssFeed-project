// test-select-user.ts
import { selectUserByName } from "./src/lib/db/queries/users";

async function testSelectUser() {
    try {
        console.log("Testing selectUserByName...");
        const result = await selectUserByName("nonexistent");
        console.log("Select user result:", result);
    } catch (err) {
        console.error("Select user error:", err);
    }
    process.exit(0);
}

testSelectUser();