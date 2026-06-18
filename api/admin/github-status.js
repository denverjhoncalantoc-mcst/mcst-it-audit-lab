import { isAdminRequest } from '../lib/auth.js'
import { inspectGithubLabConfigAccess } from '../lib/config.js'

export default async function handler(req, res) {
  const authenticated = await isAdminRequest(req)
  if (!authenticated) {
    res.status(401).json({ error: 'Admin authentication required.' })
    return
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const status = await inspectGithubLabConfigAccess()
    res.status(200).json(status)
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to inspect GitHub configuration.' })
  }
}
