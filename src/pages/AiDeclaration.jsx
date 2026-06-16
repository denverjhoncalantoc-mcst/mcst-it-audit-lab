import CopyPrintButtons from '../components/CopyPrintButtons'
import { aiDeclarationText } from '../data/hitlStages'

const declarationFields = [
  'Student name',
  'Student number',
  'Course and section',
  'Laboratory number',
  'AI tool used',
  'Purpose of AI use',
  'Prompt summary',
  'AI output summary',
  'Student validation performed',
  'Parts accepted',
  'Parts modified',
  'Parts rejected',
  'Justification',
  'Signature line',
  'Date',
]

function buildDeclarationForm() {
  return [
    'PEIS002 — IT Audits and Control',
    'AI Tool Usage Declaration',
    '',
    ...declarationFields.map((field) => `${field}: _________________________________`),
    '',
    'Declaration:',
    aiDeclarationText,
  ].join('\n')
}

export default function AiDeclaration() {
  const formText = buildDeclarationForm()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">AI Declaration</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Complete this declaration when AI tools are used during laboratory work. Copy or print the
          form and include it with your Google Classroom submission when required by your instructor.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <CopyPrintButtons
          copyText={formText}
          printTargetId="ai-declaration-form"
          copyLabel="Copy Declaration"
          printLabel="Print Declaration"
        />
      </div>

      <div
        id="ai-declaration-form"
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-mcst-600">
          PEIS002 — IT Audits and Control
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900">AI Tool Usage Declaration</h2>

        <div className="mt-6 space-y-4">
          {declarationFields.map((field) => (
            <div key={field}>
              <label className="text-sm font-medium text-slate-700">{field}</label>
              <div className="mt-1 border-b border-slate-300 pb-2 text-slate-400">&nbsp;</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">Declaration</p>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">{aiDeclarationText}</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-700">Signature</p>
            <div className="mt-6 border-b border-slate-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Date</p>
            <div className="mt-6 border-b border-slate-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
