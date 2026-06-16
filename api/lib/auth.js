import './env.js'
import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'mcst_admin_session'

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
  if (!secret) return null
  return new TextEncoder().encode(secret)
}

export function verifyAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return password === expected
}

export async function createAdminToken() {
  const secret = getSecret()
  if (!secret) throw new Error('ADMIN_SESSION_SECRET or ADMIN_PASSWORD must be configured.')

  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret)
}

export async function verifyAdminToken(token) {
  const secret = getSecret()
  if (!secret || !token) return false

  try {
    const { payload } = await jwtVerify(token, secret)
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export function getTokenFromRequest(req) {
  const cookieHeader = req.headers.cookie || ''
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
  return match?.[1] || null
}

export function buildSessionCookie(token) {
  const secure = process.env.VERCEL_ENV === 'production'
  const parts = [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=28800',
  ]
  if (secure) parts.push('Secure')
  return parts.join('; ')
}

export function buildLogoutCookie() {
  const secure = process.env.VERCEL_ENV === 'production'
  const parts = [`${COOKIE_NAME}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0']
  if (secure) parts.push('Secure')
  return parts.join('; ')
}

export async function isAdminRequest(req) {
  const token = getTokenFromRequest(req)
  return verifyAdminToken(token)
}
