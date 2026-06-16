import { Link, useParams } from 'react-router-dom'
import CopyPrintButtons from '../components/CopyPrintButtons'
import HitlSection from '../components/HitlSection'
import LabBadges from '../components/LabBadges'
import PhaseSection from '../components/PhaseSection'
import SectionCard from '../components/SectionCard'
import SubmissionRequirements from '../components/SubmissionRequirements'
import { useLabAccess } from '../context/LabAccessContext'
import { getEvidenceById } from '../data/evidence'

export default function LabDetail() {
  const { slug } = useParams()
  const { getLabBySlug, loading } = useLabAccess()
  const lab = getLabBySlug(slug)

  if (loading) {
    return <p className="text-sm text-slate-600">Loading laboratory…</p>
  }

  if (!lab) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-2xl font-bold text-slate-900">Lab Not Found</h1>
        <p className="mt-2 text-slate-600">The requested laboratory is not available yet.</p>
        <Link to="/laboratory" className="mt-4 inline-block text-mcst-600 hover:text-mcst-800">
          &larr; Back to Laboratory Investigations
        </Link>
      </div>
    )
  }

  const linkedEvidence = (lab.evidenceIds || [])
    .map((id) => getEvidenceById(id))
    .filter(Boolean)

  return (
    <div id="lab-detail" className="mx-auto max-w-5xl space-y-6">
      <div>
        <Link
          to="/laboratory"
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-mcst-600 hover:text-mcst-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Laboratory Investigations
        </Link>
        <div className="mb-3">
          <LabBadges lab={lab} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-mcst-100 px-3 py-1 text-xs font-semibold text-mcst-800">
            Lab {lab.id}
          </span>
          {lab.week && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Week {lab.week}
            </span>
          )}
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {lab.duration}
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{lab.title}</h1>
        {lab.topic && (
          <p className="mt-2 text-sm font-medium text-mcst-700">Topic: {lab.topic}</p>
        )}
        {lab.semesterContext && (
          <p className="mt-2 text-sm italic text-slate-600">{lab.semesterContext}</p>
        )}
        <div className="mt-4">
          <CopyPrintButtons printTargetId="lab-detail" printLabel="Print Lab Instructions" />
        </div>
      </div>

      <SectionCard title="Engagement Objective" icon="objective">
        <p className="text-sm leading-relaxed text-slate-700">{lab.objective}</p>
      </SectionCard>

      <SectionCard title="Engagement Scenario" icon="scenario">
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {lab.scenario}
        </p>
      </SectionCard>

      {linkedEvidence.length > 0 && (
        <SectionCard title="Evidence to Review" icon="evidence">
          <p className="mb-4 text-sm text-slate-600">
            Review the following evidence items in the Evidence Repository and within laboratory phases.
          </p>
          <div className="space-y-2">
            {linkedEvidence.map((item) => (
              <Link
                key={item.id}
                to={`/evidence?id=${item.id}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-colors hover:border-mcst-300 hover:bg-mcst-50/50"
              >
                <span className="font-medium text-slate-900">{item.title}</span>
                <span className="text-xs font-semibold text-mcst-600">{item.id}</span>
              </Link>
            ))}
          </div>
        </SectionCard>
      )}

      <div className="rounded-xl border border-mcst-200 bg-mcst-50 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-mcst-800">
          Investigation Phases
        </h2>
        <p className="mt-1 text-sm text-mcst-700">
          Complete all {lab.phases.length} phases in order. Gather evidence, perform investigation
          and analysis tasks, and prepare outputs offline for each phase before proceeding.
        </p>
      </div>

      {lab.phases.map((phase, index) => (
        <PhaseSection key={index} phase={phase} index={index} />
      ))}

      {lab.requiredAnalysis?.length > 0 && (
        <SectionCard title="Required Analysis" icon="analysis">
          <ul className="space-y-2">
            {lab.requiredAnalysis.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-mcst-100 text-xs font-bold text-mcst-700">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      <SectionCard title="Required Outputs" icon="output">
        <ul className="space-y-2">
          {lab.requiredOutputs.map((output, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-mcst-100 text-xs font-bold text-mcst-700">
                {index + 1}
              </span>
              {output}
            </li>
          ))}
        </ul>
      </SectionCard>

      <HitlSection labHitl={lab.hitlAssessment} />

      <SubmissionRequirements
        requirements={lab.submissionRequirements}
        notes={lab.submissionNotes}
      />

      {lab.assessmentCriteria?.length > 0 && (
        <SectionCard title="Assessment Criteria" icon="criteria">
          <ul className="space-y-2">
            {lab.assessmentCriteria.map((criterion, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="mt-0.5 text-mcst-600">&#10003;</span>
                {criterion}
              </li>
            ))}
          </ul>
        </SectionCard>
      )}
    </div>
  )
}
