import EvidenceDocument from './EvidenceDocument'
import { InvestigationTaskList, AnalysisTaskList } from './TaskList'

export default function PhaseSection({ phase, index }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-mcst-50 px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mcst-700 text-sm font-bold text-white">
            {index + 1}
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{phase.title}</h2>
            {phase.duration && (
              <p className="text-xs text-slate-500">Estimated time: {phase.duration}</p>
            )}
          </div>
        </div>
        {phase.description && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{phase.description}</p>
        )}
      </div>

      <div className="space-y-6 px-5 py-5">
        {phase.evidence?.length > 0 && (
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Evidence
            </h3>
            <div className="space-y-4">
              {phase.evidence.map((doc, docIndex) => (
                <EvidenceDocument key={docIndex} document={doc} />
              ))}
            </div>
          </div>
        )}

        {phase.investigationTasks?.length > 0 && (
          <InvestigationTaskList tasks={phase.investigationTasks} />
        )}

        {phase.analysisTasks?.length > 0 && (
          <AnalysisTaskList tasks={phase.analysisTasks} />
        )}
      </div>
    </section>
  )
}
