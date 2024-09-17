import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

/**
 * Get the database connection.
 */
export const getDB = <T extends Record<string, unknown>>(env: T) => {
  if (!('DATABASE_URL' in env) || typeof env.DATABASE_URL !== 'string') {
    throw new Error('DATABASE_URL is required and must be a string')
  }

  return drizzle(neon(env.DATABASE_URL), { schema })
}

/**
 * Get the database connection.
 */
export const getDb = getDB
