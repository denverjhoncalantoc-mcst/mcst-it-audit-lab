import { useState } from 'react'
import CopyPrintButtons from './CopyPrintButtons'
import { formatSubmissionRequirements } from '../utils/copyPrint'

const defaultRequirements = [
  'Laboratory Report',
  'Audit Findings',
  'Recommendations',
  'HITL AI Validation Notes',
  'Reflection',
]

export default function SubmissionRequirements({ requirements, notes }) {
  const items = requirements?.length > 0 ? requirements : defaultRequirements
  const copyText = formatSubmissionRequirements(items)

  return (
    <div id="submission-requirements" className="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="mb-1 text-base font-semibold text-amber-900">Submission Requirements</h3>
          <p className="text-sm text-amber-800">
            Submit the following through <strong>Google Classroom</strong>. This website is not a
            submission system. Prepare all outputs offline.
          </p>
        </div>
        <CopyPrintButtons copyText={copyText} printTargetId="submission-requirements" copyLabel="Copy Requirements" printLabel="Print Requirements" />
      </div>
      <ol className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-amber-900">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold">
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
      {notes && (
        <p className="mt-4 border-t border-amber-200 pt-4 text-sm text-amber-800">{notes}</p>
      )}
    </div>
  )
}
