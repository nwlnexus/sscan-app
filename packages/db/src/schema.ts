import { relations } from 'drizzle-orm';
import {
	boolean,
	pgTable,
	primaryKey,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const profiles = pgTable(
	'profiles',
	{
		id: uuid('id').notNull().primaryKey().defaultRandom(),
		displayName: varchar('display_name', { length: 255 }),
		email: varchar('email', { length: 255 }).notNull(),
		emailVerified: timestamp('email_verified', {
			mode: 'date',
			withTimezone: true,
		}),
		image: varchar('image', { length: 255 }),
		passwordHash: varchar('password_hash', { length: 255 }).notNull(),
		isAdmin: boolean('is_admin').notNull().default(false),
		createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
	},
	(profile) => ({
		profileEmailIdx: uniqueIndex('profile_email_idx').on(profile.email),
	}),
);
export const profileSelectSchema = createSelectSchema(profiles);
export const profileInsertSchema = createInsertSchema(profiles);
export type Profile = z.infer<typeof profileSelectSchema>;

export const profileRelations = relations(profiles, ({ many }) => ({
	accounts: many(accounts),
}));

export const profilesToAccounts = pgTable(
	'profiles_to_accounts',
	{
		profileId: uuid('profile_id')
			.notNull()
			.references(() => profiles.id),
		accountId: uuid('account_id')
			.notNull()
			.references(() => accounts.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.profileId, t.accountId] }),
	}),
);

export const profilesToAccountsRelations = relations(profilesToAccounts, ({ one }) => ({
	account: one(accounts, {
		fields: [profilesToAccounts.accountId],
		references: [accounts.id],
	}),
	profile: one(profiles, {
		fields: [profilesToAccounts.profileId],
		references: [profiles.id],
	}),
}));

export const accounts = pgTable('accounts', {
	id: uuid('id').notNull().primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
});
export const accountSelectSchema = createSelectSchema(accounts);
export const accountInsertSchema = createInsertSchema(accounts);
export type Account = z.infer<typeof accountSelectSchema>;

export const accountRelations = relations(accounts, ({ many }) => ({
	profiles: many(profiles),
}));
