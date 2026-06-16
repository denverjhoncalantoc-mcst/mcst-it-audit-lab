import { IMPACT_GUIDE, LIKELIHOOD_GUIDE, STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 3,
  slug: 'lab-3',
  title: 'Audit Planning and Audit Process Case Analysis',
  shortDescription: 'Develop audit type selection, objectives, scope, procedures, and evidence planning for the MCST engagement.',
  week: 4,
  topic: 'Types of IT Audits and Auditing Process',
  type: 'guided',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-GOV-004'],
  semesterContext:
    'Week 5-6 of the semester audit engagement. After incidents and elevated risks, the Board approves full IT audit fieldwork.',
  objective:
    'Prepare the formal audit planning package, including scope statement, audit objectives, resource plan, and detailed audit procedures aligned with enterprise risk priorities.',
  scenario: `Following the enterprise risk assessment in Lab 2, the Board Audit Committee has approved the IT audit. You have received planning documents, departmental process flows, prior audit reports, and stakeholder requests.

Your assignment is to produce a professional audit plan and audit program that can be executed by field auditors. Risks are embedded in the evidence; avoid superficial checklists. Build targeted procedures that test whether controls actually work in practice.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description: 'Review board directives, audit request context, and organization structure to define high-level planning assumptions.',
      evidence: [
        {
          type: 'memo',
          title: 'Board Audit Committee Resolution — 2025 IT Audit',
          reference: 'BOARD-RES-2025-IT-02',
          meta: { Date: 'April 18, 2025', PreparedBy: 'Board Secretariat' },
          content: `The Board authorizes a full-scope IT audit for Q2 2025. This audit must prioritize recurring issues and evaluate whether management has resolved high-risk weaknesses.

Priority domains:
1) Identity and access management
2) Backup and recovery
3) Change management
4) Infrastructure security
5) Application control design and operation

Deliverables requested:
- Risk-based audit scope and objectives
- Audit program with test procedures
- Final findings and recommendations`,
        },
        {
          type: 'incident-report',
          title: 'Incident Recurrence Summary (2024-2025)',
          reference: 'INC-SUM-2025-Q1',
          headers: ['Incident Type', 'Occurrences', 'Most Recent Date', 'Common Root Cause'],
          rows: [
            ['Unauthorized HRIS data access', '3', '2025-03-15', 'Shared workstation sessions and exposed credentials'],
            ['Delayed account deprovisioning', '6', '2025-03-21', 'Manual offboarding and missing HR-IT coordination'],
            ['Backup restore failure during drill', '2', '2024-11-30', 'No validated recovery procedure'],
            ['Unapproved emergency change', '5', '2025-02-14', 'Bypassed CAB review'],
            ['Endpoint malware alerts at branches', '8', '2025-03-27', 'Outdated patch levels and local admin use'],
          ],
        },
        {
          type: 'memo',
          title: 'Audit Request Memo — Chief Audit Executive',
          reference: 'CAE-MEMO-2025-04-20',
          meta: { From: 'Chief Audit Executive', To: 'IT Audit Team', Date: 'April 20, 2025' },
          content: `The audit program must explicitly test design and operating effectiveness of controls. Do not rely solely on policy review.

Include walkthroughs, sampling, reperformance, log analysis, and interviews. Prior 2023 findings must be traced to current status.

Expected audit planning output: scope boundaries, systems in scope, control objectives, detailed procedures (minimum 15), and evidence mapping.`,
        },
      ],
      investigationTasks: [
        'Extract planning requirements from board and CAE directives.',
        'Identify recurring incident themes that must influence scope.',
        'Define preliminary in-scope and out-of-scope boundaries with justification.',
      ],
      analysisTasks: [
        'Draft an audit planning charter stating purpose, scope, period covered, and key assumptions.',
        'List at least 10 auditable entities (systems, processes, or departments) and rank them by risk relevance.',
        'Define at least 5 explicit exclusions and explain why they are excluded without undermining objectives.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '35 minutes',
      description: 'Investigate process ownership, control execution flow, and responsibilities across departments.',
      evidence: [
        {
          type: 'architecture',
          title: 'Cross-Department Process Flow — User Access Lifecycle',
          reference: 'FLOW-IAM-2025',
          content: `Requestor (Department Head) -> HR Validation -> IT Service Desk -> AD Provisioning -> Application Owner Approval -> Access Grant

