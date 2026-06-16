export const STANDARD_SUBMISSION = [
  'Laboratory Report',
  'Audit Findings',
  'Recommendations',
  'HITL AI Validation Notes',
  'Reflection',
]

export const FULL_SUBMISSION = [
  'Laboratory Report',
  'Risk Register, if applicable',
  'Control Matrix, if applicable',
  'Audit Findings',
  'Recommendations',
  'HITL AI Validation Notes',
  'Reflection',
]

export const STANDARD_ASSESSMENT_CRITERIA = [
  'Evidence review completeness and accurate citation of evidence IDs',
  'Quality of risk and control analysis using professional audit judgment',
  'Logical linkage between conditions, criteria, causes, effects, and recommendations',
  'Depth of investigation tasks completed across all laboratory phases',
  'HITL AI validation documentation with accept/modify/reject justifications',
  'Clarity, organization, and professionalism of offline laboratory outputs',
]

export const STANDARD_HITL = {
  summary:
    'Students may use AI to generate draft ideas, risk lists, control suggestions, audit procedures, findings, or recommendations. All AI outputs must be validated against case evidence before submission.',
  tasks: [
    'Document AI tool used, purpose, and prompt summary in HITL validation notes.',
    'Validate AI outputs against Evidence Repository documents and laboratory scenario facts.',
    'Correct inaccurate information and remove unsupported AI claims.',
    'Contextualize accepted outputs to MCST Retail Corporation and the laboratory focus.',
    'Evaluate governance, ethics, security, privacy, and academic integrity implications.',
    'Justify which AI outputs were accepted, modified, or rejected.',
    'Prepare to defend final conclusions using evidence and professional judgment.',
  ],
}

export function withRiskRegister(items) {
  const result = [...items]
  if (!result.some((i) => i.toLowerCase().includes('risk register'))) {
    result.splice(1, 0, 'Risk Register')
  }
  return result
}

export function withControlMatrix(items) {
  const result = [...items]
  if (!result.some((i) => i.toLowerCase().includes('control matrix'))) {
    const idx = result.some((i) => i.toLowerCase().includes('risk register')) ? 2 : 1
    result.splice(idx, 0, 'Control Matrix')
  }
  return result
}

export function fullSubmission(includeRisk = true, includeControl = true) {
  let items = [...FULL_SUBMISSION]
  if (!includeRisk) {
    items = items.filter((i) => !i.toLowerCase().includes('risk register'))
  }
  if (!includeControl) {
    items = items.filter((i) => !i.toLowerCase().includes('control matrix'))
  }
  return items
}

export function labMeta({ week, topic, type = 'guided', duration = '2.5–3 hours' }) {
  return { week, topic, type, duration }
}

export const LIKELIHOOD_GUIDE = {
  type: 'table',
  title: 'Likelihood Rating Guide',
  reference: 'MCST-RM-G01',
  headers: ['Score', 'Rating', 'Description'],
  rows: [
    ['5', 'Almost Certain', 'Expected to occur frequently (more than once per year)'],
    ['4', 'Likely', 'Will probably occur (once per year)'],
    ['3', 'Possible', 'Could occur at some time (once every 2–3 years)'],
    ['2', 'Unlikely', 'Not expected but possible (once every 5 years)'],
    ['1', 'Rare', 'May occur only in exceptional circumstances'],
  ],
}

export const IMPACT_GUIDE = {
  type: 'table',
  title: 'Business Impact Rating Guide',
  reference: 'MCST-RM-G02',
  headers: ['Score', 'Impact Level', 'Financial', 'Operational', 'Reputational'],
  rows: [
    ['5', 'Critical', 'Loss exceeding ₱5M; regulatory fines', 'Complete shutdown > 24 hrs', 'National media coverage'],
    ['4', 'High', 'Loss ₱1M–₱5M', 'Major disruption 4–24 hrs', 'Local media coverage'],
    ['3', 'Medium', 'Loss ₱250K–₱1M', 'Partial disruption 1–4 hrs', 'Negative social media'],
    ['2', 'Low', 'Loss ₱50K–₱250K', 'Minor inconvenience < 1 hr', 'Limited awareness'],
    ['1', 'Negligible', 'Loss below ₱50K', 'No noticeable disruption', 'No reputational effect'],
  ],
}

export const CIA_GUIDE = {
  type: 'table',
  title: 'CIA Rating Scale (1–5)',
  reference: 'MCST-AM-G01',
  headers: ['Rating', 'Confidentiality', 'Integrity', 'Availability'],
  rows: [
    ['5 – Critical', 'Severe harm if disclosed (salary, IDs, payment data)', 'Errors cause major financial/regulatory harm', 'Downtime halts core business operations'],
    ['4 – High', 'Significant harm (customer PII, employee records)', 'Errors affect financial reporting accuracy', 'Downtime affects multiple branches'],
    ['3 – Medium', 'Moderate harm (internal operational data)', 'Errors cause operational delays', 'Downtime affects single department'],
    ['2 – Low', 'Minor harm (non-sensitive internal data)', 'Minor data inconsistencies', 'Brief inconvenience to users'],
    ['1 – Minimal', 'No significant harm if disclosed', 'Errors have negligible effect', 'Brief or no business impact'],
  ],
}
