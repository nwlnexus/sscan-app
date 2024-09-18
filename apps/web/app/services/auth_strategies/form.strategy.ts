// Refer to https://github.com/sergiodxa/remix-auth-form for more information
import { profile as dbProfile, profileSelectSchema } from '@sscan/db/schema'
import { eq } from 'drizzle-orm'
import { FormStrategy } from 'remix-auth-form'
import { getDb } from '@/services/db.server'
import { type AuthProfile } from '@/types'
import { verifyPassword } from '@/utils/hash'

export const formStrategy = new FormStrategy<AuthProfile>(async ({ form, context }) => {
  const email = form.get('email') as string
  const password = form.get('password') as string

  if (!email || !password) return null

  const db = getDb(context.cloudflare.env)

  const profile = await db.query.profile.findFirst({
    where: eq(dbProfile.email, email),
  })

  if (!profile) return null

  const passwordMatch = await verifyPassword(profile.passwordHash, password)

  if (!passwordMatch) return null
  const appProfile = profileSelectSchema.omit({ passwordHash: true }).parse(profile)
  return appProfile
})
