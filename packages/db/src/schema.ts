import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const user = pgTable('user', {
	id: uuid('id').notNull().primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull(),
	emailVerified: timestamp('emailVerified', {
		mode: 'date',
		withTimezone: true,
	}),
	image: varchar('image', { length: 255 }),
	passwordHash: varchar('passwordHash', { length: 255 }).notNull(),
});
export const userSelectSchema = createSelectSchema(user);
export const userInsertSchema = createInsertSchema(user);
export type User = z.infer<typeof userSelectSchema>;

export const userRelations = relations(user, ({ many }) => ({
	accounts: many(account),
}));

export const account = pgTable('account', {
	id: uuid('id').notNull().primaryKey().defaultRandom(),
	userId: uuid('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 255 }),
});
export const accountSelectSchema = createSelectSchema(account);
export const accountInsertSchema = createInsertSchema(account);
export type Account = z.infer<typeof accountSelectSchema>;

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, { fields: [account.userId], references: [user.id] }),
}));
