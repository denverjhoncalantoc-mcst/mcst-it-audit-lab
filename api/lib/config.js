import './env.js'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
const CONFIG_FILE = 'labs-config.json'
const PUBLIC_CONFIG_FILE = join('public', CONFIG_FILE)
const ALL_LAB_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

export function normalizeLabIds(ids) {
  if (!Array.isArray(ids)) return [1]
  const valid = [...new Set(ids.map(Number).filter((id) => ALL_LAB_IDS.includes(id)))]
  return valid.length > 0 ? valid.sort((a, b) => a - b) : [1]
}

function fromEnv() {
  const raw = process.env.ENABLED_LAB_IDS || '1'
  return normalizeLabIds(raw.split(',').map((part) => part.trim()))
}

function readLocalConfig() {
  const path = join(process.cwd(), CONFIG_FILE)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  return {
    enabledLabIds: normalizeLabIds(data.enabledLabIds),
    updatedAt: data.updatedAt || null,
  }
}

function writeLocalConfig(enabledLabIds) {
  const path = join(process.cwd(), CONFIG_FILE)
  const payload = {
    enabledLabIds: normalizeLabIds(enabledLabIds),
    updatedAt: new Date().toISOString(),
  }
  const serialized = `${JSON.stringify(payload, null, 2)}\n`
  writeFileSync(path, serialized, 'utf8')
  try {
    writeFileSync(join(process.cwd(), PUBLIC_CONFIG_FILE), serialized, 'utf8')
  } catch {
    // ignore on read-only serverless filesystem
  }
  return payload
}

async function readGithubConfig() {
  const repo = process.env.GITHUB_REPO || 'denverjhoncalantoc-mcst/mcst-it-audit-lab'
  const branch = process.env.GITHUB_BRANCH || 'main'
  const response = await fetch(
    `https://raw.githubusercontent.com/${repo}/${branch}/${CONFIG_FILE}?t=${Date.now()}`,
    { cache: 'no-store' },
  )
  if (!response.ok) return null
  const data = await response.json()
  return {
    enabledLabIds: normalizeLabIds(data.enabledLabIds),
    updatedAt: data.updatedAt || null,
  }
}

function isServerlessRuntime() {
  return process.env.VERCEL === '1' || Boolean(process.env.AWS_EXECUTION_ENV)
}

async function writeGithubConfig(enabledLabIds) {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error(
      'GITHUB_TOKEN is not configured. Add a GitHub personal access token with Contents write access in Vercel Environment Variables, then redeploy.',
    )
  }

  const repo = process.env.GITHUB_REPO || 'denverjhoncalantoc-mcst/mcst-it-audit-lab'
  const branch = process.env.GITHUB_BRANCH || 'main'
  const [owner, repoName] = repo.split('/')
  const apiBase = `https://api.github.com/repos/${owner}/${repoName}/contents/${CONFIG_FILE}`

  const current = await fetch(`${apiBase}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  let sha
  if (current.ok) {
    const body = await current.json()
    sha = body.sha
  } else if (current.status !== 404) {
    throw new Error('Unable to read labs-config.json from GitHub.')
  }

  const payload = {
    enabledLabIds: normalizeLabIds(enabledLabIds),
    updatedAt: new Date().toISOString(),
  }

  const response = await fetch(apiBase, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Update enabled laboratories: ${payload.enabledLabIds.join(', ')}`,
      content: Buffer.from(`${JSON.stringify(payload, null, 2)}\n`).toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  })

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        'GitHub token is invalid or does not have write access to labs-config.json in the repository.',
      )
    }
    throw new Error(`Unable to save laboratory settings to GitHub (HTTP ${response.status}).`)
  }

  return payload
}

export async function getLabConfig() {
  try {
    const githubConfig = await readGithubConfig()
    if (githubConfig) return githubConfig
  } catch {
    // fall through to local/env defaults
  }

  try {
    return readLocalConfig()
  } catch {
    return {
      enabledLabIds: fromEnv(),
      updatedAt: null,
    }
  }
}

export async function saveLabConfig(enabledLabIds) {
  const normalized = normalizeLabIds(enabledLabIds)

  if (isServerlessRuntime() || process.env.GITHUB_TOKEN) {
    return writeGithubConfig(normalized)
  }

  return writeLocalConfig(normalized)
}
