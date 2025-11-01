import { pgTable, timestamp, uuid, text, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
    name: text("name").notNull().unique(),
});

export const feeds = pgTable("feeds", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
    name: text("feed_name").notNull(),
    url: text("url").notNull().unique(),
    user_id: uuid("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
});

export const feedFollows = pgTable("feed_follows", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
    user_id: uuid("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
    feed_id: uuid("feed_id").notNull().references(() => feeds.id, {onDelete: "cascade"}),
}, (table) => ({
    uniqueUserFeed: unique().on(table.user_id, table.feed_id),
}));

export const usersRelations = relations(users, ({ many }) => ({
    feeds: many(feeds),
}));

export const feedsRelations = relations(feeds, ({ one }) => ({
    user: one(users, {
        fields: [feeds.user_id],
        references: [users.id],
    }),
}));

export type User = typeof users.$inferSelect;
export type Feed = typeof feeds.$inferSelect;