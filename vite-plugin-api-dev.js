import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import './api/lib/env.js'

async function readRequestBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function createResponseAdapter(nodeRes) {
  let statusCode = 200
  const headers = {}

  return {
    status(code) {
      statusCode = code
      return this
    },
    setHeader(name, value) {
      headers[name] = value
    },
    json(payload) {
      nodeRes.statusCode = statusCode
      for (const [name, value] of Object.entries(headers)) {
        nodeRes.setHeader(name, value)
      }
      if (!nodeRes.getHeader('Content-Type')) {
        nodeRes.setHeader('Content-Type', 'application/json')
      }
      nodeRes.end(JSON.stringify(payload))
    },
  }
}

export function apiDevPlugin() {
  return {
    name: 'mcst-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          next()
          return
        }

        const url = new URL(req.url, 'http://localhost')
        const routePath = url.pathname.replace(/^\/api\//, '')
        const handlerFile = join(process.cwd(), 'api', `${routePath}.js`)

        if (!existsSync(handlerFile)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'API route not found.' }))
          return
        }

        try {
          const module = await import(`${pathToFileURL(handlerFile).href}?dev=${Date.now()}`)
          const handler = module.default
          req.body = req.method === 'GET' || req.method === 'HEAD' ? {} : await readRequestBody(req)
          req.query = Object.fromEntries(url.searchParams.entries())
          await handler(req, createResponseAdapter(res))
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message || 'API handler failed.' }))
        }
      })
    },
  }
}
