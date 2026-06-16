import { STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 7,
  slug: 'lab-7',
  title: 'Internal and External Controls Assessment',
  shortDescription:
    'Distinguish internal and external IT controls; assess SOX and ISO 27001 mapping and control effectiveness.',
  week: 8,
  topic: 'Internal and External IT Controls',
  type: 'guided',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-CMP-002'],
  semesterContext:
    'Week 10 engagement milestone. Students transition from issue-level testing to framework-based control adequacy and governance maturity assessment.',
  objective:
    'Evaluate the organization control environment by reconciling self-assessment claims with objective evidence and identifying structural gaps against recognized frameworks.',
  scenario: `MCST management submitted an internal controls self-assessment claiming "substantial compliance" with security standards. The Board requested independent validation before approving next-year cybersecurity budget.

Your team must test whether declared controls are actually designed and operating effectively. You will compare controls against ISO 27001 Annex A domains and selected COBIT 2019 governance/management objectives, then produce a defensible compliance and maturity position.

Intentional weaknesses exist in documentation quality, ownership clarity, and evidence consistency. Students are expected to discover these through analysis, not assumptions.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description:
        'Understand the current control universe and management claims. Establish initial control coverage baseline.',
      evidence: [
        {
          type: 'self-assessment',
          title: 'Internal IT Controls Self-Assessment (Management Submission)',
          reference: 'MGT-CSA-2025-Q2',
          headers: ['Control Area', 'Management Rating', 'Comments'],
          rows: [
            ['Access Management', 'Compliant', 'RBAC configured in all critical systems'],
            ['Vulnerability Management', 'Compliant', 'Patching is regularly performed'],
            ['Incident Response', 'Partially Compliant', 'Playbook exists; training pending'],
            ['Backup and Recovery', 'Compliant', 'Daily backup and cloud replication active'],
            ['Third-Party Risk', 'Compliant', 'Vendor vetting process implemented'],
            ['Security Awareness', 'Compliant', 'Annual security training delivered'],
          ],
        },
        {
          type: 'table',
          title: 'Control Ownership Register',
          reference: 'CTRL-OWN-2025',
          headers: ['Control Area', 'Primary Owner', 'Secondary Owner', 'Last Evidence Update'],
          rows: [
            ['Access Management', 'IT Operations', 'HR', '2024-07-01'],
            ['Patch Management', 'IT Infrastructure', 'None', '2024-04-18'],
            ['Incident Response', 'IT Security (outsourced)', 'Compliance', '2023-11-10'],
            ['Third-Party Risk', 'Procurement', 'Legal', '2023-08-25'],
            ['Backup and Recovery', 'IT Operations', 'Cloud Vendor', '2024-01-15'],
            ['Awareness Training', 'HR', 'IT Security', '2024-02-02'],
          ],
        },
        {
          type: 'memo',
          title: 'Audit Kickoff Note from CIO',
          reference: 'CIO-MEMO-07',
          content: `Our controls are "mostly in place," but formal evidence repositories are still being organized. Teams may provide screenshots and emails if formal control logs are not immediately available.

Please avoid requesting excessive historical records due to bandwidth limits.`,
        },
      ],
      investigationTasks: [
        'Compare claimed compliance status with evidence freshness and ownership clarity.',
        'Identify control areas where evidence appears outdated, incomplete, or informal.',
        'Determine which control areas require deeper validation in later phases.',
      ],
      analysisTasks: [
        'Build a baseline control coverage map by area, owner, and evidence currency.',
        'Document at least 6 initial red flags from management self-assessment quality issues.',
        'Assess reliability of self-reported compliance and justify confidence level.',
        'Prioritize top 5 control domains for detailed testing based on risk and uncertainty.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '35 minutes',
      description:
        'Test control claims against operational evidence and determine whether controls function in practice.',
      evidence: [
        {
          type: 'log-summary',
          title: 'Patch Compliance Dashboard Export',
          reference: 'PATCH-DASH-2025-05',
          headers: ['Asset Group', 'Devices', 'Critical Patches Missing >30 days', 'Last Scan Date'],
          rows: [
            ['Branch POS', '48', '19', '2025-05-04'],
            ['Head Office Servers', '12', '4', '2025-04-21'],
            ['Shared Branch Workstations', '12', '8', '2025-03-30'],
            ['Warehouse IoT Gateways', '6', '6', '2024-12-15'],
          ],
        },
        {
          type: 'record',
          title: 'Awareness Training Attendance List',
          reference: 'TRN-SEC-2025',
          headers: ['Department', 'Employees', 'Completed Training', 'Completion %'],
          rows: [
            ['Sales', '86', '33', '38%'],
            ['HR', '14', '9', '64%'],
            ['IT', '18', '17', '94%'],
            ['Finance', '22', '11', '50%'],
            ['Warehouse Ops', '29', '7', '24%'],
          ],
        },
        {
          type: 'email',
          title: 'Incident Response Test Deferral',
          reference: 'EMAIL-IR-TEST-2025-02',
          content: `Subject: Re: Annual IR tabletop exercise

We are postponing the incident response tabletop again this quarter due to payroll migration priorities. We'll continue using the 2023 playbook for now.

- IT Security Coordinator`,
        },
        {
          type: 'checklist',
          title: 'Vendor Due Diligence Checklist Samples',
          reference: 'VENDOR-DD-07',
          headers: ['Vendor', 'Security Questionnaire', 'Contract Security Clauses', 'Annual Review', 'Status'],
          rows: [
            ['CloudStore Inc.', 'Yes', 'Yes', 'No', 'Active'],
            ['PromoReach Digital', 'No', 'No', 'No', 'Active'],
            ['QuickSurvey PH', 'No', 'No', 'No', 'Active'],
          ],
        },
      ],
      investigationTasks: [
        'Reconcile each management claim with objective supporting evidence.',
        'Identify controls that are documented but weakly implemented.',
        'Quantify gaps using counts and percentages where possible.',
      ],
      analysisTasks: [
        'Document at least 10 tested controls with pass/fail conclusion and rationale.',
        'Identify false-positive management claims (claimed compliant but evidence indicates noncompliance).',
        'Assess whether control failures are isolated or systemic across departments.',
        'Prepare an evidence reliability note highlighting where audit assurance is limited.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description:
        'Translate control deficiencies into quantified risk scenarios tied to governance and compliance outcomes.',
      evidence: [
        {
          type: 'table',
          title: 'Control Deficiency Impact Hints',
          reference: 'RISK-HINT-07',
          headers: ['Deficiency', 'Potential Impact'],
          rows: [
            ['Unpatched endpoints', 'Ransomware/business disruption'],
            ['Low training completion', 'Higher phishing and social engineering success'],
            ['No recent IR exercise', 'Delayed containment and regulatory missteps'],
            ['Weak vendor due diligence', 'Third-party breach propagation'],
            ['Outdated control evidence', 'Inability to demonstrate compliance to regulators'],
          ],
        },
      ],
      investigationTasks: [
        'Define risk statements that connect deficiency, threat event, and business consequence.',
        'Identify which risks can trigger regulatory, contractual, or reputational fallout.',
      ],
      analysisTasks: [
        'Create a risk register with at least 12 control-related risks.',
        'Assign likelihood and impact scores with concise evidence-based rationale.',
        'Identify top 5 risks with immediate management attention requirement.',
        'Explain interdependency risks where multiple weak controls amplify severity.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '35 minutes',
      description:
        'Perform framework mapping and gap analysis versus ISO 27001 Annex A and COBIT 2019 objectives.',
      evidence: [
        {
          type: 'framework-map',
          title: 'ISO 27001 Annex A Mapping Starter',
          reference: 'ISO-A-MAP-07',
          headers: ['ISO Domain', 'Expected Control Theme', 'Current MCST Status'],
          rows: [
            ['A.5 Organizational controls', 'Policy governance and ownership', 'Partially defined, outdated evidence'],
            ['A.6 People controls', 'Awareness and responsibilities', 'Inconsistent completion and accountability'],
            ['A.8 Technological controls', 'Patch, IAM, monitoring', 'Significant implementation gaps'],
            ['A.5.19 Supplier relationships', 'Supplier security assurance', 'Weak screening and no recurrent reviews'],
          ],
        },
        {
          type: 'framework-map',
          title: 'COBIT 2019 Objective Mapping Starter',
          reference: 'COBIT-MAP-07',
          headers: ['COBIT Objective', 'Intent', 'Observed Maturity Indicator'],
          rows: [
            ['EDM03 Ensure Risk Optimization', 'Board-level risk oversight', 'Risk reporting ad hoc, not routine'],
            ['APO12 Manage Risk', 'Enterprise risk management integration', 'Control gaps not consolidated into risk view'],
            ['BAI06 Manage Changes', 'Controlled changes and testing', 'Patch/application updates inconsistently tracked'],
            ['DSS02 Manage Service Requests and Incidents', 'Structured incident handling', 'No recent testing, delayed escalation patterns'],
            ['MEA01 Monitor, Evaluate and Assess Performance', 'Control performance metrics', 'Few measurable control KPIs'],
          ],
        },
      ],
      investigationTasks: [
        'Map tested controls to relevant ISO Annex A and COBIT objectives.',
        'Identify where no control exists for a key framework expectation.',
      ],
      analysisTasks: [
        'Produce a framework gap matrix with at least 15 mapped requirements/objectives.',
        'Rate each mapped area: Fully Met, Partially Met, Not Met.',
        'Identify top 8 framework gaps by risk significance and remediation urgency.',
        'Propose maturity improvement actions for each major gap.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '40 minutes',
      description:
        'Issue formal findings on control adequacy, compliance posture, and governance maturity with actionable remediation plan.',
      evidence: [
        {
          type: 'memo',
          title: 'CCER Findings Guide for Framework Audits',
          reference: 'CCER-FW-07',
          content: `Condition: Measured control state.
Criteria: Internal policy and mapped framework requirement.
Cause: Ownership, process, or resource root cause.
Effect: Risk and compliance consequence.
Recommendation: Practical remediation with timeline and control owner.`,
        },
      ],
      investigationTasks: [
        'Select evidence-backed findings that reflect systemic control design or operation weaknesses.',
        'Validate that each finding has clear criteria from either policy, ISO, or COBIT mapping.',
      ],
      analysisTasks: [
        'Draft at least 5 CCER findings tied to framework gaps and tested evidence.',
        'Provide prioritized recommendations (Immediate, 60-day, 120-day).',
        'Prepare an executive control maturity summary for the Board.',
        'Define minimum KPI set to track remediation progress over next two quarters.',
      ],
    },
  ],
  requiredOutputs: [
    'Control Coverage Baseline',
    'Tested Controls Worksheet',
    'Control-Related Risk Register',
    'ISO 27001 Annex A Gap Matrix',
    'COBIT 2019 Objective Gap Matrix',
    'Audit Findings (minimum 5 CCER)',
    'Prioritized Control Maturity Roadmap',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report',
    'Risk Register',
    'Control Matrix',
    'Audit Findings (CCER format)',
    'Recommendations',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes:
    'Where management claims conflict with evidence, document both and justify audit conclusion. Use framework references consistently across findings.',
  requiredAnalysis: [
    'Distinguish internal IT controls from external framework requirements.',
    'Map controls to ISO 27001 and SOX-relevant ITGC areas where applicable.',
    'Assess control effectiveness using self-assessments, checklists, and test evidence.',
    'Identify compliance control gaps with framework-based justification.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
