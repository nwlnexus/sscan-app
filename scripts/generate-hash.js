import * as readline from 'node:readline'

const hashPassword = async (/** @type {string} */ password) => {
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

async function generateHash() {
  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const password = await new Promise((/** @type {(arg0: string) => void} */ resolve) => {
    input.question('Enter password to hash: ', (t) => {
      input.close()
      resolve(t)
    })
  })

  const hashedPassword = await hashPassword(password)
  console.log(`Hashed password: ${hashedPassword}`)
}

void generateHash()
