import { isAdminRequest } from '../lib/auth.js'
import { getLabConfig, normalizeLabIds, saveLabConfig } from '../lib/config.js'
import { readJsonBody } from '../lib/http.js'

export default async function handler(req, res) {
  const authenticated = await isAdminRequest(req)
  if (!authenticated) {
    res.status(401).json({ error: 'Admin authentication required.' })
    return
  }

  if (req.method === 'GET') {
    try {
      const config = await getLabConfig()
      res.status(200).json(config)
    } catch {
      res.status(500).json({ error: 'Unable to load laboratory settings.' })
    }
    return
  }

  if (req.method === 'PUT') {
    const body = await readJsonBody(req)
    const { enabledLabIds } = body || {}
    if (!Array.isArray(enabledLabIds)) {
      res.status(400).json({ error: 'enabledLabIds must be an array.' })
      return
    }

    try {
      const config = await saveLabConfig(normalizeLabIds(enabledLabIds))
      res.status(200).json(config)
    } catch (error) {
      res.status(500).json({ error: error.message || 'Unable to save laboratory settings.' })
    }
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
}
