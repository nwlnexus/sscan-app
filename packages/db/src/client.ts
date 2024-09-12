import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

export function getDB<T extends Record<string, unknown>>(env: T): ReturnType<typeof drizzle> {
  if (!('DATABASE_URL' in env) || typeof env.DATABASE_URL !== 'string') {
    throw new Error('DATABASE_URL is required and must be a string');
  }

  return drizzle(neon(env.DATABASE_URL), { schema });
}
