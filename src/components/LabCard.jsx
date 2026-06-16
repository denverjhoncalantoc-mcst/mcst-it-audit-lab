import { Link } from 'react-router-dom'
import LabBadges from '../components/LabBadges'

export default function LabCard({ lab }) {
  return (
    <Link
      to={`/laboratory/${lab.slug}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-mcst-300 hover:shadow-md"
    >
      <div className="mb-3">
        <LabBadges lab={lab} />
      </div>
      <div className="mb-3 flex items-start justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-mcst-100 px-3 py-1 text-xs font-semibold text-mcst-800">
            Lab {lab.id}
          </span>
          {lab.week && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Week {lab.week}
            </span>
          )}
          {lab.duration && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {lab.duration}
            </span>
          )}
        </div>
        <svg
          className="h-5 w-5 text-slate-300 transition-colors group-hover:text-mcst-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <h3 className="mb-1 text-base font-semibold text-slate-900 group-hover:text-mcst-800">
        {lab.title}
      </h3>
      {lab.topic && (
        <p className="mb-2 text-xs font-medium text-mcst-600">{lab.topic}</p>
      )}
      <p className="flex-1 text-sm leading-relaxed text-slate-600">
        {lab.shortDescription}
      </p>
      {lab.phases && (
        <p className="mt-3 text-xs text-slate-500">
          {lab.phases.length} investigation phases &middot; Evidence-based engagement
        </p>
      )}
      <span className="mt-4 text-sm font-medium text-mcst-600 group-hover:text-mcst-700">
        Open Laboratory &rarr;
      </span>
    </Link>
  )
}
