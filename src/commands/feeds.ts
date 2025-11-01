import { selectUserByName, getUserById } from "src/lib/db/queries/users";
import { createFeed, fetchFeeds } from "../lib/db/queries/feeds";
import { printFeed } from "../utils";
import { readConfig } from "../config";


export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <name> <url>`);
    }

    const [name, url] = args;

    const config = readConfig();
    const currentUserName = config.currentUserName;

    if (!currentUserName) {
        throw new Error("No user found. Please login first.");
    }

    const user = await selectUserByName(currentUserName);

    if (!user) {
        throw new Error(`User ${config.currentUserName} not found`);
    }
    const feed = await createFeed(name, url, user.id);

    if (!feed) {
        throw new Error("Failed to create feed");
    }

    console.log("Feed created successfully:");
    printFeed(feed, user);
}

export async function handlerFeeds(_: string) {
    const rows = await fetchFeeds();

    if (rows.length === 0) {
        console.log("No feeds found.");
        return;
    }

    for (const { feed, user } of rows) {
        printFeed(feed, user);
        console.log("");
    }
}
