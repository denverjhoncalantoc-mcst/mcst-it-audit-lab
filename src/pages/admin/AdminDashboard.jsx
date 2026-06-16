import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLabAccess } from '../../context/LabAccessContext'
import {
  adminLogout,
  fetchAdminLabConfig,
  fetchAdminSession,
  saveAdminLabConfig,
} from '../../lib/api'
import { labs } from '../../data/labs'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { refreshLabAccess } = useLabAccess()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedIds, setSelectedIds] = useState([1])
  const [updatedAt, setUpdatedAt] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const session = await fetchAdminSession()
        if (!session.authenticated) {
          navigate('/admin/login', { replace: true })
          return
        }
        const config = await fetchAdminLabConfig()
        setSelectedIds(config.enabledLabIds || [1])
        setUpdatedAt(config.updatedAt || null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [navigate])

  function toggleLab(labId) {
    setSelectedIds((current) => {
      if (current.includes(labId)) {
        const next = current.filter((id) => id !== labId)
        return next.length > 0 ? next : current
      }
      return [...current, labId].sort((a, b) => a - b)
    })
  }

  function enableThroughLab(labId) {
    setSelectedIds(labs.filter((lab) => lab.id <= labId).map((lab) => lab.id))
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const config = await saveAdminLabConfig(selectedIds)
      setSelectedIds(config.enabledLabIds)
      setUpdatedAt(config.updatedAt)
      await refreshLabAccess()
      setMessage(`Laboratory access updated. Students can now access Labs ${config.enabledLabIds.join(', ')}.`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await adminLogout()
    navigate('/admin/login', { replace: true })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-sm text-slate-600">
        Loading admin panel…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mcst-600">Admin</p>
              <h1 className="text-2xl font-bold text-slate-900">Laboratory Release Control</h1>
              <p className="mt-2 text-sm text-slate-600">
                Enable laboratories for all students. Changes apply site-wide after saving.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                View site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </button>
            </div>
          </div>

          {updatedAt && (
            <p className="mt-4 text-xs text-slate-500">Last updated: {new Date(updatedAt).toLocaleString()}</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => enableThroughLab(1)}
              className="rounded-full bg-mcst-50 px-3 py-1.5 text-xs font-semibold text-mcst-700 hover:bg-mcst-100"
            >
              Lab 1 only
            </button>
            <button
              type="button"
              onClick={() => enableThroughLab(8)}
              className="rounded-full bg-mcst-50 px-3 py-1.5 text-xs font-semibold text-mcst-700 hover:bg-mcst-100"
            >
              Through Lab 8
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds(labs.map((lab) => lab.id))}
              className="rounded-full bg-mcst-50 px-3 py-1.5 text-xs font-semibold text-mcst-700 hover:bg-mcst-100"
            >
              Enable all labs
            </button>
          </div>

          <div className="space-y-3">
            {labs.map((lab) => {
              const enabled = selectedIds.includes(lab.id)
              return (
                <label
                  key={lab.id}
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                    enabled ? 'border-mcst-300 bg-mcst-50/50' : 'border-slate-200 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => toggleLab(lab.id)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-mcst-700 focus:ring-mcst-500"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-mcst-700">Lab {lab.id}</span>
                      {lab.week && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                          Week {lab.week}
                        </span>
                      )}
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">
                        {lab.type || 'guided'}
                      </span>
                    </div>
                    <p className="mt-1 font-medium text-slate-900">{lab.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{lab.topic}</p>
                  </div>
                </label>
              )
            })}
          </div>

          {message && (
            <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="mt-6 rounded-lg bg-mcst-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-mcst-800 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save laboratory access'}
          </button>
        </div>
      </div>
    </div>
  )
}
