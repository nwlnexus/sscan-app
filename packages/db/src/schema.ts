import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const User = pgTable('user', {
	id: uuid('id').notNull().primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull(),
	emailVerified: timestamp('emailVerified', {
		mode: 'date',
		withTimezone: true,
	}),
	image: varchar('image', { length: 255 }),
});

export const UserRelations = relations(User, ({ many }) => ({
	accounts: many(Account),
}));

export const Account = pgTable('account', {
	id: uuid('id').notNull().primaryKey().defaultRandom(),
	userId: uuid('userId')
		.notNull()
		.references(() => User.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 255 }),
});

export const AccountRelations = relations(Account, ({ one }) => ({
	user: one(User, { fields: [Account.userId], references: [User.id] }),
}));
