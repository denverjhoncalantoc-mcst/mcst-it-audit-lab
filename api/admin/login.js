import {
  buildSessionCookie,
  createAdminToken,
  verifyAdminPassword,
} from '../lib/auth.js'
import { readJsonBody } from '../lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!process.env.ADMIN_PASSWORD) {
    res.status(503).json({ error: 'Admin login is not configured on the server.' })
    return
  }

  const body = await readJsonBody(req)
  const { password } = body || {}
  if (!verifyAdminPassword(password)) {
    res.status(401).json({ error: 'Invalid admin credentials.' })
    return
  }

  try {
    const token = await createAdminToken()
    res.setHeader('Set-Cookie', buildSessionCookie(token))
    res.status(200).json({ ok: true, role: 'admin' })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to create admin session.' })
  }
}
