import { STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 13,
  slug: 'lab-13',
  title: 'Audit Findings and Recommendations',
  shortDescription:
    'Prepare evidence-based audit findings, root cause analysis, risk-based recommendations, and corrective action priorities.',
  week: 15,
  topic: 'Final Audit Engagement Project',
  type: 'project',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-INC-002', 'EV-APP-002'],
  semesterContext: 'Week 15 project laboratory. Synthesize semester evidence into formal audit findings and recommendations.',
  objective:
    'Document evidence-based audit findings with root cause analysis, risk-based recommendations, and corrective action priorities for MCST Retail Corporation.',
  scenario: `Your audit team must consolidate the most material conditions discovered during the semester into formal audit findings. Use evidence from guided laboratories, project laboratories, and the Evidence Repository.

A payroll breach incident (March 20, 2025) provides additional fieldwork evidence on incident response failures. Integrate this with systemic themes from access control, privacy, infrastructure, and emerging technology reviews.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description: 'Identify candidate findings from semester workpapers and incident evidence.',
      evidence: [
        {
          type: 'incident-report',
          title: 'Security Ticket INC-2025-019 (Payroll Breach)',
          reference: 'EV-INC-002',
          content: `Opened 2025-03-20 16:42 — Priority Medium — Closed 2025-03-22 as user error. Forensic image not collected. DLP alert at 14:15 not escalated immediately.`,
        },
        {
          type: 'table',
          title: 'Consolidated Event Timeline',
          reference: 'TIMELINE-13',
          headers: ['Timestamp', 'Event'],
          rows: [
            ['2025-03-20 14:06', 'payroll_admin login from external VPN IP'],
            ['2025-03-20 14:08', 'Bulk payroll export initiated'],
            ['2025-03-20 14:11', 'Attachment sent to external email'],
            ['2025-03-20 14:15', 'High-severity DLP alert triggered'],
            ['2025-03-20 16:42', 'Incident ticket opened'],
            ['2025-03-21 10:04', 'CIO informed'],
          ],
        },
      ],
      investigationTasks: [
        'Review semester workpapers for recurring conditions across multiple labs.',
        'Reconstruct payroll incident timeline for finding support.',
      ],
      analysisTasks: [
        'Prepare audit findings summary listing candidate findings with evidence references.',
        'Group findings by theme: access, privacy, infrastructure, incident response, emerging tech.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '40 minutes',
      description: 'Perform root cause analysis for selected findings.',
      evidence: [
        {
          type: 'log',
          title: 'Payroll Application Activity Logs',
          reference: 'EV-APP-002',
          headers: ['Timestamp', 'Account', 'Action', 'Object'],
          rows: [
            ['14:08', 'payroll_admin', 'EXPORT', 'payroll_master_mar2025.xlsx'],
            ['14:09', 'payroll_admin', 'VIEW', 'employee_bank_accounts'],
            ['14:12', 'payroll_admin', 'DISABLE_AUDIT_WARNING', 'session_flag_22'],
          ],
        },
        {
          type: 'policy',
          title: 'Incident Response Procedure v1.4 (Excerpt)',
          reference: 'POL-IR-001',
          content: `Classify severity within 30 minutes. Assign incident commander for high-severity incidents. Notify CIO within 1 hour for payroll/personal data incidents. Preserve forensic evidence before cleanup.`,
        },
      ],
      investigationTasks: [
        'Distinguish symptoms from root causes for each major finding.',
        'Validate finding conditions against policy and log evidence.',
      ],
      analysisTasks: [
        'Perform root cause analysis for at least 5 major findings.',
        'Document cause categories: governance, process, people, technology.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description: 'Assign risk ratings and prioritize findings for management action.',
      evidence: [],
      investigationTasks: [
        'Link each finding to Risk IDs from Lab 11.',
      ],
      analysisTasks: [
        'Assign risk ratings (Critical/High/Medium/Low) to all findings.',
        'Prepare corrective action priority list grouped by urgency.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '30 minutes',
      description: 'Ensure recommendations address control gaps identified in Lab 12.',
      evidence: [],
      investigationTasks: [
        'Cross-reference findings with gap analysis from Lab 12.',
      ],
      analysisTasks: [
        'Develop risk-based recommendations for each major finding.',
        'Specify responsible owners and target dates where possible.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '45 minutes',
      description: 'Finalize detailed CCER findings and recommendation set.',
      evidence: [
        {
          type: 'memo',
          title: 'Finding Documentation Standards — CCER Format',
          reference: 'AUD-STD-001',
          content: `CONDITION — factual, evidence-supported observation
CRITERIA — policy, standard, or best practice
CAUSE — root cause analysis
EFFECT — actual or potential impact
RECOMMENDATION — specific, actionable remediation`,
        },
      ],
      investigationTasks: [
        'Draft detailed findings with complete CCER elements.',
      ],
      analysisTasks: [
        'Prepare audit findings summary and detailed findings (minimum 8 CCER).',
        'Finalize recommendations and corrective action priority list.',
      ],
    },
    {
      title: 'Phase 6 – Reflection and HITL AI Validation',
      duration: '25 minutes',
      description: 'Validate AI-assisted findings drafts against evidence.',
      evidence: [],
      investigationTasks: ['Review AI-drafted findings for unsupported conditions or causes.'],
      analysisTasks: [
        'Document HITL validation of AI-assisted findings and recommendations.',
        'Reflect on defending evidence-based conclusions.',
      ],
    },
  ],
  requiredOutputs: [
    'Audit Findings Summary',
    'Detailed Findings (minimum 8 CCER)',
    'Root Cause Analysis',
    'Recommendations',
    'Corrective Action Priority List',
    'HITL AI Validation Notes',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report',
    'Audit Findings (CCER format)',
    'Recommendations',
    'Corrective Action Priority List',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes: 'Every finding must cite specific evidence. Distinguish incident facts from systemic control failures.',
  requiredAnalysis: [
    'Prepare evidence-based findings using CCER format.',
    'Perform root cause analysis and risk-based recommendations.',
    'Prioritize corrective actions for management implementation.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
