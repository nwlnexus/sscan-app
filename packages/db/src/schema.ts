import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
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
    accountId: uuid('account_id').references(() => account.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
  },
  (profile) => ({
    profileEmailIdx: uniqueIndex('profile_email_idx').on(profile.email),
  }),
)
export const profileSelectSchema = createSelectSchema(profile)
export const profileInsertSchema = createInsertSchema(profile)
export type Profile = z.infer<typeof profileSelectSchema>

export const profileRelations = relations(profile, ({ one }) => ({
  account: one(account, {
    fields: [profile.accountId],
    references: [account.id],
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
  profiles: many(profile),
  records: many(record),
}))

export const profileWithAccountSchema = profileSelectSchema.extend({
  account: accountSelectSchema.nullable(),
})
export type ProfileWithAccount = z.infer<typeof profileWithAccountSchema>

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
