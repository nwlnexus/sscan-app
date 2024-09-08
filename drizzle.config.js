if (!process.env.POSTGRES_URL) {
	throw new Error('Missing POSTGRES_URL');
}

/** @type {import("drizzle-kit").Config} */
export default {
	schema: './packages/db/schema/*',
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
