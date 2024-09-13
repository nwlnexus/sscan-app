import { type AppLoadContext } from '@remix-run/cloudflare'
import { getDB } from '@services/db.server'
import { sessionStorage } from '@services/session.server'
import { profile as dbProfile, type Profile } from '@sscan/db/schema'
import { eq } from 'drizzle-orm'
import { Authenticator } from 'remix-auth'
import { Auth0Strategy } from 'remix-auth-auth0'

// Add these utility functions for password hashing
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const passwordBuffer = encoder.encode(password)
  const key = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveBits'])
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    key,
    256,
  )
  const hashArray = Array.from(new Uint8Array(hash))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `${saltHex}:${hashHex}`
}

const verifyPassword = async (storedHash: string, password: string): Promise<boolean> => {
  const [saltHex, hashHex] = storedHash.split(':')
  const salt = new Uint8Array(saltHex!.match(/.{2}/g)!.map((byte) => parseInt(byte, 16)))
  const encoder = new TextEncoder()
  const passwordBuffer = encoder.encode(password)
  const key = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveBits'])
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    key,
    256,
  )
  const hashArray = Array.from(new Uint8Array(hash))
  const computedHashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return computedHashHex === hashHex
}

const getAuthenticator = async ({ context }: { context: AppLoadContext }) => {
  const db = getDB(context.cloudflare.env)
  const auth0strategy = new Auth0Strategy(
    {
      domain: 'dev-235323.auth0.com',
      clientID: '235323',
      clientSecret: '235323',
      callbackURL: 'http://localhost:8000/auth/auth0/callback',
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
      if (!profile || !profile.emails || profile.emails.length <= 0) return null

      const entry = profile.emails[0]
      if (!entry) return null

      const dbUser = await db.query.profile.findFirst({
        where: eq(dbProfile.email, entry.value),
      })

      if (!dbUser) return null

      return dbUser
    },
  )
  const authenticator = new Authenticator<Profile | null>(sessionStorage)
  authenticator.use(auth0strategy)
  return authenticator
}

export { getAuthenticator, verifyPassword, hashPassword }
export default getAuthenticator
