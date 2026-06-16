import { STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withRiskRegister } from './shared.js'

export default {
  id: 9,
  slug: 'lab-9',
  title: 'Organization Selection and Audit Scope',
  shortDescription:
    'Define final audit engagement organization, scope, objectives, boundaries, and initial audit plan for the semester culmination.',
  week: 11,
  topic: 'Final Audit Engagement Project',
  type: 'project',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-GOV-004'],
  semesterContext:
    'Week 11 project laboratory. Students transition from guided investigations to formal final audit engagement planning.',
  objective:
    'Select the audit organization, define engagement scope and objectives, establish boundaries and limitations, and prepare an initial audit plan for the final project.',
  scenario: `Your audit team must formally commence the culminating IT audit engagement. MCST Retail Corporation is the default case organization and is recommended because you have already collected substantial evidence across Labs 1–8.

Alternatively, your instructor may approve a real organization or another case-based organization. If you select an alternative, you must document approval and justify feasibility of evidence collection.

The Board Audit Committee expects a clear engagement charter: who is being audited, what systems and processes are in scope, what objectives will be achieved, and what limitations apply.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '40 minutes',
      description: 'Review prior laboratory outputs and case file to understand the organization and available evidence.',
      evidence: [
        {
          type: 'memo',
          title: 'Board Audit Committee Resolution — 2025 IT Audit',
          reference: 'BAC-RES-2025-IT',
          meta: { Date: 'April 15, 2025', Authority: 'Board Audit Committee' },
          content: `Internal Audit is authorized to perform a 2025 IT audit covering access management, change management, privacy, backup/recovery, and emerging technology governance. Final report due before year-end Board meeting.`,
        },
        {
          type: 'memo',
          title: 'Chief Audit Executive — Final Engagement Directive',
          reference: 'CAE-DIR-FINAL-09',
          content: `Teams must submit organization profile, audit scope statement, objectives, boundaries, and initial audit plan before commencing Labs 10–14 fieldwork.`,
        },
      ],
      investigationTasks: [
        'Review MCST Retail Corporation case file and Evidence Repository coverage.',
        'Identify systems, departments, and risk themes already supported by semester evidence.',
        'If selecting an alternative organization, confirm instructor approval and evidence feasibility.',
      ],
      analysisTasks: [
        'Prepare organization profile summary (industry, size, IT environment, key systems).',
        'Document rationale for organization selection.',
        'List known audit context and recurring risk themes from prior labs.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '40 minutes',
      description: 'Define audit scope boundaries and engagement constraints.',
      evidence: [
        {
          type: 'table',
          title: 'Scope Definition Worksheet — Management Input',
          reference: 'SCOPE-WS-09',
          headers: ['Area', 'Management Request', 'Audit Team Notes'],
          rows: [
            ['Branch POS and shared workstations', 'Include all 12 branches', 'High incident history — include'],
            ['Cloud and IoT pilots', 'Exclude as experimental', 'Production dependency evident — recommend include'],
            ['Payroll and HRIS', 'Include', 'Privacy and access incidents — include'],
            ['Third-party vendors', 'Limit to IT vendors only', 'Marketing vendor data sharing — expand scope'],
          ],
        },
        {
          type: 'email',
          title: 'Management Concern Email — Scope Boundaries',
          reference: 'EMAIL-SCOPE-09',
          content: `Please keep the audit focused on IT only. We do not want branch operations or marketing processes reviewed in detail.`,
        },
      ],
      investigationTasks: [
        'Reconcile management scope preferences with evidence of material risk.',
        'Identify systems, locations, and processes to include and exclude.',
      ],
      analysisTasks: [
        'Draft audit scope statement with in-scope and out-of-scope elements.',
        'Document audit boundaries and limitations (time, access, resources).',
        'Justify scope decisions using risk and evidence from prior laboratories.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description: 'Align engagement objectives with prioritized risk themes from guided laboratories.',
      evidence: [
        {
          type: 'table',
          title: 'Semester Risk Theme Summary',
          reference: 'RISK-THEME-09',
          headers: ['Theme', 'Source Labs', 'Priority'],
          rows: [
            ['Access control and shared credentials', 'Labs 1, 4, 5', 'Critical'],
            ['Privacy and data sharing', 'Lab 6', 'High'],
            ['Infrastructure and change management', 'Lab 5', 'High'],
            ['Framework and compliance gaps', 'Lab 7', 'High'],
            ['Emerging technology governance', 'Lab 8', 'High'],
          ],
        },
      ],
      investigationTasks: [
        'Consolidate top risk themes from prior laboratory workpapers.',
        'Map themes to proposed audit objectives.',
      ],
      analysisTasks: [
        'Define at least 5 audit objectives aligned with risk themes and Board resolution.',
        'Prioritize objectives for Labs 10–14 execution sequence.',
        'Identify dependencies between objectives and required evidence.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '30 minutes',
      description: 'Plan control areas and assurance activities for the final engagement.',
      evidence: [
        {
          type: 'checklist',
          title: 'Initial Audit Plan Checklist',
          reference: 'PLAN-CHK-09',
          headers: ['Plan Element', 'Status', 'Owner'],
          rows: [
            ['Engagement charter approved', 'Pending', 'Audit team lead'],
            ['Evidence index started', 'In progress', 'All members'],
            ['Fieldwork schedule drafted', 'Not started', 'Audit team lead'],
            ['Resource and access requirements identified', 'Partial', 'IT liaison'],
          ],
        },
      ],
      investigationTasks: [
        'Identify control domains to be assessed in Labs 10–12.',
        'Plan evidence collection approach for final engagement.',
      ],
      analysisTasks: [
        'Prepare initial audit plan with phases, timelines, and deliverables.',
        'Define fieldwork milestones for Weeks 12–16.',
        'List required management access and coordination needs.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '25 minutes',
      description: 'Document planning-phase findings on engagement readiness and scope adequacy.',
      evidence: [],
      investigationTasks: [
        'Identify planning gaps that could impair final engagement quality.',
      ],
      analysisTasks: [
        'Draft at least 2 planning findings on scope or readiness issues if supported by evidence.',
        'Recommend actions to strengthen engagement planning before Lab 10.',
      ],
    },
    {
      title: 'Phase 6 – Reflection and HITL AI Validation',
      duration: '20 minutes',
      description: 'Validate any AI-assisted scope or planning drafts against case evidence.',
      evidence: [],
      investigationTasks: [
        'Review AI-generated scope statements or audit plans for accuracy.',
      ],
      analysisTasks: [
        'Document HITL validation of AI-assisted planning outputs.',
        'Reflect on professional judgment in defining audit scope and boundaries.',
      ],
    },
  ],
  requiredOutputs: [
    'Organization Profile',
    'Audit Scope Statement',
    'Audit Objectives (minimum 5)',
    'Audit Boundaries and Limitations',
    'Initial Audit Plan',
    'HITL AI Validation Notes',
  ],
  submissionRequirements: withRiskRegister([
    'Laboratory Report',
    'Organization Profile',
    'Audit Scope and Objectives',
    'Initial Audit Plan',
    'HITL AI Validation Notes',
    'Reflection',
  ]),
  submissionNotes:
    'MCST Retail Corporation is the recommended default organization. Alternative selections require instructor approval documented in the organization profile.',
  requiredAnalysis: [
    'Define organization profile and engagement rationale.',
    'Establish audit scope, objectives, and boundaries using prior lab evidence.',
    'Prepare initial audit plan for Labs 10–14 and the final project.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
