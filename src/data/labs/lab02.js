import { CIA_GUIDE, IMPACT_GUIDE, LIKELIHOOD_GUIDE, STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 2,
  slug: 'lab-2',
  title: 'IT Governance and Risk Management Assessment',
  shortDescription: 'Assess governance frameworks, risk identification, governance weaknesses, and compliance exposure using IT governance memos, policies, and risk register evidence.',
  week: 3,
  topic: 'IT Governance and Risk Management',
  type: 'guided',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-GOV-001', 'EV-GOV-002', 'EV-GOV-003'],
  semesterContext:
    'Week 3-4 of the semester-long audit engagement. Following the Branch 4 incident in Lab 1, the IT Governance Committee directs the audit team to perform a formal enterprise IT risk assessment.',
  objective:
    'Develop a defensible enterprise risk register with at least 15 risks, score each risk using likelihood and impact criteria, and produce a risk matrix that highlights MCST Retail Corporation’s highest priority IT risks.',
  scenario: `The IT Governance Committee has escalated concerns that the Branch 4 incident is not isolated. You have been provided with expanded evidence: network vulnerability scan outputs, unresolved risks from prior years, business impact estimates, and incident trends from branches.

Management expects a formal risk register that can be presented to executives and used as the baseline for the rest of the semester audit. Weaknesses are embedded in the evidence and are not directly labeled. Your role is to identify threat-vulnerability-asset combinations, quantify risk, and justify ratings with audit-quality documentation.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description:
        'Consolidate all available risk inputs from governance directives, incidents, and enterprise architecture context. Identify critical assets and business processes that must be represented in the risk register.',
      evidence: [
        {
          type: 'memo',
          title: 'IT Governance Committee Directive — Formal Enterprise Risk Assessment',
          reference: 'GOV-MEMO-2025-04-01',
          meta: { From: 'IT Governance Committee Chair', To: 'Internal Audit Team', Date: 'April 1, 2025' },
          content: `Due to recurring security and operational incidents, Internal Audit is directed to complete an enterprise IT risk assessment for Board review.

Minimum requirements:
- Include all critical systems: POS, SMS, IMS, HRIS, Payroll, AD, VPN, backups, and branch networks.
- Include unresolved risks from 2023-2024.
- Quantify business impact using estimated financial loss and downtime.
- Deliver a risk register with at least 15 risks and a 5x5 matrix.

Committee concerns: shared accounts at branches, no MFA on key systems, outdated policies, weak backup assurance, and unauthorized access events.`,
        },
        {
          type: 'architecture',
          title: 'Enterprise Technology Footprint — MCST Retail',
          reference: 'ARCH-ENT-2025-04',
          content: `[CORE BUSINESS STACK]
- SMS and IMS (centralized at Head Office)
- HRIS and Payroll (separate app server, shared SQL backend)
- POS endpoints (48 terminals across 12 branches)

[IDENTITY AND ACCESS]
- Active Directory (single forest, minimal OU segmentation)
- VPN for remote admin and outsourced vendor support
- No MFA on AD, HRIS, Payroll, and M365

[DATA PROTECTION]
- Daily backup jobs to local backup server + cloud replication
- No documented quarterly restoration tests since 2023

[NETWORK]
- Flat branch LAN segments in 7 of 12 branches
- Guest Wi-Fi physically separate but routed through same branch firewall appliance`,
        },
        CIA_GUIDE,
      ],
      investigationTasks: [
        'Review the governance memo and identify explicit scope requirements for the enterprise risk assessment.',
        'Map the technology footprint to business-critical services and dependent assets.',
        'List asset groups that must appear in the risk register to avoid scope gaps.',
      ],
      analysisTasks: [
        'Create an asset-risk scoping sheet that identifies at least 12 in-scope assets or asset groups.',
        'Assign CIA priority levels to at least 8 critical assets and justify each rating.',
        'Identify 5 governance concerns in the directive and translate each into a risk hypothesis statement.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '35 minutes',
      description:
        'Investigate raw technical and operational evidence that may indicate risk drivers, including vulnerabilities, poor security practices, and unresolved control failures.',
      evidence: [
        {
          type: 'security-report',
          title: 'Network Vulnerability Scan Summary (Head Office + Branches)',
          reference: 'VSCAN-2025-03-28',
          content: `High-level results:
- 19 hosts with critical vulnerabilities; 37 hosts with high vulnerabilities.
- 11 POS endpoints running unsupported or near-end-of-support OS builds.
- Domain controller MCST-DC01 missing 7 security patches older than 90 days.
- SMBv1 detected on 6 branch systems.
- 4 systems expose RDP internally without network-level authentication.
- Backup server allows legacy NTLM authentication.

Noted by assessor: "Patching window repeatedly deferred due to peak sales operations."`,
        },
        {
          type: 'log',
          title: 'Consolidated Authentication Event Log (March 2025)',
          reference: 'AUTH-LOG-2025-03',
          headers: ['Date', 'System', 'Event', 'Count', 'Observation'],
          rows: [
            ['2025-03-04', 'VPN Gateway', 'Failed login attempts', '312', 'No lockout triggered'],
            ['2025-03-09', 'HRIS', 'Privilege escalation attempts', '7', 'From shared branch workstation IP range'],
            ['2025-03-12', 'Active Directory', 'Password reset by helpdesk', '41', '24 reset without ticket reference'],
            ['2025-03-15', 'Payroll', 'After-hours login', '5', '2 from terminated employee credentials'],
            ['2025-03-21', 'M365', 'Suspicious inbox rule creation', '3', 'All accounts had no MFA'],
          ],
        },
        {
          type: 'email',
          title: 'Email Thread — Branch Operations and Shared Credentials',
          reference: 'EMAIL-OPS-2025-03-31',
          meta: { From: 'regional.ops@mcstretail.com', To: 'branch-managers@mcstretail.com', Date: 'March 31, 2025' },
          content: `Subject: Faster opening shift handovers

Team,
Please keep using the shared manager workstation login during opening shifts to avoid delays. We can revisit unique accounts later after peak season.

Reminder: Branch password stickers should be hidden from customers.

-- Regional Operations`,
        },
      ],
      investigationTasks: [
        'Analyze scan and authentication evidence for recurring technical weaknesses.',
        'Identify where behavior in practice contradicts access control policy expectations.',
        'Extract all candidate risk indicators from logs, scan findings, and email directives.',
      ],
      analysisTasks: [
        'Document at least 20 risk indicators and group them as vulnerability, threat event, or governance weakness.',
        'Identify at least 6 indicators that point to systemic issues (not one-time exceptions).',
        'Draft preliminary risk statements in the format: "If [threat] exploits [vulnerability], then [impact] to [asset/process]."',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '40 minutes',
      description:
        'Convert risk indicators into a formal risk register with scoring and evidence-backed justifications.',
      evidence: [
        LIKELIHOOD_GUIDE,
        IMPACT_GUIDE,
        {
          type: 'table',
          title: 'Business Impact Baseline — Process Disruption and Financial Exposure',
          reference: 'BIA-BASE-2025-Q1',
          headers: ['Business Process', 'Estimated Loss per 4-Hour Outage', 'Operational Impact', 'Regulatory/Legal Exposure'],
          rows: [
            ['Branch POS Sales Processing', '₱1.8M', 'Store queues, missed sales, manual receipts', 'Consumer complaints, reconciliation risk'],
            ['Payroll Processing', '₱950K', 'Late salary release, HR escalation', 'Labor compliance risk'],
            ['Inventory Synchronization', '₱620K', 'Stock mismatch, re-order delays', 'Supplier disputes'],
            ['HRIS Access', '₱300K', 'Delayed HR actions and records updates', 'Privacy incident liability'],
            ['Backup and Restore Service', '₱2.4M', 'Extended recovery after failure', 'Potential contractual breach'],
          ],
        },
      ],
      investigationTasks: [
        'Review likelihood and impact guides and align them with MCST operating context.',
        'Use BIA data to calibrate impact scoring thresholds for key processes.',
      ],
      analysisTasks: [
        'Build a Risk Register with at least 15 complete risk entries; include risk ID, threat, vulnerability, asset, L, I, score, and level.',
        'Provide one-sentence scoring justification for likelihood and one for impact per risk.',
        'Ensure at least 5 risks are rated High and at least 3 are rated Critical based on evidence.',
        'Tag each risk as Confidentiality, Integrity, Availability, or Multi-dimensional primary concern.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '35 minutes',
      description:
        'Evaluate current controls linked to each risk and determine where controls are absent, weak, or inconsistently enforced.',
      evidence: [
        {
          type: 'policy',
          title: 'Identity and Access Management Policy (Excerpt)',
          reference: 'POL-IAM-004 v1.9',
          meta: { 'Last Reviewed': '2022-05-19', Owner: 'IT Security' },
          content: `- Unique user IDs required for all employees.
- Shared accounts prohibited except approved service IDs.
- Privileged access must be reviewed quarterly.
- MFA required for all remote and sensitive system access.
- Terminated users must be disabled within 24 hours.

Exception handling:
- Temporary exceptions require CISO approval and 30-day expiry.`,
        },
        {
          type: 'report',
          title: 'Control Performance Status — Self-Assessment by IT',
          reference: 'CTRL-SELF-2025-Q1',
          headers: ['Control Area', 'Control Status', 'Evidence Provided', 'Auditor Observation'],
          rows: [
            ['MFA deployment', 'Planned', 'Project roadmap only', 'Control absent in current period'],
            ['Quarterly access review', 'Partially implemented', 'Q1 spreadsheet incomplete', 'No branch-level sign-off'],
            ['Backup restoration testing', 'Implemented', '2023 test report only', 'No recent test evidence'],
            ['Patch management', 'Implemented', 'Monthly patch schedule', 'Critical backlog remains open'],
            ['Audit logging', 'Implemented', 'Log exports from selected systems', 'HRIS and some branches have retention gaps'],
          ],
        },
      ],
      investigationTasks: [
        'Compare policy requirements against actual control performance evidence.',
        'Identify risks with no effective preventive controls and risks with weak detective controls.',
        'Trace unresolved controls back to previously identified risk entries.',
      ],
      analysisTasks: [
        'Add existing controls and control effectiveness ratings to each risk register entry.',
        'Create a control gap list for risks with controls rated Ineffective or Not Present.',
        'Prioritize top 8 control remediation actions based on risk score and implementation feasibility.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '35 minutes',
      description:
        'Translate risk assessment results into formal audit outputs for management and governance reporting.',
      evidence: [
        {
          type: 'change-request',
          title: 'Change Request Log (Security Remediation) — Deferred Items',
          reference: 'CR-SEC-LOG-2024-2025',
          headers: ['CR ID', 'Requested Change', 'Requested Date', 'Status', 'Reason for Deferral'],
          rows: [
            ['CR-221', 'Enable MFA for HRIS and Payroll', '2024-10-14', 'Deferred', 'Peak season support constraints'],
            ['CR-238', 'Disable shared branch admin accounts', '2024-11-02', 'Deferred', 'Operational convenience requested'],
            ['CR-247', 'Implement backup restore drill quarterly', '2025-01-05', 'Open', 'No assigned owner'],
            ['CR-255', 'Enforce AD password expiration for shared accounts', '2025-01-22', 'Deferred', 'Potential branch disruption'],
          ],
        },
        {
          type: 'memo',
          title: 'Board Risk Reporting Template Requirement',
          reference: 'BOARD-TPL-RISK-2025',
          content: `Board reporting must include:
1) Top 10 enterprise IT risks with score and trend
2) Risks above tolerance level
3) Control coverage summary
4) Recommended timeline: Immediate (0-30 days), Near-term (31-90 days), Strategic (91-180 days)`,
        },
      ],
      investigationTasks: [
        'Review deferred security change requests and identify links to high and critical risks.',
        'Align outputs to board reporting requirements for clarity and actionability.',
      ],
      analysisTasks: [
        'Prepare at least 5 formal audit findings using risk evidence and control gap analysis.',
        'Produce a risk matrix narrative describing concentration patterns and risk drivers.',
        'Develop a prioritized recommendation roadmap grouped by Immediate, Near-term, and Strategic actions.',
        'Document risk ownership assignments for top 10 risks (business owner and control owner).',
      ],
    },
  ],
  requiredOutputs: [
    'Enterprise IT Risk Register (minimum 15 risks)',
    '5x5 Risk Matrix with plotted risks and legend',
    'Risk Scoring Justification Notes (likelihood and impact rationale)',
    'Control Effectiveness Summary linked to risk IDs',
    'Top 10 Risk Executive Brief for IT Governance Committee',
    'Formal Audit Findings and Recommendations',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report (risk assessment workpapers)',
    'Risk Matrix Visualization',
    'Audit Findings (risk-focused)',
    'Recommendations and Remediation Roadmap',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes:
    'Carry forward risk IDs into Labs 3–14. Compare governance framework alignment (COBIT, ITIL, ISO 27001) against observed practices.',
  requiredAnalysis: [
    'Compare governance framework expectations against documented IT governance practices.',
    'Identify governance weaknesses from memos, outdated policies, and management communications.',
    'Assess risk register completeness, ownership, and scoring defensibility.',
    'Evaluate compliance exposure from incomplete governance and risk management processes.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
