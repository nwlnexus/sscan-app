// Refer to https://github.com/sergiodxa/remix-auth-form for more information
import { profile as dbProfile, type Profile } from '@sscan/db/schema'
import { eq } from 'drizzle-orm'
import { FormStrategy } from 'remix-auth-form'
import { getDb } from '@/services/db.server'

export const formStrategy = new FormStrategy<Profile | null>(async ({ form, context }) => {
  const email = form.get('email')
  const password = form.get('password')

  if (!email || !password) return null

  const db = getDb(context)

  const profile = await db.query.profile.findFirst({
    where: eq(dbProfile.email, email as string),
  })

  return profile ?? null
})
