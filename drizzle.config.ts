import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config"

export default defineConfig({
    schema: "schema.ts",
    out: "src",
    dialect: "postgresql",
    dbCredentials: {
        url: readConfig().dbUrl,
    },
})
