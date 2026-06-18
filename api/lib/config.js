import './env.js'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const CONFIG_FILE = 'labs-config.json'
const PUBLIC_CONFIG_FILE = join('public', CONFIG_FILE)
const ALL_LAB_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const DEFAULT_REPO = 'denverjhoncalantoc-mcst/mcst-it-audit-lab'

export function normalizeLabIds(ids) {
  if (!Array.isArray(ids)) return [1]
  const valid = [...new Set(ids.map(Number).filter((id) => ALL_LAB_IDS.includes(id)))]
  return valid.length > 0 ? valid.sort((a, b) => a - b) : [1]
}

function fromEnv() {
  const raw = process.env.ENABLED_LAB_IDS || '1'
  return normalizeLabIds(raw.split(',').map((part) => part.trim()))
}

function githubToken() {
  return (process.env.GITHUB_TOKEN || '').trim()
}

export function parseGithubRepo(value = process.env.GITHUB_REPO) {
  const trimmed = (value || DEFAULT_REPO).trim()
  const match = trimmed.match(/github\.com[/:]([^/]+)\/([^/.]+)/i)
  if (match) {
    return { owner: match[1], repo: match[2], slug: `${match[1]}/${match[2]}` }
  }

  const parts = trimmed.split('/').filter(Boolean)
  if (parts.length >= 2) {
    const owner = parts[0]
    const repo = parts[1].replace(/\.git$/, '')
    return { owner, repo, slug: `${owner}/${repo}` }
  }

  throw new Error(`Invalid GITHUB_REPO value "${trimmed}". Use owner/repo (for example ${DEFAULT_REPO}).`)
}

function githubBranch() {
  return (process.env.GITHUB_BRANCH || 'main').trim()
}

function githubHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'mcst-it-audit-lab',
  }
}

async function readGithubError(response) {
  try {
    const body = await response.json()
    if (typeof body.message === 'string') return body.message
    if (typeof body.error === 'string') return body.error
  } catch {
    // ignore non-JSON bodies
  }
  return `HTTP ${response.status}`
}

function githubAccessError(status, detail) {
  if (status === 401) {
    return `GitHub rejected the token (${detail}). Regenerate GITHUB_TOKEN in Vercel and redeploy.`
  }
  if (status === 403) {
    return `GitHub token lacks repository access (${detail}). Use a fine-grained token with Contents: Read and write on mcst-it-audit-lab. If the organization uses SSO, open the token on GitHub and click "Configure SSO" to authorize it for denverjhoncalantoc-mcst.`
  }
  if (status === 404) {
    return `GitHub could not find ${CONFIG_FILE} on branch "${githubBranch()}" in ${parseGithubRepo().slug} (${detail}). Check GITHUB_REPO and GITHUB_BRANCH in Vercel.`
  }
  return `Unable to access labs-config.json on GitHub (${detail}). Verify GITHUB_TOKEN, GITHUB_REPO, and GITHUB_BRANCH in Vercel.`
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
  const { slug } = parseGithubRepo()
  const branch = githubBranch()
  const response = await fetch(
    `https://raw.githubusercontent.com/${slug}/${branch}/${CONFIG_FILE}?t=${Date.now()}`,
    { cache: 'no-store', headers: { 'User-Agent': 'mcst-it-audit-lab' } },
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

export async function inspectGithubLabConfigAccess() {
  const token = githubToken()
  const { owner, repo, slug } = parseGithubRepo()
  const branch = githubBranch()
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${CONFIG_FILE}`

  const result = {
    tokenConfigured: Boolean(token),
    repo: slug,
    branch,
    readOk: false,
    readStatus: null,
    readMessage: null,
    fileSha: null,
    hints: [],
  }

  if (!token) {
    result.readMessage = 'GITHUB_TOKEN is not set.'
    result.hints.push('Add GITHUB_TOKEN in Vercel Environment Variables, then redeploy.')
    return result
  }

  const response = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, {
    headers: githubHeaders(token),
  })

  result.readStatus = response.status
  result.readMessage = await readGithubError(response)

  if (response.ok) {
    const body = await response.json()
    result.readOk = true
    result.fileSha = body.sha || null
    return result
  }

  if (response.status === 404) {
    result.hints.push('If the repository is private, the token must include this repo and Contents: Read access.')
    result.hints.push(`Confirm the branch is "${branch}" and ${CONFIG_FILE} exists at the repository root.`)
  }
  if (response.status === 403) {
    result.hints.push('Authorize the token for organization SSO on GitHub if prompted.')
    result.hints.push('Fine-grained token permissions: Contents → Read and write.')
  }
  if (response.status === 401) {
    result.hints.push('Regenerate the token and paste the new value into Vercel without extra spaces or quotes.')
  }

  return result
}

async function writeGithubConfig(enabledLabIds) {
  const token = githubToken()
  if (!token) {
    throw new Error(
      'GITHUB_TOKEN is not configured. Add a GitHub personal access token with Contents write access in Vercel Environment Variables, then redeploy.',
    )
  }

  const { owner, repo } = parseGithubRepo()
  const branch = githubBranch()
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${CONFIG_FILE}`

  const current = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, {
    headers: githubHeaders(token),
  })

  let sha
  if (current.ok) {
    const body = await current.json()
    sha = body.sha
  } else if (current.status !== 404) {
    const detail = await readGithubError(current)
    throw new Error(githubAccessError(current.status, detail))
  }

  const payload = {
    enabledLabIds: normalizeLabIds(enabledLabIds),
    updatedAt: new Date().toISOString(),
  }

  const response = await fetch(apiBase, {
    method: 'PUT',
    headers: {
      ...githubHeaders(token),
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
    const detail = await readGithubError(response)
    throw new Error(githubAccessError(response.status, detail))
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

  if (isServerlessRuntime() || githubToken()) {
    return writeGithubConfig(normalized)
  }

  return writeLocalConfig(normalized)
}
