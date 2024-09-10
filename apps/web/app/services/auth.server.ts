import { type AppLoadContext, type SessionStorage } from '@remix-run/cloudflare';
import { getDB } from '@services/db.server';

// prettier-ignore
import { profiles, type Profile } from '@sscan/db/schema';

import { eq } from 'drizzle-orm';
import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';

// Add these utility functions for password hashing
const hashPassword = async (password: string): Promise<string> => {
	const encoder = new TextEncoder();
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const passwordBuffer = encoder.encode(password);
	const key = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveBits']);
	const hash = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
		key,
		256,
	);
	const hashArray = Array.from(new Uint8Array(hash));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	const saltHex = Array.from(salt)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
	return `${saltHex}:${hashHex}`;
};

const verifyPassword = async (storedHash: string, password: string): Promise<boolean> => {
	const [saltHex, hashHex] = storedHash.split(':');
	const salt = new Uint8Array(saltHex!.match(/.{2}/g)!.map((byte) => parseInt(byte, 16)));
	const encoder = new TextEncoder();
	const passwordBuffer = encoder.encode(password);
	const key = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveBits']);
	const hash = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
		key,
		256,
	);
	const hashArray = Array.from(new Uint8Array(hash));
	const computedHashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	return computedHashHex === hashHex;
};

const getAuthenticator = async (context: AppLoadContext, sessionStorage: SessionStorage) => {
	const db = getDB(context.cloudflare.env);
	const strategy = new FormStrategy(async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (
			typeof email !== 'string' ||
			!email ||
			email?.length === 0 ||
			typeof password !== 'string' ||
			!password ||
			password?.length === 0
		) {
			throw new AuthorizationError('Bad Credentials: Email or Password is incorrect.');
		}

		const dbResult = await db.query.profiles.findFirst({
			where: eq(profiles.email, email),
		});

		if (!dbResult || !dbResult.passwordHash) {
			return null;
		}

		// Verify the password
		const isPasswordValid = await verifyPassword(dbResult.passwordHash, password);
		if (!isPasswordValid) {
			return null;
		}

		console.log('DB Result', dbResult);

		return dbResult;
	});
	const authenticator = new Authenticator<Profile | Error | null>(sessionStorage);
	authenticator.use(strategy, 'user-pass');
	return authenticator;
};

export { getAuthenticator, hashPassword };
