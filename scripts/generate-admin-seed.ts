import fs from 'node:fs/promises'
import path from 'node:path'
import enquirer from 'enquirer'

const { prompt } = enquirer

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

async function generateAdminSeed() {
  // Prompt for password
  const response = await prompt<{ password: string }>({
    type: 'password',
    name: 'password',
    message: 'Enter the admin password:',
  })

  // Hash the password
  const hashedPassword = await hashPassword(response.password)

  // Create SQL insert statement
  const sql = `
INSERT INTO "profile" (display_name, email, email_verified, password_hash, is_admin, created_at)
VALUES (
  'Admin',
  'admin@sscan.app',
  CURRENT_TIMESTAMP,
  '${hashedPassword}',
  true,
  CURRENT_TIMESTAMP
);
  `.trim()

  // Write SQL to file
  const seedDir = path.join(process.cwd(), 'seeds')
  await fs.mkdir(seedDir, { recursive: true })
  await fs.writeFile(path.join(seedDir, 'admin-profile.sql'), sql)

  console.log('Admin seed SQL file generated successfully.')
}

generateAdminSeed().catch(console.error)
