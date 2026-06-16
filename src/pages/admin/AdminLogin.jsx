import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { adminLogin } from '../../lib/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await adminLogin(password)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-mcst-600">Admin Access</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Laboratory Control Panel</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with the instructor admin password to enable laboratories for students.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700">
              Admin password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-mcst-500 focus:outline-none focus:ring-2 focus:ring-mcst-200"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-mcst-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mcst-800 disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in as Admin'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link to="/" className="font-medium text-mcst-600 hover:text-mcst-800">
            &larr; Back to sandbox
          </Link>
        </p>
      </div>
    </div>
  )
}
