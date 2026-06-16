import { Link } from 'react-router-dom'
import CopyPrintButtons from '../components/CopyPrintButtons'
import { hitlRequirements, hitlStages } from '../data/hitlStages'

export default function HitlFramework() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Human-in-the-Loop AI Framework</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Every laboratory requires responsible AI use. Students may use AI as a learning support tool,
          but must validate, correct, contextualize, and defend all outputs using evidence and professional judgment.
        </p>
      </div>

      <section className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6">
        <h2 className="text-lg font-semibold text-indigo-950">Five-Stage HITL Framework</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {hitlStages.map((stage) => (
            <div key={stage.stage} className="rounded-lg border border-indigo-100 bg-white p-4">
              <p className="text-xs font-bold text-indigo-600">Stage {stage.stage}</p>
              <h3 className="mt-1 font-semibold text-slate-900">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Student Responsibilities</h2>
        <ul className="mt-4 space-y-2">
          {hitlRequirements.map((req, index) => (
            <li key={index} className="flex gap-3 text-sm text-slate-700">
              <span className="font-bold text-mcst-600">{index + 1}.</span>
              {req}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Laboratory Integration</h2>
        <p className="mt-2 text-sm text-slate-600">
          Each laboratory page includes a Human-in-the-Loop AI Requirement section. Submit HITL AI
          Validation Notes with your Google Classroom deliverables. Complete the{' '}
          <Link to="/ai-declaration" className="font-medium text-mcst-600 hover:text-mcst-800">
            AI Declaration
          </Link>{' '}
          when AI tools are used.
        </p>
      </section>

      <CopyPrintButtons
        copyText={hitlStages.map((s) => `Stage ${s.stage}: ${s.title}\n${s.description}`).join('\n\n')}
        printTargetId="hitl-framework"
        copyLabel="Copy Framework Summary"
        printLabel="Print Framework"
      />
      <div id="hitl-framework" className="hidden" aria-hidden="true">
        <h1>Human-in-the-Loop AI Framework</h1>
        {hitlStages.map((s) => (
          <div key={s.stage}>
            <h2>Stage {s.stage}: {s.title}</h2>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
