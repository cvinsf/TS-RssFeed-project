import { db } from "../index";
import { users, feeds } from "../schema";
import { eq } from "drizzle-orm";
import type { Feed, User } from "../schema";

export async function createFeed(name: string, url: string, userId: string) {
    const [feed] = await db.insert(feeds).values({
        name,
        url,
        user_id: userId,
    }).returning();
    return feed;
}

export async function fetchFeeds(): Promise<Array<{feed: Feed, user: User }>> {
    const rows = await db
    .select()
    .from(feeds)
    .innerJoin(users, eq(feeds.user_id, users.id));

    return rows.map((row) => ({
        feed: row.feeds,
        user: row.users,
    }));
}