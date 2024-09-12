import { relations } from 'drizzle-orm'
import {
  boolean,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { type z } from 'zod'

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
