import { STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 4,
  slug: 'lab-4',
  title: 'Internal Controls Assessment',
  shortDescription: 'Assess preventive, detective, and corrective controls; evaluate control design and operating effectiveness.',
  week: 5,
  topic: 'IT Controls and Security',
  type: 'guided',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-ACC-003', 'EV-ACC-004'],
  semesterContext:
    'Week 7-8 of the semester audit engagement. The audit team transitions from planning into detailed control analysis and mapping.',
  objective:
    'Compile the control universe, classify controls by type and function, evaluate design/operation quality, and map controls to enterprise risks to identify coverage gaps.',
  scenario: `Management provided a control inventory, policy set, and selected test evidence. Initial review suggests that many controls are documented but inconsistently applied in actual operations.

You must evaluate what controls exist, how they should work, and whether they are truly effective. Do not assume management’s control labels are correct. Use evidence to classify controls as preventive, detective, or corrective and determine where risks are insufficiently controlled.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description: 'Build a baseline control inventory using policy and management-provided control lists.',
      evidence: [
        {
          type: 'table',
          title: 'Enterprise Control Inventory (Management Submission)',
          reference: 'CTRL-INV-2025-v1',
          headers: ['Control ID', 'Control Name', 'Management Type', 'Owner', 'Frequency', 'Documented?'],
          rows: [
            ['C-01', 'Unique user account provisioning', 'Preventive', 'IT Service Desk', 'On demand', 'Yes'],
            ['C-02', 'Branch shared manager login usage', 'Preventive', 'Branch Operations', 'Daily', 'No'],
            ['C-03', 'Password expiration enforcement', 'Preventive', 'IT Infrastructure', 'Automated', 'Yes'],
            ['C-04', 'Quarterly access review', 'Detective', 'IT + Department Heads', 'Quarterly', 'Yes'],
            ['C-05', 'Backup job monitoring', 'Detective', 'IT Infrastructure', 'Daily', 'Yes'],
            ['C-06', 'Backup restoration drill', 'Corrective', 'IT Infrastructure', 'Quarterly', 'Yes'],
            ['C-07', 'Security incident escalation', 'Corrective', 'IT Security', 'As needed', 'Yes'],
            ['C-08', 'MFA for sensitive systems', 'Preventive', 'IT Security', 'Continuous', 'Planned'],
            ['C-09', 'Privileged access approval', 'Preventive', 'System Owners', 'On demand', 'Yes'],
            ['C-10', 'Change Advisory Board approval', 'Preventive', 'IT Governance', 'Weekly', 'Yes'],
          ],
        },
        {
          type: 'policy',
          title: 'Access Control and Credential Management Policy',
          reference: 'POL-ACC-2024-v2.2',
          meta: { 'Last Reviewed': '2024-01-12', Owner: 'IT Security' },
          content: `- Shared user IDs are prohibited.
- Password minimum length is 10 with complexity and 90-day expiration.
- Privileged access requires documented approval.
- MFA is mandatory for HRIS, Payroll, and remote access.
- Terminated user access must be removed within 24 hours.`,
        },
      ],
      investigationTasks: [
        'Reconcile management control list with policy requirements.',
        'Identify controls that are undocumented, ambiguously defined, or contradictory.',
      ],
      analysisTasks: [
        'Create a normalized control inventory with clear control objectives and control owners.',
        'Flag controls that may be misclassified by management and provide reason codes.',
        'Identify at least 6 control design weaknesses visible from policy vs inventory comparison.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '35 minutes',
      description: 'Investigate real-world evidence to verify whether controls operate as described.',
      evidence: [
        {
          type: 'log',
          title: 'Access Review Execution Log (Q1 2025)',
          reference: 'LOG-ACCESS-REVIEW-Q1',
          headers: ['Department', 'Review Due Date', 'Completed Date', 'Reviewer', 'Exceptions Noted'],
          rows: [
            ['HR', '2025-03-31', '2025-04-18', 'HR Manager', '2 stale accounts unresolved'],
            ['Finance', '2025-03-31', 'Not Completed', 'N/A', 'No review evidence'],
            ['Branch Operations', '2025-03-31', '2025-04-25', 'Regional Ops', 'Shared accounts retained'],
            ['IT', '2025-03-31', '2025-03-29', 'IT Manager', 'Privileged list outdated'],
          ],
        },
        {
          type: 'email',
          title: 'Email — Backup Restoration Test Follow-up',
          reference: 'EMAIL-BKP-2025-04-30',
          meta: { From: 'it.infrastructure@mcstretail.com', To: 'audit.team@mcstretail.com', Date: 'April 30, 2025' },
          content: `Subject: Re: Q1 restore test evidence

We were unable to execute full restoration test this quarter due to workload. We validated only that backup files exist in cloud storage. No end-to-end restore was performed.

Last full restore exercise on record is November 2023.`,
        },
        {
          type: 'report',
          title: 'Control Testing Worksheet (Internal QA Sample)',
          reference: 'CTRL-TEST-INTERNAL-2025',
          headers: ['Control ID', 'Test Performed', 'Result', 'Observation'],
          rows: [
            ['C-01', 'Sampled 20 new accounts for approval trail', 'Fail', '5 accounts missing department approval'],
            ['C-03', 'Checked password age for shared accounts', 'Fail', '3 shared accounts set to never expire'],
            ['C-04', 'Reviewed Q1 access review completion', 'Partial', '2 departments late or incomplete'],
            ['C-05', 'Inspected daily backup job status', 'Pass', 'Jobs completed but no recovery validation'],
            ['C-10', 'Sampled emergency changes for CAB approval', 'Fail', '4 of 12 had post-implementation approval only'],
          ],
        },
      ],
      investigationTasks: [
        'Validate whether documented controls were executed in required frequency and completeness.',
        'Identify control breakdown patterns across departments and processes.',
      ],
      analysisTasks: [
        'Rate each tested control as Pass, Partial, or Fail with evidence references.',
        'Determine root causes for repeated control failures (ownership, policy clarity, tooling, culture).',
        'Document at least 8 control operating weaknesses with direct evidence traceability.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description: 'Assess residual risk levels by combining control effectiveness results with inherited risk ratings.',
      evidence: [
        {
          type: 'table',
          title: 'Top Risk Snapshot (Carryforward from Lab 2)',
          reference: 'RISK-CF-L2-TOP12',
          headers: ['Risk ID', 'Description', 'Inherent Score', 'Current Control Coverage'],
          rows: [
            ['R-01', 'Unauthorized access via shared credentials', '16', 'Partial'],
            ['R-02', 'Credential theft and account compromise', '16', 'Weak'],
            ['R-03', 'Data loss due to untested restore capability', '15', 'Weak'],
            ['R-04', 'Excessive privilege abuse', '15', 'Partial'],
            ['R-05', 'Service disruption from delayed patching', '14', 'Partial'],
            ['R-06', 'Unauthorized emergency changes', '14', 'Weak'],
          ],
        },
        {
          type: 'memo',
          title: 'Residual Risk Assessment Guidance',
          reference: 'RISK-GUIDE-RESIDUAL-2025',
          content: `Residual risk should be reassessed after considering control effectiveness:
- Effective controls may reduce residual risk by 1-2 levels.
- Partially effective controls may reduce risk marginally.
- Ineffective or absent controls do not reduce risk.

Document rationale for each residual risk change.`,
        },
      ],
      investigationTasks: [
        'Review control effectiveness outcomes against high and critical inherited risks.',
        'Identify risks with minimal risk reduction due to weak controls.',
      ],
      analysisTasks: [
        'Recalculate residual ratings for at least 12 risks using control effectiveness results.',
        'Highlight risks that remain High or Critical despite existing controls.',
        'Prepare a residual risk heat summary for management review.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '35 minutes',
      description: 'Classify controls by preventive/detective/corrective function and build control-to-risk mapping matrices.',
      evidence: [
        {
          type: 'table',
          title: 'Control Classification Reference',
          reference: 'CTRL-CLASS-REF-2025',
          headers: ['Classification', 'Definition', 'Typical Example'],
          rows: [
            ['Preventive', 'Stops undesirable events before occurrence', 'MFA, approval workflows, segregation of duties'],
            ['Detective', 'Identifies events after occurrence', 'Log monitoring, access reviews, exception reports'],
            ['Corrective', 'Restores operations or reduces impact after event', 'Incident response, restoration procedures'],
          ],
        },
        {
          type: 'screenshot',
          title: 'Branch Manager Workstation Session State',
          reference: 'SCR-BRANCH4-SESSION-2025-05-01',
          content: `Screenshot observation notes:
- Logged in as SHARED\\branch4_mgr
- HRIS and IMS shortcuts on desktop
- Session unlocked and unattended for 14 minutes
- Sticky note with account hint visible near monitor
- Local admin group membership includes branch supervisor`,
        },
      ],
      investigationTasks: [
        'Classify each control objectively based on function, not management label.',
        'Map controls to risks and identify overlap, dependency, and single points of failure.',
      ],
      analysisTasks: [
        'Produce a full control classification matrix for all identified controls.',
        'Create a control-risk mapping matrix covering at least 12 risks and their related controls.',
        'Identify at least 5 risks with weak or missing preventive controls and 5 with weak detective coverage.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '30 minutes',
      description: 'Develop formal findings from control weaknesses and propose targeted remediation measures.',
      evidence: [
        {
          type: 'memo',
          title: 'Finding Prioritization Criteria for Control Weaknesses',
          reference: 'AUD-FIND-PRIOR-CTRL-2025',
          content: `Prioritize findings by:
1) Residual risk level
2) Breadth of impact across branches/departments
3) Repeat/non-remediated status
4) Regulatory or privacy implications`,
        },
        {
          type: 'report',
          title: 'Management Action Plan Draft (Unapproved)',
          reference: 'MAP-DRAFT-2025-CTRL',
          headers: ['Weakness Theme', 'Proposed Action', 'Owner', 'Target Date', 'Concern'],
          rows: [
            ['Shared accounts', 'Train branches on proper access practices', 'Branch Ops', '2025-08-30', 'No technical enforcement included'],
            ['MFA gap', 'Start pilot with 10 users', 'IT Security', '2025-09-15', 'Scope too limited vs risk exposure'],
            ['Backup testing', 'Validate backup completion monthly', 'IT Infra', '2025-07-15', 'No restore testing commitment'],
          ],
        },
      ],
      investigationTasks: [
        'Evaluate whether draft management actions are sufficient to address observed control gaps.',
        'Identify findings requiring immediate remediation due to residual risk exposure.',
      ],
      analysisTasks: [
        'Write at least 5 control-focused audit findings with clear condition, criteria, cause, effect, and recommendation elements.',
        'Provide a recommendation set that includes technical enforcement, governance fixes, and monitoring improvements.',
        'Define implementation priority windows: Immediate (0-30 days), Short-term (31-90 days), Long-term (91-180 days).',
      ],
    },
  ],
  requiredOutputs: [
    'Normalized Control Inventory with ownership and objectives',
    'Control Classification Matrix (Preventive/Detective/Corrective)',
    'Control Testing Results with Pass/Partial/Fail ratings',
    'Control-Risk Mapping Matrix',
    'Residual Risk Reassessment Summary',
    'Formal Audit Findings and Remediation Recommendations',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report (control analysis workpapers)',
    'Control Classification Matrix',
    'Control Testing Summary',
    'Audit Findings',
    'Recommendations',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes:
    'Map all control references to risk IDs carried from Lab 2 and planning objectives from Lab 3.',
  requiredAnalysis: [
    'Classify controls as preventive, detective, or corrective with evidence support.',
    'Assess control design adequacy against policies and standards.',
    'Evaluate operating effectiveness using logs, exceptions, and walkthrough evidence.',
    'Identify security control weaknesses and map controls to prioritized risks.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
