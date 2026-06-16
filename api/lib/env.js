import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

function loadLocalEnv() {
  if (process.env.VERCEL) return

  const root = process.cwd()
  for (const file of ['.env.local', '.env']) {
    const path = join(root, file)
    if (!existsSync(path)) continue

    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const separator = trimmed.indexOf('=')
      if (separator === -1) continue
      const key = trimmed.slice(0, separator).trim()
      let value = trimmed.slice(separator + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (!process.env[key]) process.env[key] = value
    }
  }
}

loadLocalEnv()
