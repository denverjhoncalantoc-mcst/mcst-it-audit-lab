import { getLabConfig } from '../lib/config.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const config = await getLabConfig()
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json(config)
  } catch {
    res.status(500).json({ error: 'Unable to load laboratory settings.' })
  }
}
