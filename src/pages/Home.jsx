import { Link } from 'react-router-dom'
import { labs } from '../data/labs'

const labStructure = [
  { range: 'Labs 1–8', label: 'Guided Audit Investigation Activities', description: 'Phased evidence review, risk assessment, control evaluation, and findings documentation.' },
  { range: 'Lab 9', label: 'Organization Selection and Audit Scope', description: 'Define the final audit engagement organization, scope, objectives, and boundaries.' },
  { range: 'Labs 10–14', label: 'Final Audit Engagement Development', description: 'Asset inventory, risk and compliance, control gap analysis, findings, and AI validation portfolio.' },
  { range: 'Week 17', label: 'Final Project Presentation and Defense', description: 'Present the consolidated MCST Retail Corporation audit engagement to the class.' },
  { range: 'Week 18', label: 'Final Summative Assessment', description: 'Course summative assessment as scheduled by the instructor.' },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-mcst-800 to-mcst-950 px-6 py-10 text-white sm:px-10 sm:py-14">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-mcst-300">
          PEIS002 &mdash; IT Audits and Control
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          MCST IT Audit Lab Sandbox
        </h1>
        <p className="mb-4 max-w-3xl text-base leading-relaxed text-mcst-100 sm:text-lg">
          A semester-long IT audit investigation sandbox for BS Information Systems students at the
          Institute of Computing Studies, Mandaluyong College of Science and Technology.
        </p>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-mcst-200">
          This course introduces IT auditing, governance, risk management, internal and external controls,
          infrastructure and application audits, privacy and compliance, emerging technology audits, audit
          reporting, and professional audit judgment.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/laboratory"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-mcst-800 transition-colors hover:bg-mcst-50"
          >
            Begin Laboratory Investigations
          </Link>
          <Link
            to="/company"
            className="rounded-lg border border-mcst-400 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mcst-700"
          >
            MCST Retail Corporation Case File
          </Link>
          <Link
            to="/evidence"
            className="rounded-lg border border-mcst-400 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mcst-700"
          >
            Evidence Repository
          </Link>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Laboratory Structure</h2>
        <div className="mt-4 space-y-3">
          {labStructure.map((item) => (
            <div key={item.range} className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-sm font-bold text-mcst-700">{item.range}</p>
              <p className="font-medium text-slate-900">{item.label}</p>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          {
            title: 'Investigate Evidence',
            description: 'Review incident reports, access logs, policy documents, security reports, emails, and system architecture diagrams from the Evidence Repository.',
            icon: '🔍',
          },
          {
            title: 'Perform Analysis',
            description: 'Complete phased audit work: discovery, investigation, risk assessment, control evaluation, and findings documentation using professional judgment.',
            icon: '📊',
          },
          {
            title: 'Submit Offline',
            description: 'Prepare laboratory reports, risk registers, control matrices, audit findings, HITL AI validation notes, and reflections. Submit through Google Classroom.',
            icon: '📝',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <span className="mb-3 block text-2xl">{item.icon}</span>
            <h3 className="mb-2 font-semibold text-slate-900">{item.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="mb-2 text-lg font-semibold text-amber-900">Important Message</h2>
        <p className="text-sm leading-relaxed text-amber-800">
          The laboratory activities simulate an IT audit engagement. Students will review case evidence,
          identify weaknesses, assess risk, evaluate controls, prepare findings, and justify recommendations
          using professional judgment. This website is an <strong>audit investigation sandbox only</strong> — not
          a submission system. Each laboratory session is designed for approximately{' '}
          <strong>2.5 to 3 hours</strong>. Submit all outputs through <strong>Google Classroom</strong>.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Upcoming Laboratory Investigations</h2>
          <Link to="/laboratory" className="text-sm font-medium text-mcst-600 hover:text-mcst-800">
            View all labs &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {labs.slice(0, 4).map((lab) => (
            <Link
              key={lab.id}
              to={`/laboratory/${lab.slug}`}
              className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-mcst-300 hover:bg-mcst-50/50"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-mcst-600">Lab {lab.id}</span>
                {lab.week && <span className="text-xs text-slate-400">Week {lab.week}</span>}
                <span className="text-xs text-slate-400">{lab.duration}</span>
              </div>
              <h3 className="mt-1 font-medium text-slate-900">{lab.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
