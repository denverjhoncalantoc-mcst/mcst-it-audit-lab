const DEFAULT_ENABLED = [1]

async function parseJsonResponse(response) {
  if (!response.ok) return null
  const data = await response.json()
  return Array.isArray(data.enabledLabIds) ? data.enabledLabIds : null
}

export async function fetchEnabledLabIds() {
  try {
    const response = await fetch('/api/labs/enabled', { cache: 'no-store' })
    const ids = await parseJsonResponse(response)
    if (ids?.length) return ids
  } catch {
    // API unavailable in local Vite-only dev
  }

  try {
    const response = await fetch('/labs-config.json', { cache: 'no-store' })
    const ids = await parseJsonResponse(response)
    if (ids?.length) return ids
  } catch {
    // ignore
  }

  return DEFAULT_ENABLED
}

export async function adminLogin(password) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Login failed.')
  return data
}

export async function adminLogout() {
  await fetch('/api/admin/logout', { method: 'POST' })
}

export async function fetchAdminSession() {
  const response = await fetch('/api/admin/session', { cache: 'no-store' })
  if (!response.ok) return { authenticated: false, role: null }
  return response.json()
}

export async function fetchAdminLabConfig() {
  const response = await fetch('/api/admin/labs', { cache: 'no-store' })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Unable to load admin settings.')
  return data
}

export async function saveAdminLabConfig(enabledLabIds) {
  const response = await fetch('/api/admin/labs', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabledLabIds }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Unable to save laboratory settings.')
  return data
}
