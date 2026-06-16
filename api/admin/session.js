import { isAdminRequest } from '../lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const authenticated = await isAdminRequest(req)
  res.status(200).json({ authenticated, role: authenticated ? 'admin' : null })
}
