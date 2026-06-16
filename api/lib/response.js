export function sendJson(res, status, data) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(data)
    return
  }

  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}
