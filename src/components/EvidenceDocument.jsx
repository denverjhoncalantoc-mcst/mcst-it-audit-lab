import DataTable from './DataTable'

const typeStyles = {
  'incident-report': { label: 'Incident Report', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-800' },
  policy: { label: 'Policy Document', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800' },
  email: { label: 'Email Communication', bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-200 text-slate-700' },
  memo: { label: 'Audit Memo', bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-800' },
  log: { label: 'System Log', bg: 'bg-gray-50', border: 'border-gray-200', badge: 'bg-gray-200 text-gray-700' },
  table: { label: 'Data Table', bg: 'bg-white', border: 'border-slate-200', badge: 'bg-mcst-100 text-mcst-800' },
  screenshot: { label: 'Screenshot Evidence', bg: 'bg-zinc-100', border: 'border-zinc-300', badge: 'bg-zinc-200 text-zinc-700' },
  architecture: { label: 'System Architecture', bg: 'bg-cyan-50', border: 'border-cyan-200', badge: 'bg-cyan-100 text-cyan-800' },
  'security-report': { label: 'Security Report', bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800' },
  'change-request': { label: 'Change Request', bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800' },
  report: { label: 'Report', bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800' },
  'self-assessment': { label: 'Self-Assessment', bg: 'bg-violet-50', border: 'border-violet-200', badge: 'bg-violet-100 text-violet-800' },
  'log-summary': { label: 'Log Summary', bg: 'bg-gray-50', border: 'border-gray-200', badge: 'bg-gray-200 text-gray-700' },
  record: { label: 'Record', bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-200 text-slate-700' },
  checklist: { label: 'Checklist', bg: 'bg-teal-50', border: 'border-teal-200', badge: 'bg-teal-100 text-teal-800' },
  'framework-map': { label: 'Framework Mapping', bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-800' },
  guide: { label: 'Reference Guide', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800' },
}

export default function EvidenceDocument({ document }) {
  const style = typeStyles[document.type] || typeStyles.report

  return (
    <div className={`overflow-hidden rounded-lg border ${style.border} ${style.bg}`}>
      <div className="flex items-center justify-between border-b border-inherit px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className={`rounded px-2 py-0.5 text-xs font-semibold ${style.badge}`}>
            {style.label}
          </span>
          <h4 className="text-sm font-semibold text-slate-900">{document.title}</h4>
        </div>
        {document.reference && (
          <span className="text-xs text-slate-500">{document.reference}</span>
        )}
      </div>
      <div className="px-4 py-3">
        {document.meta && (
          <dl className="mb-3 grid gap-1 text-xs sm:grid-cols-2">
            {Object.entries(document.meta).map(([key, value]) => (
              <div key={key}>
                <dt className="font-semibold text-slate-500">{key}:</dt>
                <dd className="text-slate-700">{value}</dd>
              </div>
            ))}
          </dl>
        )}
        {document.content && (
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">
            {document.content}
          </pre>
        )}
        {document.headers && document.rows && (
          <DataTable headers={document.headers} rows={document.rows} />
        )}
      </div>
    </div>
  )
}
