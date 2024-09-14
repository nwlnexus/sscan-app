import { neon } from '@neondatabase/serverless'
import * as schema from '@sscan/db/schema'
import { drizzle } from 'drizzle-orm/neon-http'

/**
 * Get the database connection.
 * @param {Record<string, unknown>} env - The environment variables.
 * @returns {ReturnType<typeof drizzle>} The database connection.
 */
export const getDB = <T extends Record<string, unknown>>(env: T) => {
  if (!('DATABASE_URL' in env) || typeof env.DATABASE_URL !== 'string') {
    throw new Error('DATABASE_URL is required and must be a string')
  }

  return drizzle(neon(env.DATABASE_URL), { schema })
}

/**
 * Get the database connection.
 * @param {Record<string, unknown>} env - The environment variables.
 * @returns {ReturnType<typeof drizzle>} The database connection.
 */
export const getDb = getDB
