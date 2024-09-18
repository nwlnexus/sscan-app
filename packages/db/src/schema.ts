import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const profile = pgTable(
  'profile',
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
)
export const profileSelectSchema = createSelectSchema(profile)
export const profileInsertSchema = createInsertSchema(profile)
export type Profile = z.infer<typeof profileSelectSchema>

export const profileRelations = relations(profile, ({ many }) => ({
  accounts: many(profileToAccount),
}))

export const profileToAccount = pgTable(
  'profile_to_account',
  {
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profile.id),
    accountId: uuid('account_id')
      .notNull()
      .references(() => account.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.profileId, t.accountId] }),
  }),
)

export const profileToAccountRelations = relations(profileToAccount, ({ one }) => ({
  account: one(account, {
    fields: [profileToAccount.accountId],
    references: [account.id],
  }),
  profile: one(profile, {
    fields: [profileToAccount.profileId],
    references: [profile.id],
  }),
}))

export const account = pgTable('account', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
})
export const accountSelectSchema = createSelectSchema(account)
export const accountInsertSchema = createInsertSchema(account)
export type Account = z.infer<typeof accountSelectSchema>

export const accountRelations = relations(account, ({ many }) => ({
  profiles: many(profileToAccount),
}))

export const profileWithAccountsSchema = profileSelectSchema.extend({
  accounts: z.array(accountSelectSchema).nullable(),
})
export type ProfileWithAccounts = z.infer<typeof profileWithAccountsSchema>

export const record = pgTable('record', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  accountId: uuid('account_id').references(() => account.id, { onDelete: 'set null' }),
  upc: varchar('upc', { length: 12 }).notNull(),
  realCount: integer('real_count').notNull(),
  reportedCount: integer('reported_count').notNull(),
  artist: varchar('artist', { length: 255 }),
  title: varchar('title', { length: 255 }),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
})
export const recordSelectSchema = createSelectSchema(record)
export const recordInsertSchema = createInsertSchema(record)
export type Record = z.infer<typeof recordSelectSchema>

export const recordRelations = relations(record, ({ one }) => ({
  account: one(account, {
    fields: [record.accountId],
    references: [account.id],
  }),
}))
