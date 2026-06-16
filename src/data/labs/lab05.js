import { IMPACT_GUIDE, LIKELIHOOD_GUIDE, STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 5,
  slug: 'lab-5',
  title: 'Infrastructure and Application Audit Assessment',
  shortDescription: 'Audit network infrastructure, applications, access controls, change management, backup procedures, and operational controls.',
  week: 6,
  topic: 'Auditing IT Infrastructure and Applications',
  type: 'guided',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-INF-002', 'EV-APP-001', 'EV-APP-002', 'EV-CHG-001', 'EV-BKP-001'],
  semesterContext:
    'Week 9-10 of the semester audit engagement. The audit team executes targeted technical testing over infrastructure and application controls.',
  objective:
    'Evaluate infrastructure and application control effectiveness by analyzing server baselines, network segmentation, application modules, and change management evidence.',
  scenario: `MCST’s management believes most technical controls are "good enough," but recent incidents suggest deeper weaknesses. You are provided with server inventories, network diagrams, application module findings, and change request records.

Your job is to test whether infrastructure and application controls protect confidentiality, integrity, and availability in practice. Expect hidden weaknesses: outdated systems, control bypass, weak segregation, and incomplete logging.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description: 'Understand the infrastructure and application landscape, including critical systems and dependencies.',
      evidence: [
        {
          type: 'table',
          title: 'Server Inventory and Patch Baseline',
          reference: 'INFRA-SRV-INV-2025-05',
          headers: ['Server', 'Role', 'OS/Version', 'Patch Level', 'Support Status', 'Critical Notes'],
          rows: [
            ['MCST-DC01', 'Domain Controller', 'Windows Server 2012 R2', '2024-11 cumulative', 'Extended support near end', '7 pending critical patches'],
            ['MCST-DB01', 'SQL Database', 'Windows Server 2016', '2025-03 cumulative', 'Supported', 'Hosts HRIS/Payroll/SMS DBs'],
            ['MCST-APP01', 'Sales/Inventory App', 'Windows Server 2016', '2025-02 cumulative', 'Supported', 'Legacy API module enabled'],
            ['MCST-APP02', 'HRIS/Payroll App', 'Windows Server 2012 R2', '2024-10 cumulative', 'Extended support near end', 'No MFA integration'],
            ['MCST-BKP01', 'Backup Server', 'Windows Server 2012 R2', '2024-09 cumulative', 'Extended support near end', 'Uses shared service credentials'],
          ],
        },
        {
          type: 'architecture',
          title: 'Network Segmentation Diagram — Branch and Head Office',
          reference: 'NET-SEG-2025-05',
          content: `[HEAD OFFICE]
- Server VLAN (DC, DB, App, Backup)
- User VLAN (HR, Finance, IT)
- Flat management access route from IT jump host

[BRANCH MODEL]
- POS terminals and branch manager PC on same internal segment in 7 branches
- Guest Wi-Fi separated logically, but branch firewall allows broad east-west rules
- VPN tunnel from each branch to HQ

Known concern:
- Lateral movement containment controls not consistently enforced across branches.`,
        },
      ],
      investigationTasks: [
        'Identify outdated or high-risk server platforms and supporting control gaps.',
        'Analyze network architecture for segmentation weaknesses and lateral movement exposure.',
      ],
      analysisTasks: [
        'Document infrastructure asset criticality and control sensitivity for at least 10 assets/components.',
        'Flag minimum 6 baseline weaknesses related to patching, hardening, segmentation, or privileged access.',
        'Define technical audit focus areas for server, network, and endpoint layers.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '35 minutes',
      description: 'Investigate infrastructure and application evidence for operational control failures.',
      evidence: [
        {
          type: 'security-report',
          title: 'Application Security Review — Core Modules',
          reference: 'APPSEC-REVIEW-2025-Q2',
          content: `Modules tested:
1) HRIS Salary Inquiry
2) Payroll Approval Workflow
3) SMS Discount Override
4) Inventory Adjustment Interface

Findings summary:
- HRIS session timeout not enforced consistently.
- Payroll approval allows override by users with inherited admin role.
- SMS discount override log entries missing actor ID in 18% of sampled transactions.
- Inventory adjustment API accepts requests without robust input validation in legacy endpoint.

