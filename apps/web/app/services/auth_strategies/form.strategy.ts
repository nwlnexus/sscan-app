// Refer to https://github.com/sergiodxa/remix-auth-form for more information
import { inspect } from 'util'
import { profile as dbProfile, profileWithAccountSchema } from '@sscan/db/schema'
import { eq } from 'drizzle-orm'
import { FormStrategy } from 'remix-auth-form'
import { ZodError } from 'zod'
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
    with: {
      account: true,
    },
  })

  if (!profile) return null

  const passwordMatch = await verifyPassword(profile.passwordHash, password)
  if (!passwordMatch) return null
  try {
    const appProfile = profileWithAccountSchema.omit({ passwordHash: true }).parse(profile)
    return appProfile
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Error parsing profile:', inspect(error.issues, { depth: null }))
    } else {
      console.error('General error', error)
    }
    return null
  }
})
