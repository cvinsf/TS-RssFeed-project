import { db } from "./src/lib/db";

async function testConnection() {
    try {
        console.log("Testing basic query...");
        const result = await db.execute("SELECT 1 as test");
        console.log("Basic query result:", result);
        
        console.log("Testing users table...");
        const users = await db.execute("SELECT * FROM users LIMIT 1");
        console.log("Users query result:", users);
    } catch (err) {
        console.error("Database error:", err);
    }
    process.exit(0);
}
testConnection();