Additional note: No MFA challenge for privileged actions in HRIS/Payroll modules.`,
        },
        {
          type: 'log',
          title: 'Application Audit Trail Extract (April 2025)',
          reference: 'APP-AUDIT-LOG-2025-04',
          headers: ['Timestamp', 'Application', 'Action', 'User', 'Result', 'Log Completeness'],
          rows: [
            ['2025-04-06 10:22', 'Payroll', 'Approve payout batch', 'payroll_admin', 'Success', 'Complete'],
            ['2025-04-06 10:24', 'Payroll', 'Override payout threshold', 'payroll_admin', 'Success', 'Missing reason code'],
            ['2025-04-11 14:09', 'SMS', 'Discount override', 'branch4_mgr_shared', 'Success', 'Missing actor user ID'],
            ['2025-04-18 09:41', 'HRIS', 'Salary record view', 'shared session token', 'Success', 'No individual user attribution'],
            ['2025-04-22 16:37', 'IMS', 'Inventory adjustment API', 'svc_legacy_api', 'Success', 'No source validation details'],
          ],
        },
        {
          type: 'email',
          title: 'Email — App Support on Known Weaknesses',
          reference: 'EMAIL-APP-OPS-2025-05-06',
          meta: { From: 'app.support@mcstretail.com', To: 'audit.team@mcstretail.com', Date: 'May 6, 2025' },
          content: `Subject: Re: Application control questions

Some legacy modules still rely on shared service accounts for compatibility. Logging enhancements were planned for Q1 but postponed.

The payroll override control currently trusts role membership. If a user inherits payroll_admin privileges, they can approve and override in one session.

We know this violates separation expectations but refactoring is scheduled for later this year.`,
        },
      ],
      investigationTasks: [
        'Analyze application review findings for control design and operating weaknesses.',
        'Evaluate log quality and traceability for accountability and forensics.',
        'Identify evidence of segregation-of-duties, authentication, and validation failures.',
      ],
      analysisTasks: [
        'Document at least 10 infrastructure/application weaknesses with evidence citations.',
        'Classify weaknesses as authentication, authorization, logging, validation, patching, segmentation, or change-related.',
        'Assess how each weakness affects confidentiality, integrity, or availability objectives.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description: 'Quantify technical and application risks and compare against prior enterprise risk baseline.',
      evidence: [
        LIKELIHOOD_GUIDE,
        IMPACT_GUIDE,
        {
          type: 'table',
          title: 'Technical Risk Signal Matrix',
          reference: 'TECH-RISK-SIGNAL-2025',
          headers: ['Signal', 'Observed Condition', 'Potential Impact'],
          rows: [
            ['Outdated OS on critical servers', '3 critical servers on aging platform', 'Elevated exploit and availability risk'],
            ['Incomplete application logs', 'Missing actor IDs and reason codes', 'Weak accountability and delayed detection'],
            ['Privilege overlap in payroll', 'Approve + override capability in one role', 'Fraud and unauthorized payouts'],
            ['Session management weakness', 'Shared session tokens in HRIS', 'Unauthorized data viewing'],
            ['Flat branch segments', 'Limited lateral movement barriers', 'Faster spread of malware or compromise'],
          ],
        },
      ],
      investigationTasks: [
        'Review technical signals and align them with likelihood/impact criteria.',
        'Compare newly discovered technical risks against existing risk IDs from Lab 2.',
      ],
      analysisTasks: [
        'Create or update at least 15 risk entries that include infrastructure/application-specific threats and vulnerabilities.',
        'Re-score affected risks using current evidence and explain rating changes.',
        'Identify top 5 technical risks requiring immediate escalation.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '35 minutes',
      description: 'Assess controls over infrastructure hardening, application security, and change governance.',
      evidence: [
        {
          type: 'policy',
          title: 'Change Management and Secure Deployment Policy',
          reference: 'POL-CHANGE-SEC-2024-v1.5',
          content: `- All production changes require approved change request before deployment.