Termination Flow:
HR Offboarding Notice -> IT Service Desk Ticket -> AD Disable -> App Account Disable -> Final Review

Observed deviations:
- 27% of access requests skip Application Owner Approval.
- Termination notices sometimes sent by email without ticket.
- No dashboard for tracking SLA on disablement.`,
        },
        {
          type: 'table',
          title: 'Department Roles and Audit Contact Matrix',
          reference: 'ORG-AUDIT-ROLES-2025',
          headers: ['Department', 'Primary Role', 'Critical Systems', 'Current Pain Points'],
          rows: [
            ['IT Infrastructure', 'Server, network, endpoint management', 'AD, VPN, backups, firewall', 'Patch backlog, inconsistent branch controls'],
            ['HR', 'Personnel records and payroll approvals', 'HRIS, Payroll', 'Delayed account closures and shared access concerns'],
            ['Branch Operations', 'Store operations and shift management', 'POS, branch manager workstation', 'Shared logins for speed, informal practices'],
            ['Finance', 'Payroll disbursement and reconciliation', 'Payroll, bank API', 'After-hours exceptions and manual overrides'],
            ['Internal Audit', 'Independent assurance', 'All in-scope systems', 'Evidence consistency and repeat findings'],
          ],
        },
        {
          type: 'email',
          title: 'Email — Operations Director on Scope Concerns',
          reference: 'EMAIL-OPS-2025-04-23',
          meta: { From: 'ops.director@mcstretail.com', To: 'audit.team@mcstretail.com', Date: 'April 23, 2025' },
          content: `Subject: Audit scope practicality

Please ensure the audit does not only focus on documentation. In branches, we often use workarounds to keep stores running. If this is not tested, findings may miss real operational behavior.

Also note: emergency changes during peak sales are usually done first, documented later.`,
        },
      ],
      investigationTasks: [
        'Review process flow deviations and identify control points vulnerable to bypass.',
        'Map departmental ownership to systems and control responsibilities.',
        'Capture stakeholder concerns that should shape audit procedures.',
      ],
      analysisTasks: [
        'Produce a RACI-style audit responsibility matrix for at least 8 key control activities.',
        'Identify at least 6 process breakpoints where evidence suggests controls may fail.',
        'Define interview and walkthrough targets for each high-risk process.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description: 'Use prior risk registers and planning inputs to prioritize audit objectives and testing depth.',
      evidence: [
        LIKELIHOOD_GUIDE,
        IMPACT_GUIDE,
        {
          type: 'report',
          title: 'Prior-Year Audit Report Extract (2023)',
          reference: 'AUD-REPORT-2023-IT-EXTRACT',
          content: `Open or partially remediated findings:
- F-2023-04: Shared branch accounts remain active.
- F-2023-07: Access review coverage incomplete across branches.
- F-2023-09: Delayed account deprovisioning.
- F-2023-11: Backup restore test evidence outdated.
- F-2023-13: Change approvals bypassed during urgent releases.

2023 conclusion: "Control framework exists but operating effectiveness is inconsistent."`,
        },
        {
          type: 'table',
          title: 'Risk Register Snapshot from Lab 2 (Top Risks)',
          reference: 'RISK-SNAP-LAB2-TOP10',
          headers: ['Risk ID', 'Risk Statement', 'Score', 'Level', 'Trend'],
          rows: [
            ['R-01', 'Unauthorized HRIS access via shared accounts and weak authentication', '16', 'Critical', 'Increasing'],
            ['R-02', 'Credential compromise due to weak password hygiene and no MFA', '16', 'Critical', 'Increasing'],
            ['R-03', 'Data loss from untested backup restoration process', '15', 'High', 'Stable'],
            ['R-04', 'Privilege abuse from excessive and stale access rights', '15', 'High', 'Increasing'],
            ['R-05', 'Service disruption from delayed security patching', '14', 'High', 'Stable'],
          ],
        },
      ],
      investigationTasks: [
        'Analyze unresolved 2023 findings and compare to Lab 2 top risks.',
        'Identify where risk trends are increasing and require deeper audit testing.',
      ],
      analysisTasks: [
        'Define at least 6 audit objectives explicitly tied to top-risk statements.',
        'Prioritize objectives using a risk-scored rationale and expected business impact.',
        'Determine sampling strategy for each objective (population, sample size logic, period coverage).',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '35 minutes',
      description: 'Design control testing procedures and checklist items that validate both design and operating effectiveness.',
      evidence: [
        {
          type: 'policy',
          title: 'Internal Audit Methodology Note — Procedure Design Standards',
          reference: 'AUD-METH-PRC-2025',
          content: `Procedure design requirements:
