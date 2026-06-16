const DEFAULT_ENABLED = [1]

const fetchOptions = { credentials: 'include' }

async function parseJsonResponse(response) {
  if (!response.ok) return null
  const data = await response.json()
  return Array.isArray(data.enabledLabIds) ? data.enabledLabIds : null
}

async function parseErrorResponse(response, fallback) {
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const data = await response.json().catch(() => ({}))
    return data.error || fallback
  }
  return fallback
}

export async function fetchEnabledLabIds() {
  try {
    const response = await fetch('/api/labs/enabled', { ...fetchOptions, cache: 'no-store' })
    const ids = await parseJsonResponse(response)
    if (ids?.length) return ids
  } catch {
    // API unavailable
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
    ...fetchOptions,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!response.ok) {
    throw new Error(await parseErrorResponse(response, 'Login failed.'))
  }
  return response.json()
}

export async function adminLogout() {
  await fetch('/api/admin/logout', { ...fetchOptions, method: 'POST' })
}

export async function fetchAdminSession() {
  const response = await fetch('/api/admin/session', { ...fetchOptions, cache: 'no-store' })
  if (!response.ok) return { authenticated: false, role: null }
  return response.json()
}

export async function fetchAdminLabConfig() {
  const response = await fetch('/api/admin/labs', { ...fetchOptions, cache: 'no-store' })
  if (!response.ok) {
    throw new Error(await parseErrorResponse(response, 'Unable to load admin settings.'))
  }
  return response.json()
}

export async function saveAdminLabConfig(enabledLabIds) {
  const response = await fetch('/api/admin/labs', {
    ...fetchOptions,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabledLabIds }),
  })
  if (!response.ok) {
    throw new Error(await parseErrorResponse(response, 'Unable to save laboratory settings.'))
  }
  return response.json()
}
