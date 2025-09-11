// test-create-user.ts
import { createUser } from "./src/lib/db/queries/users";

async function testCreateUser() {
    try {
        console.log("Testing createUser...");
        const result = await createUser("testuser123");
        console.log("Create user result:", result);
    } catch (err) {
        console.error("Create user error:", err);
    }
    process.exit(0);
}

testCreateUser();