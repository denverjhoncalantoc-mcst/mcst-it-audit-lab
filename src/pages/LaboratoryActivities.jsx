import { useMemo, useState } from 'react'
import LabCard from '../components/LabCard'
import { enabledLabs, labs } from '../data/labs'

const allLabsReleased = enabledLabs.length === labs.length

const typeFilters = [
  { id: 'all', label: 'All Laboratories' },
  { id: 'guided', label: 'Guided Investigation' },
  { id: 'project', label: 'Project Lab' },
]

export default function LaboratoryActivities() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredLabs = useMemo(() => {
    const query = search.trim().toLowerCase()
    return enabledLabs.filter((lab) => {
      const matchesType = typeFilter === 'all' || lab.type === typeFilter
      const matchesSearch =
        !query ||
        String(lab.id).includes(query) ||
        String(lab.week).includes(query) ||
        lab.title.toLowerCase().includes(query) ||
        lab.topic?.toLowerCase().includes(query) ||
        lab.shortDescription?.toLowerCase().includes(query)
      return matchesType && matchesSearch
    })
  }, [search, typeFilter])

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Laboratory Investigations</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {allLabsReleased
            ? 'Fourteen phased audit engagements forming a semester-long investigation of MCST Retail Corporation. Each laboratory session requires approximately 2.5 to 3 hours and follows structured audit methodology with evidence review, analysis, and offline deliverables.'
            : `Phased audit investigations for MCST Retail Corporation. Currently, Lab ${enabledLabs.map((l) => l.id).join(', Lab ')} is available; additional laboratories will be released throughout the semester.`}
        </p>
      </div>

      {!allLabsReleased && (
        <div className="rounded-xl border border-mcst-200 bg-mcst-50 p-4 text-sm text-mcst-800">
          <strong>Semester rollout:</strong> Only selected laboratories are open right now. Other labs
          will be enabled by your instructor as the course progresses.
        </div>
      )}

      <div className="rounded-xl border border-mcst-200 bg-mcst-50 p-5">
        <h2 className="text-sm font-semibold text-mcst-900">How to Complete Each Laboratory</h2>
        <ol className="mt-3 space-y-2 text-sm text-mcst-800">
          <li>1. Read the engagement scenario, topic, and investigation phases</li>
          <li>2. Review evidence in laboratory phases and the Evidence Repository</li>
          <li>3. Complete investigation and analysis tasks using professional judgment</li>
          <li>4. Validate any AI-assisted work through the HITL framework</li>
          <li>5. Prepare required outputs offline and submit through Google Classroom</li>
        </ol>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by lab number, week, title, or topic..."
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-mcst-500 focus:outline-none focus:ring-2 focus:ring-mcst-200"
        />
        <div className="flex flex-wrap gap-2">
          {typeFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setTypeFilter(filter.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                typeFilter === filter.id
                  ? 'bg-mcst-700 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-mcst-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Showing {filteredLabs.length} of {enabledLabs.length} available laboratories
        {!allLabsReleased && ` (${labs.length} total in the course)`}
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLabs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    </div>
  )
}
