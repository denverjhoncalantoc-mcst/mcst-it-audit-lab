export const evidenceCategories = [
  { id: 'governance', label: 'Governance and Policy Evidence' },
  { id: 'access', label: 'User and Access Evidence' },
  { id: 'infrastructure', label: 'Infrastructure Evidence' },
  { id: 'application', label: 'Application Evidence' },
  { id: 'privacy', label: 'Data Privacy Evidence' },
  { id: 'compliance', label: 'Compliance Evidence' },
  { id: 'incident', label: 'Incident Response Evidence' },
  { id: 'backup', label: 'Backup and Recovery Evidence' },
  { id: 'change', label: 'Change Management Evidence' },
  { id: 'emerging', label: 'Emerging Technology Evidence' },
]

export const evidenceFilters = [
  'Governance',
  'Access Control',
  'Privacy',
  'Compliance',
  'Infrastructure',
  'Application',
  'Emerging Technology',
]

export const evidenceItems = [
  {
    id: 'EV-GOV-001',
    title: 'IT Governance Committee Directive — Enterprise Risk Assessment',
    type: 'Audit Memo',
    category: 'governance',
    system: 'Enterprise Governance',
    department: 'IT Governance Committee',
    date: '2025-04-01',
    description: 'Formal directive requiring enterprise IT risk assessment following recurring incidents.',
    content: `Due to recurring security and operational incidents, Internal Audit is directed to complete an enterprise IT risk assessment for Board review.

Minimum requirements:
- Consolidated risk register with likelihood and impact scoring
- Identification of risks above tolerance
- Control coverage summary for top risks
- Remediation timeline grouped by urgency`,
    relatedLabs: [2, 9, 11],
    studentNotes: 'Compare governance expectations against actual practices documented in other evidence items.',
  },
  {
    id: 'EV-GOV-002',
    title: 'Outdated IT Policy Register Excerpt',
    type: 'Policy Document',
    category: 'governance',
    system: 'Policy Management',
    department: 'IT Department',
    date: '2025-03-01',
    description: 'Summary of IT policies with last review dates and ownership status.',
    content: `Information Security Policy — Last updated: 2023-08 (Owner: IT Manager)
Password and Access Control Policy v2.1 — Last updated: 2022-11 (Owner: IT Security — vacant)
Data Privacy Policy v1.2 — Last updated: 2024-01 (Owner: HR)
Change Management Policy — Draft only, not board-approved
Emerging Technology Governance — Not documented`,
    relatedLabs: [2, 7, 8],
    studentNotes: 'Evaluate policy currency, ownership clarity, and alignment with current technology use.',
  },
  {
    id: 'EV-GOV-003',
    title: 'Risk Register Draft — Management Submission',
    type: 'Risk Register',
    category: 'governance',
    system: 'Risk Management',
    department: 'IT Department',
    date: '2025-03-20',
    description: 'Partial enterprise risk register submitted by IT management.',
    content: `R-001 Unauthorized access to HRIS — Score: 16 — Owner: IT — Status: Open
R-002 Backup failure — Score: 12 — Owner: IT — Status: Deferred
R-003 Outdated server patching — Score: 15 — Owner: IT — Status: In progress
R-004 Shared branch credentials — Score: 18 — Owner: Operations — Status: Open
R-005 Privacy breach (marketing data) — Score: blank — Owner: blank — Status: Not assessed`,
    relatedLabs: [2, 11],
    studentNotes: 'Identify incomplete entries, missing owners, and risks that may be understated.',
  },
  {
    id: 'EV-ACC-001',
    title: 'HRIS Access Log — Branch 4 Workstation',
    type: 'Access Log',
    category: 'access',
    system: 'HRIS',
    department: 'Human Resources / Branch 4',
    date: '2025-03-01 to 2025-03-15',
    description: 'Application access events on shared Branch 4 manager workstation.',
    content: `2025-03-14 13:22 — anna.cruz — Employee Salary Inquiry — Success
2025-03-14 14:08 — anna.cruz — Session idle (no logout)
2025-03-15 14:15 — anna.cruz — Employee Salary Inquiry — Success (session reused)
2025-03-15 14:17 — U-203 — Employee Salary Inquiry — Success
2025-03-15 14:23 — U-203 — Session ended by supervisor`,
    relatedLabs: [1, 4, 6],
    studentNotes: 'Correlate log entries with the Branch 4 incident report and user entitlements.',
  },
  {
    id: 'EV-ACC-002',
    title: 'Active Directory User Account Listing',
    type: 'User Listing',
    category: 'access',
    system: 'Active Directory',
    department: 'IT Department',
    date: '2025-03-14',
    description: 'Export of selected user accounts and group memberships.',
    content: `anna.cruz — HR_Officers, Payroll_Read, Domain_Users
branch04.shared — Branch_Managers, POS_Supervisors (shared account)
rico.santos — Terminated 2024-09 — Status: Enabled
payroll_admin — Payroll_Full, Backup_Operators
U-203 — Sales_Associates, POS_Users`,
    relatedLabs: [1, 4, 5],
    studentNotes: 'Review account status, shared accounts, and privilege assignments.',
  },
  {
    id: 'EV-ACC-003',
    title: 'Access Approval Email — Emergency Provisioning',
    type: 'Email Communication',
    category: 'access',
    system: 'HRIS / Payroll',
    department: 'Human Resources',
    date: '2025-02-18',
    description: 'Email authorizing temporary elevated access without formal ticket.',
    content: `From: anna.cruz@mcstretail.com
To: it.support@mcstretail.com
Subject: URGENT payroll access for weekend

Please grant payroll_admin rights to finance.temp today only. We can do the form next week.`,
    relatedLabs: [4, 7],
    studentNotes: 'Assess whether emergency access followed approval and review controls.',
  },
  {
    id: 'EV-INF-001',
    title: 'System Architecture Diagram — MCST Retail',
    type: 'Architecture Diagram',
    category: 'infrastructure',
    system: 'Enterprise IT',
    department: 'IT Department',
    date: '2024-11-01',
    description: 'High-level diagram of head office, branches, and cloud connections.',
    content: `[HEAD OFFICE] Domain Controller, SQL Server, App Servers, Firewall, Backup Server
[12 BRANCHES] POS terminals, shared manager PC, Wi-Fi (guest + staff) via MPLS VPN
[CLOUD] CloudStore backup replication — API key shared among 3 IT staff
[EXTERNAL] Bank API, Microsoft 365`,
    relatedLabs: [1, 5, 10],
    studentNotes: 'Map assets, trust boundaries, and single points of failure.',
  },
  {
    id: 'EV-INF-002',
    title: 'Server Inventory and Patch Baseline',
    type: 'System Report',
    category: 'infrastructure',
    system: 'Infrastructure',
    department: 'IT Department',
    date: '2025-04-10',
    description: 'Server inventory with OS versions and patch compliance status.',
    content: `MCST-DC01 — Windows Server 2012 R2 — 47 days behind critical patches
MCST-DB01 — Windows Server 2012 R2 — 62 days behind critical patches
MCST-APP02 — Windows Server 2012 R2 — HRIS/Payroll — 38 days behind
MCST-BKP01 — Backup agent 2.3.1 — Last successful full backup: 12 days ago`,
    relatedLabs: [5, 10, 12],
    studentNotes: 'Evaluate end-of-life systems, patch delays, and operational risk.',
  },
  {
    id: 'EV-APP-001',
    title: 'Application Access List — Core Systems',
    type: 'Access Matrix',
    category: 'application',
    system: 'SMS, IMS, HRIS, Payroll',
    department: 'IT Department',
    date: '2025-04-05',
    description: 'Role-to-application access mapping for core business systems.',
    content: `Sales Associate — SMS: Read/Write, IMS: Read, HRIS: None, Payroll: None
Branch Manager — SMS: Admin, IMS: Read, HRIS: Read (via shared shortcut), Payroll: None
HR Officer — HRIS: Admin, Payroll: Full, SMS: None
Finance Analyst — Payroll: Full, HRIS: Read, IMS: Read`,
    relatedLabs: [5, 10],
    studentNotes: 'Compare designed access with observed log and incident evidence.',
  },
  {
    id: 'EV-APP-002',
    title: 'Application Audit Trail Extract',
    type: 'System Log',
    category: 'application',
    system: 'Payroll System',
    department: 'Finance and Payroll',
    date: '2025-03-20',
    description: 'Selected payroll module activity around incident date.',
    content: `14:02 — payroll_admin — EXPORT — payroll_master_mar2025.xlsx — Success
14:14 — payroll_admin — DOWNLOAD — payroll_master_mar2025.xlsx — Success
14:31 — Unknown workstation — VIEW — Employee Bank Details — Success
16:42 — IT ticket INC-2025-019 opened`,
    relatedLabs: [5, 13],
    studentNotes: 'Reconstruct activity sequence and identify logging gaps.',
  },
  {
    id: 'EV-PRV-001',
    title: 'Data Classification Table — Draft',
    type: 'Data Classification',
    category: 'privacy',
    system: 'Enterprise Data',
    department: 'IT / HR',
    date: '2025-03-25',
    description: 'Draft classification of key data types and handling requirements.',
    content: `Employee PII — Confidential — HRIS, Payroll — Encryption required
Customer mobile numbers — Internal — SMS, Marketing exports — DPA required
Biometric templates — Sensitive — Branch devices — Not defined in policy
Daily sales spreadsheets — Internal — Shared drives — No retention rule`,
    relatedLabs: [6, 10, 11],
    studentNotes: 'Identify inconsistent classification and missing controls.',
  },
  {
    id: 'EV-PRV-002',
    title: 'Customer Record Handling Memo',
    type: 'Internal Memo',
    category: 'privacy',
    system: 'SMS / Marketing',
    department: 'Sales / Marketing',
    date: '2025-04-02',
    description: 'Memo describing customer data export for marketing campaigns.',
    content: `Weekly SMS customer mobile exports are uploaded to vendor portal for campaign targeting. Legal review pending since Q4 2024. Marketing assistant maintains copy on shared folder \\marketing\\campaigns.`,
    relatedLabs: [6, 11],
    studentNotes: 'Assess lawful basis, vendor controls, and data minimization.',
  },
  {
    id: 'EV-CMP-001',
    title: 'Compliance Checklist Excerpt — Data Protection',
    type: 'Compliance Checklist',
    category: 'compliance',
    system: 'Privacy Program',
    department: 'Human Resources',
    date: '2025-03-15',
    description: 'Partial compliance self-assessment against data protection requirements.',
    content: `Data Protection Officer appointed — No
Records of Processing Activities complete — Partial
Privacy impact assessments — Not performed for biometric rollout
Breach notification procedure tested — No
Vendor DPAs signed — 2 of 7 vendors`,
    relatedLabs: [6, 7, 11],
    studentNotes: 'Map checklist gaps to regulatory and policy requirements.',
  },
  {
    id: 'EV-CMP-002',
    title: 'Internal Control Matrix — SOX / ISO Mapping',
    type: 'Control Matrix',
    category: 'compliance',
    system: 'Enterprise Controls',
    department: 'Internal Audit',
    date: '2025-04-08',
    description: 'Partial mapping of internal controls to external frameworks.',
    content: `AC-01 Access provisioning — ISO A.9 — SOX ITGC — Partially effective
CM-02 Change approval — ISO A.12 — SOX ITGC — Ineffective
BC-01 Backup testing — ISO A.12 — Not mapped — Not tested
PR-01 Privacy governance — ISO A.18 — Not mapped — Not assessed`,
    relatedLabs: [7, 12],
    studentNotes: 'Distinguish internal controls from external framework requirements.',
  },
  {
    id: 'EV-INC-001',
    title: 'Security Incident Report — Branch 4 Unauthorized Access',
    type: 'Incident Report',
    category: 'incident',
    system: 'HRIS',
    department: 'Branch 4 / Human Resources',
    date: '2025-03-15',
    description: 'Report of unauthorized HRIS access at Branch 4 shared workstation.',
    content: `Associate Pedro Lim (U-203) accessed HRIS under anna.cruz session. Salary records of three employees viewed. Supervisor intervened after ~8 minutes. No password change initiated. No formal ticket until next day.`,
    relatedLabs: [1, 13],
    studentNotes: 'Use as primary incident evidence for timeline and response analysis.',
  },
  {
    id: 'EV-INC-002',
    title: 'Security Ticket INC-2025-019 — Payroll Breach',
    type: 'Incident Ticket',
    category: 'incident',
    system: 'Payroll System',
    department: 'IT Department',
    date: '2025-03-20',
    description: 'IT ticket documenting payroll data access incident.',
    content: `Opened: 2025-03-20 16:42 — Priority: Medium
Summary: Unauthorized payroll file access reported by Finance
Status: Closed 2025-03-22 — Resolution: Password reset for payroll_admin
Forensic image: Not collected — Logs retained 30 days only`,
    relatedLabs: [13],
    studentNotes: 'Evaluate classification, containment, and evidence preservation.',
  },
  {
    id: 'EV-BKP-001',
    title: 'Backup Schedule and Status Report',
    type: 'Backup Report',
    category: 'backup',
    system: 'Backup Server / Cloud Backup',
    department: 'IT Department',
    date: '2025-04-12',
    description: 'Scheduled backup jobs and recent completion status.',
    content: `Nightly full backup — MCST-BKP01 — Last success: 12 days ago — Alert acknowledged, not resolved
Cloud replication — CloudStore — Daily — Last success: 2025-04-11
Restore test — Q1 2025 — Scheduled — Cancelled due to weekend sales
Branch POS local USB backup — Informal — Not monitored centrally`,
    relatedLabs: [5, 12],
    studentNotes: 'Assess backup completeness, testing, and recovery readiness.',
  },
  {
    id: 'EV-CHG-001',
    title: 'Change Request Log — Production Releases',
    type: 'Change Log',
    category: 'change',
    system: 'Core Applications',
    department: 'IT Department',
    date: '2025-04-01 to 2025-05-01',
    description: 'Sample of production change requests and approval status.',
    content: `CHG-2025-041 — Payroll tax update — Approved — Deployed weekend without CAB
CHG-2025-044 — Firewall rule change — Approved — Emergency — No post-implementation review
CHG-2025-047 — HRIS module patch — Not approved — Deployed by vendor remote session
CHG-2025-049 — POS update Branch 7 — Missing — Completed informally`,
    relatedLabs: [5, 12],
    studentNotes: 'Identify unauthorized, emergency, and undocumented changes.',
  },
  {
    id: 'EV-ET-001',
    title: 'Cloud Service Inventory',
    type: 'Asset Register',
    category: 'emerging',
    system: 'Cloud Services',
    department: 'IT Department',
    date: '2025-05-01',
    description: 'Inventory of cloud and emerging technology assets.',
    content: `Cloud object storage — Production backup staging — Shared API key
IoT warehouse gateways (6) — Temperature monitoring — Default credentials noted in scan
Blockchain supplier pilot — Settlement ledger — Keys on project manager laptop
Microsoft 365 — Email — MFA not enforced for all users`,
    relatedLabs: [8, 10],
    studentNotes: 'Evaluate governance maturity for non-traditional technology assets.',
  },
  {
    id: 'EV-ET-002',
    title: 'Emerging Technology Adoption Memo',
    type: 'Management Memo',
    category: 'emerging',
    system: 'Innovation Program',
    department: 'Procurement / IT',
    date: '2025-04-20',
    description: 'Memo describing rapid deployment of pilot technologies.',
    content: `Cloud, IoT, and blockchain pilots were deployed with minimum viable controls. Formal hardening and vendor security review deferred to post-pilot phase. Operations now depend on all three initiatives.`,
    relatedLabs: [8],
    studentNotes: 'Assess whether pilot controls are appropriate for current dependency level.',
  },
  {
    id: 'EV-GOV-004',
    title: 'Board Audit Committee Resolution — 2025 IT Audit',
    type: 'Audit Memo',
    category: 'governance',
    system: 'Internal Audit',
    department: 'Board Audit Committee',
    date: '2025-04-15',
    description: 'Formal audit engagement authorization and scope boundaries.',
    content: `Internal Audit is authorized to perform a 2025 IT audit covering access management, change management, privacy, backup/recovery, and emerging technology governance. Report due before year-end Board meeting.`,
    relatedLabs: [3, 9],
    studentNotes: 'Use to define audit objectives, scope, and limitations for planning work.',
  },
  {
    id: 'EV-ACC-004',
    title: 'Password and Access Control Policy Excerpt',
    type: 'Policy Document',
    category: 'access',
    system: 'Enterprise IAM',
    department: 'IT Department',
    date: '2022-11-01',
    description: 'Password complexity, sharing, and session management requirements.',
    content: `Minimum password length: 8 characters
Password expiration: 90 days
Shared accounts: Prohibited except documented exceptions
Session timeout: 15 minutes inactive
MFA: Required for remote access (exception process available)
Policy review cycle: Annual — Last review: 2022`,
    relatedLabs: [1, 4],
    studentNotes: 'Compare policy requirements with observed practices in logs and incidents.',
  },
]

export function getEvidenceById(id) {
  return evidenceItems.find((item) => item.id === id)
}

export function getEvidenceByCategory(categoryId) {
  return evidenceItems.filter((item) => item.category === categoryId)
}

export function getEvidenceByLab(labId) {
  return evidenceItems.filter((item) => item.relatedLabs.includes(labId))
}
