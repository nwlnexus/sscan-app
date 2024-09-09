import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

export const getDB = (env: { DATABASE_URL: string }) => drizzle(neon(env.DATABASE_URL), { schema });