- Emergency changes require retrospective CAB approval within 24 hours.
- Security-impacting changes require risk assessment attachment.
- Application logging changes require security review sign-off.
- Segregation of duties required between developer and deployer roles.`,
        },
        {
          type: 'change-request',
          title: 'Change Request Sample — Production Releases (April-May 2025)',
          reference: 'CR-SAMPLE-PROD-2025-Q2',
          headers: ['CR ID', 'Change Description', 'Pre-Approval', 'Security Review', 'CAB Status', 'Observation'],
          rows: [
            ['CR-301', 'Patch rollout for APP01', 'Yes', 'No', 'Approved', 'Missing security impact assessment'],
            ['CR-307', 'Payroll override hotfix', 'No', 'No', 'Post-approved', 'Deployed before approval'],
            ['CR-312', 'HRIS session timeout adjustment', 'Yes', 'Yes', 'Approved', 'No evidence of post-change validation'],
            ['CR-318', 'IMS legacy API update', 'No', 'No', 'Pending', 'Already deployed in production'],
            ['CR-322', 'Branch firewall rule expansion', 'Yes', 'No', 'Approved', 'Rule scope broader than request'],
          ],
        },
        {
          type: 'report',
          title: 'Infrastructure Hardening Checklist Results',
          reference: 'HARDEN-CHK-2025-05',
          headers: ['Control Item', 'Status', 'Notes'],
          rows: [
            ['MFA on privileged admin accounts', 'Fail', 'Not enabled for AD and key applications'],
            ['Disable shared administrative accounts', 'Fail', 'Shared credentials still active for operations'],
            ['Patch critical vulnerabilities within SLA', 'Partial', 'Backlog exceeds defined patch SLA'],
            ['Centralized log retention >= 180 days', 'Partial', 'HRIS logs retained only 60 days'],
            ['Branch segmentation enforcement', 'Fail', '7 branches use flat internal segments'],
          ],
        },
      ],
      investigationTasks: [
        'Compare policy requirements against actual change records and hardening evidence.',
        'Identify infrastructure and application controls that are ineffective or bypassed.',
      ],
      analysisTasks: [
        'Produce a control effectiveness matrix for at least 12 technical controls.',
        'Map each ineffective control to affected risk IDs and impacted systems/modules.',
        'Recommend control design and monitoring changes to close high-risk technical gaps.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '30 minutes',
      description: 'Draft technical audit findings and practical remediation roadmap for infrastructure and application domains.',
      evidence: [
        {
          type: 'memo',
          title: 'Technical Finding Drafting Guide',
          reference: 'AUD-GUIDE-TECH-FIND-2025',
          content: `Technical findings must state:
1) Specific control failure condition
2) Required standard/policy criteria
3) Root cause (process, technology, or governance)
4) Security/business effect
5) Actionable remediation with accountable owner`,
        },
        {
          type: 'report',
          title: 'Operations Constraints Note — Implementation Planning',
          reference: 'OPS-CONSTRAINTS-2025-Q2',
          headers: ['Constraint', 'Impact on Remediation'],
          rows: [
            ['Peak weekend sales windows', 'Limits downtime for patching and deployments'],
            ['Limited branch IT staffing', 'Requires centralized controls and automation'],
            ['Legacy module dependencies', 'May require phased replacement and compensating controls'],
            ['Budget cycle timing', 'Major platform upgrades require staged approvals'],
          ],
        },
      ],
      investigationTasks: [
        'Align remediation options with operational constraints without reducing control objectives.',
        'Prioritize findings by residual risk and cross-branch/system impact.',
      ],
      analysisTasks: [
        'Write at least 5 infrastructure/application audit findings with evidence-based risk ratings.',
        'Prepare a remediation plan with Immediate, Short-term, and Strategic actions.',
        'Define measurable success criteria for each recommended control improvement.',
      ],
    },
  ],
  requiredOutputs: [
    'Infrastructure and Application Weakness Register',
    'Updated Risk Register entries (minimum 15 technical-focused risks)',
    'Technical Control Effectiveness Matrix',
    'Change Management Compliance Review Summary',
    'Formal Technical Audit Findings and Recommendations',
    'Implementation Roadmap with measurable milestones',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report (infrastructure/application workpapers)',
    'Technical Risk and Control Matrix',
    'Audit Findings',
    'Recommendations and Remediation Roadmap',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes:
    'Maintain traceability to risk IDs from prior labs. Infrastructure and application findings feed the final audit project.',
  requiredAnalysis: [
    'Review network infrastructure, server baselines, and segmentation evidence.',
    'Assess application access controls and audit trail completeness.',
    'Evaluate change management and backup procedure effectiveness.',
    'Identify infrastructure and application weaknesses with risk-based prioritization.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
