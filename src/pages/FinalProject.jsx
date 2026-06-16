import { Link } from 'react-router-dom'
import SectionCard from '../components/SectionCard'
import SubmissionRequirements from '../components/SubmissionRequirements'
import {
  engagementPhases,
  finalProjectDeliverables,
  finalReportStructure,
  finalSubmissionRequirements,
  presentationStructure,
} from '../data/finalProject'

export default function FinalProject() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Final Audit Project Guide</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          Complete audit engagement of MCST Retail Corporation — PEIS002 IT Audits and Control
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-mcst-800 to-mcst-950 px-6 py-8 text-white sm:px-8">
        <h2 className="text-xl font-bold">Semester-Long Audit Engagement Closure</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mcst-100">
          Your audit team will deliver a <strong className="text-white">complete IT audit of MCST
          Retail Corporation</strong>, consolidating evidence, workpapers, findings, and recommendations
          developed across Laboratories 1–14. Use evidence collected from guided investigations and
          project laboratories throughout the semester.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mcst-100">
          Students may use MCST Retail Corporation as the default case organization (recommended) or
          an instructor-approved alternative organization. The final presentation and defense occur in Week 17.
        </p>
      </section>

      <SectionCard title="Semester Engagement Map" icon="scenario">
        <div className="space-y-3">
          {engagementPhases.map((phase) => (
            <div key={phase.lab} className="flex gap-4 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
              <span className="shrink-0 text-sm font-bold text-mcst-700">{phase.lab}</span>
              <span className="text-sm text-slate-700">{phase.focus}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Required Deliverables" icon="output">
        <div className="space-y-3">
          {finalProjectDeliverables.map((item) => (
            <div key={item.number} className="flex gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mcst-700 text-sm font-bold text-white">
                {item.number}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Final Report Structure" icon="evidence">
        <ol className="space-y-2">
          {finalReportStructure.map((section, index) => (
            <li key={section} className="flex gap-3 text-sm text-slate-700">
              <span className="font-bold text-mcst-700">{index + 1}.</span>
              {section}
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="Presentation Structure" icon="output">
        <ol className="space-y-2">
          {presentationStructure.map((section, index) => (
            <li key={section} className="flex gap-3 text-sm text-slate-700">
              <span className="font-bold text-mcst-700">{index + 1}.</span>
              {section}
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="Engagement Workflow" icon="objective">
        <ol className="space-y-3">
          {[
            'Consolidate all laboratory workpapers, risk registers, and findings from Labs 1–14.',
            'Cross-reference findings for consistency — ensure Risk IDs and Finding numbers align.',
            'Identify systemic themes across access control, privacy, infrastructure, and emerging technology evidence.',
            'Draft the executive summary presenting the overall control environment assessment.',
            'Compile the evidence summary index with Evidence Repository IDs and relevance notes.',
            'Integrate the HITL AI Validation Portfolio from Lab 14 into the final report.',
            'Finalize recommendations with owners, priorities, and target dates.',
            'Prepare the Week 17 presentation and defense materials.',
          ].map((step, index) => (
            <li key={index} className="flex gap-3 text-sm text-slate-700">
              <span className="font-bold text-mcst-700">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-slate-600">
          Review the{' '}
          <Link to="/evidence" className="font-medium text-mcst-600 hover:text-mcst-800">Evidence Repository</Link>,{' '}
          <Link to="/hitl" className="font-medium text-mcst-600 hover:text-mcst-800">HITL Framework</Link>, and{' '}
          <Link to="/ai-declaration" className="font-medium text-mcst-600 hover:text-mcst-800">AI Declaration</Link>{' '}
          as you complete final deliverables.
        </p>
      </SectionCard>

      <SubmissionRequirements
        requirements={finalSubmissionRequirements}
        notes="Submit all deliverables through Google Classroom by the deadline announced by your instructor. The final audit report should be a single consolidated document with appendices for detailed workpapers. Document individual team member contributions in the Group Contribution Report."
      />
    </div>
  )
}
