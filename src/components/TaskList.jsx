export function InvestigationTaskList({ tasks }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-mcst-700">
        Investigation Tasks
      </h4>
      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li key={index} className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
              I{index + 1}
            </span>
            <p className="text-sm leading-relaxed text-slate-700">{task}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AnalysisTaskList({ tasks }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-mcst-700">
        Analysis Tasks
      </h4>
      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li key={index} className="flex gap-3 rounded-lg border border-emerald-100 bg-emerald-50/50 px-4 py-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-600 text-xs font-bold text-white">
              A{index + 1}
            </span>
            <p className="text-sm leading-relaxed text-slate-700">{task}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
