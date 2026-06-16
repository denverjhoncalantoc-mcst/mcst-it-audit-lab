import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CopyPrintButtons from '../components/CopyPrintButtons'
import { evidenceCategories, evidenceFilters, evidenceItems } from '../data/evidence'

export default function EvidenceRepository() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      setExpandedId(id)
      const item = evidenceItems.find((e) => e.id === id)
      if (item) setCategory(item.category)
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return evidenceItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category
      const matchesTag =
        tagFilter === 'all' ||
        item.type.toLowerCase().includes(tagFilter.toLowerCase()) ||
        item.category === tagFilter.toLowerCase().replace(' ', '') ||
        (tagFilter === 'Governance' && item.category === 'governance') ||
        (tagFilter === 'Access Control' && item.category === 'access') ||
        (tagFilter === 'Privacy' && item.category === 'privacy') ||
        (tagFilter === 'Compliance' && item.category === 'compliance') ||
        (tagFilter === 'Infrastructure' && item.category === 'infrastructure') ||
        (tagFilter === 'Application' && item.category === 'application') ||
        (tagFilter === 'Emerging Technology' && item.category === 'emerging')
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.system.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.relatedLabs.some((l) => `lab ${l}`.includes(query) || String(l).includes(query))
      return matchesCategory && matchesTag && matchesSearch
    })
  }, [search, category, tagFilter])

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Evidence Repository</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Inspect realistic fictional audit evidence for MCST Retail Corporation. Analyze documents,
          logs, policies, and communications to discover control weaknesses through professional investigation.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by evidence ID, type, system, department, or related lab..."
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-mcst-500 focus:outline-none focus:ring-2 focus:ring-mcst-200"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-mcst-500 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {evidenceCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTagFilter('all')}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${tagFilter === 'all' ? 'bg-mcst-700 text-white' : 'bg-white ring-1 ring-slate-200 text-slate-600'}`}
        >
          All
        </button>
        {evidenceFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setTagFilter(filter)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${tagFilter === filter ? 'bg-mcst-700 text-white' : 'bg-white ring-1 ring-slate-200 text-slate-600'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500">Showing {filtered.length} evidence items</p>

      <div className="space-y-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            id={`evidence-${item.id}`}
            className={`rounded-xl border bg-white shadow-sm ${expandedId === item.id ? 'border-mcst-400 ring-2 ring-mcst-100' : 'border-slate-200'}`}
          >
            <button
              type="button"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-mcst-100 px-2 py-0.5 text-xs font-bold text-mcst-800">{item.id}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{item.type}</span>
                </div>
                <h2 className="mt-2 font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-1 text-xs text-slate-500">
                  {item.system} &middot; {item.department} &middot; {item.date}
                </p>
              </div>
              <span className="text-mcst-600">{expandedId === item.id ? '−' : '+'}</span>
            </button>

            {expandedId === item.id && (
              <div className="border-t border-slate-100 px-5 py-4">
                <p className="text-sm text-slate-600">{item.description}</p>
                <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 font-sans text-sm leading-relaxed text-slate-700">
                  {item.content}
                </pre>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.relatedLabs.map((labId) => (
                    <Link
                      key={labId}
                      to={`/laboratory/lab-${labId}`}
                      className="rounded-full bg-mcst-50 px-3 py-1 text-xs font-medium text-mcst-700 hover:bg-mcst-100"
                    >
                      Lab {labId}
                    </Link>
                  ))}
                </div>
                <p className="mt-4 rounded-lg border border-amber-100 bg-amber-50 p-3 text-sm text-amber-900">
                  <strong>Notes for students:</strong> {item.studentNotes}
                </p>
                <div className="mt-4">
                  <CopyPrintButtons
                    copyText={item.id}
                    copyLabel="Copy Evidence ID"
                    printTargetId={`evidence-${item.id}`}
                    printLabel="Print Evidence Item"
                  />
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
