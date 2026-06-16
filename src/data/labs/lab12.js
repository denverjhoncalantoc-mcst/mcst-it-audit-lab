import { STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 12,
  slug: 'lab-12',
  title: 'Control Assessment and Gap Analysis',
  shortDescription:
    'Identify existing controls, assess effectiveness, perform gap analysis, and recommend control improvements for the final engagement.',
  week: 14,
  topic: 'Final Audit Engagement Project',
  type: 'project',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-CMP-002', 'EV-BKP-001', 'EV-CHG-001', 'EV-ACC-004'],
  semesterContext: 'Week 14 project laboratory. Evaluate control environment maturity and remediation needs.',
  objective:
    'Compile a control inventory, assess control effectiveness, perform gap analysis, and recommend improvements aligned with prioritized risks.',
  scenario: `Using the risk register from Lab 11 and control evidence from across the semester, your team must determine whether MCST Retail Corporation's control environment adequately mitigates prioritized risks.

Management has provided partial control matrices and self-assessments. Your task is to validate these claims against objective evidence and produce a gap analysis suitable for executive decision-making.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description: 'Compile existing controls from policies, matrices, and laboratory evidence.',
      evidence: [
        {
          type: 'table',
          title: 'Internal Control Matrix — SOX / ISO Mapping',
          reference: 'EV-CMP-002',
          headers: ['Control', 'Framework', 'Effectiveness'],
          rows: [
            ['AC-01 Access provisioning', 'ISO A.9 / SOX ITGC', 'Partially effective'],
            ['CM-02 Change approval', 'ISO A.12 / SOX ITGC', 'Ineffective'],
            ['BC-01 Backup testing', 'ISO A.12', 'Not tested'],
            ['PR-01 Privacy governance', 'ISO A.18', 'Not assessed'],
          ],
        },
        {
          type: 'policy',
          title: 'Password and Access Control Policy Excerpt',
          reference: 'EV-ACC-004',
          content: `Shared accounts prohibited except documented exceptions. MFA required for remote access. Session timeout 15 minutes. Policy review cycle annual — last review 2022.`,
        },
      ],
      investigationTasks: [
        'Build control inventory from framework matrix, policies, and prior lab control workpapers.',
        'Classify controls as preventive, detective, or corrective.',
      ],
      analysisTasks: [
        'Prepare control inventory with owners and control objectives.',
        'Map controls to Risk IDs from Lab 11.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '40 minutes',
      description: 'Test control operating effectiveness using logs, checklists, and exception evidence.',
      evidence: [
        {
          type: 'report',
          title: 'Backup Schedule and Status Report',
          reference: 'EV-BKP-001',
          content: `Nightly full backup — last success 12 days ago. Q1 restore test cancelled. Branch USB backups informal and unmonitored.`,
        },
        {
          type: 'change-request',
          title: 'Change Request Log — Production Releases',
          reference: 'EV-CHG-001',
          content: `CHG-041 payroll tax update deployed without CAB. CHG-047 HRIS patch deployed without approval. CHG-049 POS update missing formal record.`,
        },
      ],
      investigationTasks: [
        'Compare control design requirements with operating evidence.',
        'Identify control exceptions and recurring failures.',
      ],
      analysisTasks: [
        'Rate each major control as Effective, Partially Effective, or Ineffective.',
        'Document testing approach and results in workpapers.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description: 'Assess residual risk after considering control effectiveness.',
      evidence: [],
      investigationTasks: [
        'Determine which prioritized risks remain above tolerance after control assessment.',
      ],
      analysisTasks: [
        'Update risk register with residual risk ratings where appropriate.',
        'Identify risks with inadequate control coverage.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '40 minutes',
      description: 'Perform gap analysis and recommend control improvements.',
      evidence: [
        {
          type: 'table',
          title: 'Gap Analysis Matrix Template',
          reference: 'GAP-MAT-12',
          headers: ['Risk ID', 'Required Control', 'Current State', 'Gap', 'Priority'],
          rows: [
            ['R-001', 'Session management / logout enforcement', 'HRIS sessions persist on shared PCs', 'Major gap', 'Immediate'],
            ['R-004', 'Unique branch credentials', 'Shared manager accounts in use', 'Major gap', 'Immediate'],
            ['—', '—', '—', 'Complete for remaining top risks', '—'],
          ],
        },
      ],
      investigationTasks: [
        'Complete gap analysis for all top 10 risks from Lab 11.',
      ],
      analysisTasks: [
        'Prepare gap analysis matrix with remediation priority.',
        'Recommend specific control improvements with owners and timelines.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '30 minutes',
      description: 'Document control weaknesses and improvement recommendations.',
      evidence: [],
      investigationTasks: ['Select material control gaps supported by testing evidence.'],
      analysisTasks: [
        'Draft at least 5 CCER findings on control design and effectiveness.',
        'Prepare prioritized improvement recommendations.',
      ],
    },
    {
      title: 'Phase 6 – Reflection and HITL AI Validation',
      duration: '25 minutes',
      description: 'Validate AI-assisted control matrices or gap analyses.',
      evidence: [],
      investigationTasks: ['Review AI-suggested controls for evidence support.'],
      analysisTasks: [
        'Document HITL validation of AI-assisted control analysis.',
        'Reflect on assessing control effectiveness with incomplete evidence.',
      ],
    },
  ],
  requiredOutputs: [
    'Control Inventory',
    'Control Effectiveness Assessment',
    'Gap Analysis Matrix',
    'Improvement Recommendations',
    'HITL AI Validation Notes',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report',
    'Control Matrix',
    'Gap Analysis Matrix',
    'Recommendations',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes: 'Link all control gaps to Risk IDs and Evidence Repository references.',
  requiredAnalysis: [
    'Identify and classify existing controls across the engagement scope.',
    'Assess control design and operating effectiveness.',
    'Perform gap analysis and recommend prioritized improvements.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