1) State control objective
2) Identify control owner and control frequency
3) Specify test technique (inspection, inquiry, observation, reperformance, analytics)
4) Define pass/fail criteria
5) Identify required evidence artifact

Programs lacking pass/fail criteria are considered incomplete.`,
        },
        {
          type: 'table',
          title: 'Draft Audit Procedures (Incomplete Team Draft)',
          reference: 'DRAFT-PROG-IT-2025-v0.2',
          headers: ['Procedure ID', 'Draft Procedure', 'Gap Observed'],
          rows: [
            ['P-01', 'Review password policy document', 'No operating test defined'],
            ['P-02', 'Check whether backups are done daily', 'No restore validation step'],
            ['P-03', 'Inspect list of user accounts', 'No stale account criteria specified'],
            ['P-04', 'Review change requests for completeness', 'No sampling period defined'],
            ['P-05', 'Interview IT manager about MFA roadmap', 'No evidence triangulation'],
          ],
        },
      ],
      investigationTasks: [
        'Assess weaknesses in the draft audit program against methodology standards.',
        'Identify missing procedures needed to cover high-risk areas comprehensively.',
      ],
      analysisTasks: [
        'Build a full audit program with at least 15 detailed procedures and explicit pass/fail criteria.',
        'Create an audit checklist that maps each procedure to risk IDs and expected evidence.',
        'Ensure procedures test real behavior (logs, transactions, approvals), not only documentation.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '30 minutes',
      description: 'Finalize planning outputs and propose improvements to ensure efficient, risk-focused fieldwork.',
      evidence: [
        {
          type: 'report',
          title: 'Planning Quality Review Notes — Internal Audit Manager',
          reference: 'QA-PLAN-REVIEW-2025-IT',
          content: `Common planning defects in prior audits:
- Scope too broad without resource alignment
- Procedures not traceable to risk statements
- No clear sampling strategy
- Checklist questions too generic
- Limited integration of prior unresolved findings

Current expectation: produce a planning file that another auditor can execute without ambiguity.`,
        },
        {
          type: 'memo',
          title: 'Fieldwork Readiness Criteria',
          reference: 'AUD-FIELD-READY-CRITERIA',
          content: `Fieldwork can start only if:
1) Scope and objectives are approved
2) Procedures cover high and critical risks
3) Evidence request list is complete
4) Timeline and ownership are agreed
5) Escalation protocol is defined`,
        },
      ],
      investigationTasks: [
        'Review readiness criteria and identify missing planning components.',
        'Validate that proposed program addresses recurring weaknesses from prior audits.',
      ],
      analysisTasks: [
        'Document planning findings on gaps in the draft program and checklist.',
        'Provide targeted recommendations to improve execution quality and evidence reliability.',
        'Prepare a final planning package summary for sign-off by audit management.',
      ],
    },
  ],
  requiredOutputs: [
    'Audit Planning Charter (scope, objectives, boundaries, assumptions)',
    'Risk-to-Objective Mapping Table',
    'Detailed Audit Program (minimum 15 procedures)',
    'Audit Checklist aligned to procedures and risk IDs',
    'Evidence Request List and Fieldwork Schedule',
    'Planning Findings and Recommendations',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report (planning workpapers)',
    'Audit Program',
    'Audit Checklist',
    'Planning Findings',
    'Recommendations',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes:
    'Use risk IDs from Lab 2 and maintain numbering consistency. Your audit program will be executed in subsequent laboratories and the final project.',
  requiredAnalysis: [
    'Select appropriate audit types and define audit objectives aligned with management concerns.',
    'Define audit scope, boundaries, and limitations from engagement evidence.',
    'Design audit procedures and evidence collection plans for prioritized risks.',
    'Explain the audit process from planning through reporting using course concepts.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
