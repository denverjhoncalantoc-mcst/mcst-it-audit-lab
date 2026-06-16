import { hitlRequirements, hitlStages } from '../data/hitlStages'

export default function HitlSection({ labHitl }) {
  const tasks = labHitl?.tasks?.length ? labHitl.tasks : hitlRequirements

  return (
    <section className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
          HITL Required
        </span>
        <h2 className="text-lg font-semibold text-indigo-950">Human-in-the-Loop AI Requirement</h2>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-indigo-900">
        {labHitl?.summary ||
          'Students may use AI to support draft analysis. All AI outputs must be validated against case evidence before inclusion in laboratory workpapers or Google Classroom submissions.'}
      </p>
      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {hitlStages.map((stage) => (
          <div key={stage.stage} className="rounded-lg border border-indigo-100 bg-white p-3">
            <p className="text-xs font-bold text-indigo-600">Stage {stage.stage}</p>
            <h3 className="mt-1 text-sm font-semibold text-slate-900">{stage.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{stage.description}</p>
          </div>
        ))}
      </div>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex gap-2 text-sm text-indigo-900">
            <span className="font-bold text-indigo-600">{index + 1}.</span>
            {task}
          </li>
        ))}
      </ul>
    </section>
  )
}
