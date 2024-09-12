if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL');
}

/** @type {import("drizzle-kit").Config} */
export default {
  schema: './src/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  migrations: {
    table: 'migrations',
    schema: 'public',
  },
  introspect: {
    casing: 'preserve',
  },
};
