import '../api/lib/env.js'
import { inspectGithubLabConfigAccess } from '../api/lib/config.js'

const status = await inspectGithubLabConfigAccess()
console.log(JSON.stringify(status, null, 2))
