import { CIA_GUIDE, IMPACT_GUIDE, LIKELIHOOD_GUIDE, STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared'

export default {
  id: 1,
  slug: 'lab-1',
  title: 'Introduction to IT Auditing Through Case Analysis',
  shortDescription: 'Full audit investigation: asset discovery, threat/vulnerability analysis, risk assessment, control evaluation, and findings.',
  week: 2,
  topic: 'Introduction to IT Auditing and Control',
  type: 'guided',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-INF-001', 'EV-ACC-001', 'EV-ACC-002', 'EV-ACC-004', 'EV-INC-001'],
  semesterContext: 'Week 1–2 of the semester audit engagement. Your firm has been engaged to conduct an initial IT audit assessment following a security incident at Branch 4.',
  objective:
    'Conduct a complete initial IT audit investigation of MCST Retail Corporation. Students will discover and classify assets, identify threats and vulnerabilities from evidence, assess risks, evaluate controls, and document formal audit findings — simulating the opening phase of a real audit engagement.',
  scenario: `Your audit team has been engaged by the Board of Directors of MCST Retail Corporation following a security incident at Branch 4. A part-time sales associate accessed the HRIS system using credentials found on a sticky note attached to a shared POS workstation. The associate viewed salary records of three employees before a supervisor intervened.

The Board wants an independent assessment of the organization's IT control environment. You have been given access to system documentation, incident reports, access logs, policy documents, and user account listings. Your task is to investigate the evidence, discover control weaknesses (they are present throughout — do not assume the environment is secure), and produce professional audit workpapers.

This laboratory simulates the first fieldwork session of a semester-long audit engagement. Document everything you discover. Your work in this lab will feed into subsequent laboratory sessions and the final audit project.`,
  phases: [
    {
      title: 'Phase 1 – Asset Discovery',
      duration: '35 minutes',
      description: 'Review the provided asset inventory export and system architecture. Classify each asset and assign Confidentiality, Integrity, and Availability (CIA) ratings. Look for assets that are undocumented or improperly classified.',
      evidence: [
        {
          type: 'architecture',
          title: 'MCST Retail Corporation — System Architecture Diagram',
          reference: 'IT-ARCH-2024-01',
          content: `[HEAD OFFICE DATA CENTER]
  ├── MCST-DC01 (Domain Controller) ─── Windows Server 2012 R2
  ├── MCST-DB01 (SQL Server) ──────── SMS, IMS, HRIS, Payroll DBs
  ├── MCST-APP01 (SMS App Server)
  ├── MCST-APP02 (HRIS/Payroll Server) ─ Windows Server 2012 R2
  ├── MCST-FW01 (Firewall/IDS)
  └── MCST-BKP01 (Backup Server)

[BRANCH STORES x12] ──MPLS VPN──► Head Office
  Each branch: 4x POS terminals, 1x shared manager PC, Wi-Fi (guest + staff)

[CLOUD SERVICES]
  └── CloudStore Inc. (backup replication — API key shared among 3 IT staff)

[EXTERNAL]
  ├── Bank API (payroll disbursement)
  └── Microsoft 365 (email)`,
        },
        {
          type: 'table',
          title: 'IT Asset Inventory Export (Partial — IT Asset Management System)',
          reference: 'AMS-EXPORT-2025-03-14',
          headers: ['Asset ID', 'Asset Name', 'Category', 'Owner Dept.', 'Location', 'Status', 'Last Review'],
          rows: [
            ['A-001', 'Sales Management System (SMS)', 'Software', 'IT', 'MCST-APP01', 'Active', '2024-11-01'],
            ['A-002', 'Inventory Management System (IMS)', 'Software', 'Inventory', 'MCST-APP01', 'Active', '2024-11-01'],
            ['A-003', 'HRIS Database', 'Data', 'HR', 'MCST-DB01', 'Active', '2023-06-15'],
            ['A-004', 'Payroll System', 'Software', 'HR/Finance', 'MCST-APP02', 'Active', '2023-06-15'],
            ['A-005', 'POS Terminals (48 units)', 'Hardware', 'Sales', '12 Branches', 'Active', '2024-08-01'],
            ['A-006', 'Employee Records (HRIS)', 'Data', 'HR', 'MCST-DB01', 'Active', '2023-06-15'],
            ['A-007', 'Customer Transaction Data', 'Data', 'Sales', 'MCST-DB01', 'Active', '2024-11-01'],
            ['A-008', 'Network Infrastructure (MPLS, FW, VPN)', 'Infrastructure', 'IT', 'All Sites', 'Active', '2024-12-01'],
            ['A-009', 'Shared Branch Workstations (12 units)', 'Hardware', 'Sales', '12 Branches', 'Active', 'Never reviewed'],
            ['A-010', 'Cloud Backup (CloudStore Inc.)', 'Infrastructure', 'IT', 'Cloud', 'Active', '2024-01-10'],
            ['A-011', 'Biometric Attendance Devices (12)', 'Hardware', 'HR', '12 Branches', 'Active', 'Never reviewed'],
            ['A-012', 'Microsoft 365 Email', 'Software', 'IT', 'Cloud', 'Active', '2024-06-01'],
            ['A-013', 'Guest Wi-Fi Networks (12)', 'Infrastructure', 'IT', '12 Branches', 'Active', 'Never reviewed'],
            ['A-014', 'Paper HR Files (filing cabinets)', 'Data', 'HR', 'Head Office', 'Active', 'Never reviewed'],
          ],
        },
        {
          type: 'memo',
          title: 'IT Department Memo — Asset Management Practices',
          reference: 'IT-MEMO-2025-03-10',
          meta: { From: 'Carlo Mendoza, IT Manager', To: 'Internal Audit Team', Date: 'March 10, 2025' },
          content: `The asset inventory in our AMS is updated annually during budget season. Branch-level devices (POS terminals, shared workstations, biometric devices, Wi-Fi access points) were last entered when branches opened in 2022. We have not conducted a formal asset review since.

Note: Some branch managers purchase peripherals (USB drives, external HDDs) for local backup of daily sales reports. These are not tracked in the AMS.

The HR department maintains paper employee files in an unlocked filing cabinet in the HR office.`,
        },
        CIA_GUIDE,
      ],
      investigationTasks: [
        'Review the system architecture diagram and identify all systems, databases, network components, and cloud services that constitute the IT environment.',
        'Examine the asset inventory export. Identify assets that appear outdated, never reviewed, or missing from the inventory (use the IT memo for clues).',
        'Interview the evidence: What does the memo reveal about asset management maturity? What assets might exist but are not documented?',
      ],
      analysisTasks: [
        'Reclassify all 14+ identified assets into Hardware, Software, Data, and Infrastructure categories in your workpapers.',
        'Assign Confidentiality, Integrity, and Availability ratings (1–5) to each asset using the CIA rating scale. Justify ratings for at least 8 assets.',
        'Identify the top 5 critical assets based on highest combined CIA scores. Explain why these require priority audit attention.',
        'Document at least 3 asset management gaps discovered from the evidence (undocumented assets, missing reviews, improper classification).',
      ],
    },
    {
      title: 'Phase 2 – Threat Identification',
      duration: '30 minutes',
      description: 'Using the incident context and organizational evidence, identify threats across four categories. Do not limit threats to the Branch 4 incident — examine all evidence for indicators of broader threat exposure.',
      evidence: [
        {
          type: 'incident-report',
          title: 'Security Incident Report — Branch 4 Unauthorized Access',
          reference: 'INC-2025-003',
          meta: { Reported: 'March 15, 2025', Reporter: 'Rosa Villanueva, Branch 4 Supervisor', Status: 'Under Investigation' },
          content: `INCIDENT SUMMARY:
On March 15, 2025 at approximately 2:15 PM, part-time sales associate Pedro Lim (U-203) was observed accessing the HRIS system on the shared Branch 4 manager workstation. The HRIS application was already logged in under the account of Anna Cruz (U-103), HR Officer. Credentials were found on a sticky note attached to the monitor labeled "HR/Payroll — do not share."

Lim accessed the Employee Salary Inquiry module and viewed compensation records for three employees: Juan Reyes (U-201), Maria Gomez (U-202), and an unnamed third employee. Session duration: approximately 8 minutes.

ACTIONS TAKEN:
- Supervisor Rosa Villanueva confronted Lim and ended the session
- Branch manager notified Head Office IT by phone (no formal ticket created until March 16)
- No password change was initiated for the HRIS account
- No review of other branch workstations was ordered

WITNESSES: Rosa Villanueva (supervisor), Maria Gomez (sales associate)`,
        },
        {
          type: 'email',
          title: 'Email — Branch Manager to IT Department',
          reference: 'EMAIL-2025-03-15',
          meta: { From: 'branch4.manager@mcstretail.com', To: 'it.support@mcstretail.com', Date: 'March 15, 2025 4:32 PM' },
          content: `Subject: RE: Shared computer at Branch 4

Hi IT,

Just want to mention this isn't the first time staff have used the manager PC for non-sales stuff. We've been sharing the login since our manager PC password is the same as the store safe code (branch staff know it). The HRIS shortcut on the desktop was set up by Head Office last year for "convenience."

Also, our POS terminal #3 has been running slow. Might be malware but we haven't reported it.

- Mark`,
        },
        {
          type: 'security-report',
          title: 'Quarterly Security Assessment Summary (Q4 2024)',
          reference: 'SEC-RPT-2024-Q4',
          meta: { 'Prepared by': 'IT Security (outsourced)', Date: 'January 15, 2025' },
          content: `EXECUTIVE SUMMARY:
The quarterly assessment identified several areas of concern that remain unresolved from Q3 2024:

1. BRUTE FORCE ATTEMPTS: 847 failed login attempts against VPN gateway in December 2024. No account lockout triggered on VPN (different policy than internal AD).

2. PHISHING: 3 employees clicked phishing links in November 2024. Security awareness training was scheduled but postponed to Q1 2025 (still not conducted as of this report).

3. PHYSICAL SECURITY: Server room at head office accessible with shared keycard (card #HO-001 used by 6 staff members). Visitor log not maintained for 3 months.

4. REMOVABLE MEDIA: 4 branch locations reported USB drives connected to POS terminals for "local sales backup."

5. NO MFA: Multi-factor authentication is not enabled on any system except VPN (and VPN MFA was disabled in October 2024 for "ease of remote access during holiday season.")`,
        },
        {
          type: 'table',
          title: 'Threat Intelligence Feed — Industry Alerts (Retail Sector)',
          reference: 'EXT-THREAT-2025-01',
          headers: ['Alert ID', 'Threat Type', 'Description', 'Relevance to MCST'],
          rows: [
            ['TI-01', 'Ransomware', 'Retail sector targeted via unpatched POS systems', 'MCST has 48 POS terminals; patch status unknown at branches'],
            ['TI-02', 'Credential Theft', 'Sticky-note credential practices in retail environments', 'Directly relevant to Branch 4 incident'],
            ['TI-03', 'Insider Threat', 'Disgruntled employees accessing HR/payroll data before termination', 'MCST has no automated de-provisioning; manual process'],
            ['TI-04', 'Supply Chain', 'Compromised vendor remote access to retail networks', 'CloudStore Inc. has API access to backup systems'],
            ['TI-05', 'Physical Theft', 'Server room breaches in mid-size retail organizations', 'Shared keycard access at MCST head office'],
          ],
        },
      ],
      investigationTasks: [
        'Read the incident report and email communication. What do they reveal about the organizational culture around security?',
        'Review the Q4 2024 security report. Which threats were previously identified but not remediated?',
        'Examine the threat intelligence feed. Which external threats are relevant given MCST\'s known environment?',
      ],
      analysisTasks: [
        'Create a Threat Catalog with at least 3 threats per category: Insider Threats, External Threats, Human Error, and Physical Threats (minimum 12 threats total).',
        'For each threat, cite the specific evidence document that supports its relevance to MCST.',
        'Identify 3 threats that were previously reported (security report) but remain unaddressed. Explain the risk of threat recurrence.',
        'Map threats to affected assets from Phase 1. Which critical assets are most exposed?',
      ],
    },
    {
      title: 'Phase 3 – Vulnerability Analysis',
      duration: '40 minutes',
      description: 'Analyze policy documents, access logs, and workstation evidence to discover vulnerabilities. Weaknesses exist throughout — your job is to find them in the evidence.',
      evidence: [
        {
          type: 'policy',
          title: 'Password and Access Control Policy (Excerpt)',
          reference: 'POL-SEC-003 v2.1',
          meta: { 'Last Reviewed': 'March 2022', 'Next Review': 'March 2023 (OVERDUE)', Owner: 'IT Department' },
          content: `1. PASSWORD REQUIREMENTS
   - Minimum length: 8 characters
   - Complexity: uppercase, lowercase, number required (special character "recommended")
   - Password expiration: 90 days
   - Password history: last 3 passwords cannot be reused
   - Account lockout: 5 failed attempts, 30-minute lockout

2. ACCESS CONTROL
   - Role-based access control (RBAC) required for all applications
   - Shared accounts prohibited except designated service accounts
   - Privileged access limited to IT administrators
   - Remote access requires VPN with MFA

3. USER ACCOUNT MANAGEMENT
   - New accounts require department head approval
   - Terminated employee accounts disabled within 24 hours
   - Quarterly access review by department heads

NOTE: Policy version 2.1 was approved in 2022. Version 3.0 draft has been "in progress" since 2023.`,
        },
        {
          type: 'log',
          title: 'HRIS Access Log — Branch 4 Workstation (March 1–15, 2025)',
          reference: 'LOG-HRIS-B4-2025-03',
          headers: ['Timestamp', 'User Account', 'Workstation', 'Action', 'Records Accessed', 'IP/Source'],
          rows: [
            ['2025-03-01 08:02', 'annacruz (HRIS Admin)', 'B4-MGR-PC', 'LOGIN', '—', 'Branch 4 LAN'],
            ['2025-03-01 17:45', 'annacruz', 'B4-MGR-PC', 'LOGOUT (session timeout)', '—', 'Branch 4 LAN'],
            ['2025-03-03 09:15', 'SHARED\\branch4_mgr', 'B4-MGR-PC', 'LOGIN', '—', 'Branch 4 LAN'],
            ['2025-03-03 09:22', 'SHARED\\branch4_mgr', 'B4-MGR-PC', 'HRIS_LAUNCH', '—', 'Branch 4 LAN'],
            ['2025-03-03 09:25', 'annacruz (via saved session)', 'B4-MGR-PC', 'VIEW_SALARY', '12 records', 'Branch 4 LAN'],
            ['2025-03-05 14:30', 'pedrolim (SMS only)', 'B4-POS-02', 'LOGIN', '—', 'Branch 4 LAN'],
            ['2025-03-05 14:33', 'pedrolim', 'B4-MGR-PC', 'LOGIN (shared PC)', '—', 'Branch 4 LAN'],
            ['2025-03-08 11:00', 'annacruz', 'B4-MGR-PC', 'LOGIN', '—', 'Branch 4 LAN'],
            ['2025-03-08 11:05', 'annacruz', 'B4-MGR-PC', 'LOGOUT (not logged out — session persisted)', '—', 'Branch 4 LAN'],
            ['2025-03-10 16:20', 'SHARED\\branch4_mgr', 'B4-MGR-PC', 'LOGIN', '—', 'Branch 4 LAN'],
            ['2025-03-12 08:45', 'juanreyes', 'B4-MGR-PC', 'LOGIN (shared PC)', '—', 'Branch 4 LAN'],
            ['2025-03-15 14:08', 'pedrolim', 'B4-MGR-PC', 'LOGIN (shared PC)', '—', 'Branch 4 LAN'],
            ['2025-03-15 14:10', 'annacruz (saved session)', 'B4-MGR-PC', 'VIEW_SALARY', '3 records', 'Branch 4 LAN'],
            ['2025-03-15 14:18', 'pedrolim', 'B4-MGR-PC', 'LOGOUT', '—', 'Branch 4 LAN'],
          ],
        },
        {
          type: 'screenshot',
          title: 'Branch 4 Manager Workstation — Desktop Screenshot (March 14, 2025)',
          reference: 'EVD-SCREEN-B4-001',
          content: `┌─────────────────────────────────────────────────────────┐
│  MCST Retail - Branch 4 Manager PC                      │
│  User: SHARED\\branch4_mgr                              │
│─────────────────────────────────────────────────────────│
│  Desktop Icons:                                         │
│  [SMS POS] [HRIS Portal] [IMS Viewer] [Chrome]          │
│  [Excel] [USB Backup (E:)]                              │
│                                                         │
│  Sticky Note on Monitor:                                │
│  ┌──────────────────┐                                   │
│  │ HR/Payroll       │                                   │
│  │ User: annacruz   │                                   │
│  │ Pass: MCST@2024  │                                   │
│  │ DO NOT SHARE!!   │                                   │
│  └──────────────────┘                                   │
│                                                         │
│  System Info: Windows 10 Pro | Last Update: Aug 2024    │
│  Antivirus: McAfee (definitions: Feb 2025)              │
│  Screen Lock: DISABLED                                  │
└─────────────────────────────────────────────────────────┘`,
        },
        {
          type: 'report',
          title: 'HRIS Access Rights Report — Excessive Privileges Analysis',
          reference: 'HRIS-ACCESS-RPT-2025-03',
          headers: ['User ID', 'Name', 'Role', 'HRIS Access Level', 'Payroll Access', 'Last Access Review', 'Anomaly Flag'],
          rows: [
            ['U-101', 'Carlo Mendoza', 'IT Manager', 'System Admin', 'Full Admin', '2025-01', ''],
            ['U-103', 'Anna Cruz', 'HR Officer', 'HR Admin', 'Full Admin', '2025-01', ''],
            ['U-102', 'Liza Santos', 'Sales Manager', 'No Access', 'None', '2025-01', ''],
            ['U-201', 'Juan Reyes', 'Sales Associate', 'No Access', 'None', 'Never', 'Has HRIS desktop shortcut on B4 PC'],
            ['U-203', 'Pedro Lim', 'Part-time Staff', 'No Access', 'None', 'Never', 'Accessed HRIS on Mar 15 via saved session'],
            ['U-301', 'James Rivera', 'Inventory Clerk', 'No Access', 'None', 'Never', ''],
            ['U-401', 'Former: Rico Santos', 'Terminated (Feb 2025)', 'HR Viewer (ACTIVE)', 'Read (ACTIVE)', 'Never', 'ACCOUNT STILL ACTIVE — 23 days post-termination'],
          ],
        },
        {
          type: 'table',
          title: 'User Account Listing — Active Directory Export',
          reference: 'AD-EXPORT-2025-03-14',
          headers: ['Account', 'Display Name', 'Department', 'Last Password Change', 'MFA Enabled', 'Account Type'],
          rows: [
            ['carlo.mendoza', 'Carlo Mendoza', 'IT', '2024-11-10', 'No', 'Individual'],
            ['annacruz', 'Anna Cruz', 'HR', '2024-08-22', 'No', 'Individual'],
            ['SHARED\\branch4_mgr', 'Branch 4 Shared', 'Sales', 'Never changed (created 2022)', 'No', 'SHARED'],
            ['SHARED\\branch7_mgr', 'Branch 7 Shared', 'Sales', 'Never changed (created 2022)', 'No', 'SHARED'],
            ['SHARED\\branch12_mgr', 'Branch 12 Shared', 'Sales', 'Never changed (created 2022)', 'No', 'SHARED'],
            ['svc_backup', 'Backup Service', 'IT', '2023-01-15', 'No', 'Service'],
            ['payroll_admin', 'Payroll Admin', 'HR', '2024-06-01', 'No', 'Privileged'],
            ['rico.santos', 'Rico Santos (TERMINATED)', 'HR', '2024-03-10', 'No', 'DISABLED — but HRIS account ACTIVE'],
          ],
        },
      ],
      investigationTasks: [
        'Compare the Password and Access Control Policy against the access logs, screenshot, and user account listing. Where does practice deviate from policy?',
        'Analyze the HRIS access log line by line. How many different users accessed the shared workstation? Were sessions properly terminated?',
        'Review the HRIS Access Rights Report. What anomalies are flagged? What does the terminated employee account status reveal?',
        'Examine the AD export. How many shared accounts exist? Which policy rules do they violate?',
      ],
      analysisTasks: [
        'Document a minimum of 10 distinct vulnerabilities discovered from the evidence. Do not list only the obvious ones — examine logs for patterns.',
        'Classify each vulnerability as Technical, Procedural, or Human Factor.',
        'Map each vulnerability to the specific policy requirement it violates (cite policy section numbers).',
        'Identify the vulnerability chain that enabled the Branch 4 incident (trace from root cause to effect).',
        'Assess whether the password policy itself is adequate even if fully complied with. Are there policy weaknesses?',
      ],
    },
    {
      title: 'Phase 4 – Risk Assessment',
      duration: '35 minutes',
      description: 'Combine threats from Phase 2 and vulnerabilities from Phase 3 to build a risk register and risk matrix.',
      evidence: [
        LIKELIHOOD_GUIDE,
        IMPACT_GUIDE,
        {
          type: 'memo',
          title: 'Audit Planning Memo — Risk Assessment Methodology',
          reference: 'AUD-MEMO-2025-001',
          meta: { From: 'Audit Team Lead', Date: 'March 18, 2025' },
          content: `Team — for our risk assessment, use Likelihood × Impact scoring. Any risk scoring 10 or above is HIGH and requires a formal finding. Risks scoring 16–25 are CRITICAL and must be escalated to the Board.

We need a minimum of 15 documented risks for this engagement. Do not limit yourself to the Branch 4 incident — the security report and access logs reveal broader exposure.

Risk Register columns required: Risk ID, Threat, Vulnerability, Affected Asset(s), Likelihood (1-5), Impact (1-5), Risk Score, Risk Level, Existing Controls, Control Effectiveness.`,
        },
        {
          type: 'table',
          title: 'Sample Risk Entries (For Reference — Incomplete)',
          reference: 'WORKPAPER-RM-DRAFT',
          headers: ['Risk ID', 'Threat', 'Vulnerability', 'Asset', 'L', 'I', 'Score', 'Level'],
          rows: [
            ['R-01', 'Insider unauthorized access', 'Shared accounts on branch PCs', 'A-006 Employee Records', '4', '4', '16', 'CRITICAL'],
            ['R-02', 'Credential theft', 'Passwords on sticky notes', 'A-003 HRIS Database', '4', '4', '16', 'CRITICAL'],
            ['R-03', 'Ransomware', 'Unpatched POS terminals', 'A-005 POS Terminals', '3', '5', '15', 'HIGH'],
          ],
        },
      ],
      investigationTasks: [
        'Review the risk assessment methodology memo and rating guides.',
        'Cross-reference your threat catalog (Phase 2) and vulnerability list (Phase 3) to identify threat-vulnerability pairs.',
      ],
      analysisTasks: [
        'Build a complete Risk Register with at least 15 risks. Each must link to a specific threat, vulnerability, and asset from prior phases.',
        'Assign Likelihood and Impact scores with written justification for each risk (minimum 1 sentence per rating).',
        'Calculate Risk Scores and classify each risk as Low (1–4), Medium (5–9), High (10–15), or Critical (16–25).',
        'Create a 5×5 Risk Matrix and plot all risks. Identify clustering patterns.',
        'Select the top 5 priority risks and explain why they demand immediate audit attention.',
        'For each of the top 5 risks, document any existing controls and rate their effectiveness (Effective / Partially Effective / Ineffective).',
      ],
    },
    {
      title: 'Phase 5 – Control Assessment',
      duration: '30 minutes',
      description: 'Identify and classify existing controls. Evaluate their effectiveness against the risks identified in Phase 4.',
      evidence: [
        {
          type: 'table',
          title: 'IT Controls Inventory (Provided by IT Department)',
          reference: 'IT-CTRL-INV-2025',
          headers: ['Control ID', 'Control Description', 'Type (as claimed by IT)', 'System/Area', 'Implementation Date'],
          rows: [
            ['C-01', 'Role-based access control on applications', 'Preventive', 'All applications', '2021-03'],
            ['C-02', 'Firewall with IDS at network perimeter', 'Preventive', 'Network', '2020-06'],
            ['C-03', 'Daily automated database backup', 'Corrective', 'All databases', '2021-01'],
            ['C-04', 'CCTV in head office server room', 'Detective', 'Physical', '2019-11'],
            ['C-05', 'Antivirus on workstations and servers', 'Preventive', 'All endpoints', '2022-04'],
            ['C-06', 'Quarterly access rights review', 'Detective', 'All systems', '2022-01'],
            ['C-07', 'Incident response procedure', 'Corrective', 'Organization', '2023-06'],
            ['C-08', 'Annual security awareness training', 'Preventive', 'Organization', '2023-09'],
            ['C-09', 'Transaction audit logs on SMS and Payroll', 'Detective', 'SMS, Payroll', '2021-08'],
            ['C-10', 'Dual authorization for payroll > ₱50,000', 'Preventive', 'Payroll', '2022-03'],
            ['C-11', 'Visitor log at head office', 'Detective', 'Physical', '2019-11'],
            ['C-12', 'Offsite cloud backup replication', 'Corrective', 'All databases', '2024-01'],
            ['C-13', 'Password policy enforcement via Group Policy', 'Preventive', 'Active Directory', '2022-06'],
            ['C-14', 'POS transaction encryption', 'Preventive', 'POS/SMS', '2021-12'],
          ],
        },
        {
          type: 'email',
          title: 'Email — IT Manager Response to Audit Inquiry',
          reference: 'EMAIL-2025-03-18',
          meta: { From: 'carlo.mendoza@mcstretail.com', To: 'audit.team@mcstretail.com', Date: 'March 18, 2025' },
          content: `Subject: RE: Controls inquiry — shared accounts

Audit Team,

Regarding shared branch accounts: these were created during the 2022 branch rollout for "operational efficiency." Branch managers requested shared logins because shift handovers were causing login delays. We know the policy says no shared accounts, but enforcement at branch level has been difficult.

Group Policy password settings apply to AD accounts but branch shared accounts have "Password never expires" checked. MFA is on our roadmap for 2026.

Backup restoration test — we haven't had time to conduct one yet. Backups run daily and CloudStore confirms receipt, so we assume they're fine.

- Carlo`,
        },
      ],
      investigationTasks: [
        'Review the controls inventory. For each control, verify whether it is actually functioning based on evidence from Phases 1–4.',
        'Read the IT Manager email. What admissions does it contain about control failures?',
        'Identify controls that exist on paper but are ineffective in practice.',
      ],
      analysisTasks: [
        'Reclassify all 14 controls as Preventive, Detective, or Corrective with justification (the IT department may have misclassified some).',
        'Create a Control-Risk Mapping Matrix linking controls to the top 10 risks from Phase 4.',
        'Rate each mapped control as Effective, Partially Effective, or Ineffective based on evidence.',
        'Identify at least 5 control gaps — risks with no control or ineffective controls.',
        'Recommend 5 new or improved controls with classification and the risk each would address.',
      ],
    },
    {
      title: 'Phase 6 – Audit Findings and Recommendations',
      duration: '30 minutes',
      description: 'Document formal audit findings using the CCER format and prepare prioritized recommendations.',
      evidence: [
        {
          type: 'memo',
          title: 'Finding Documentation Standards — CCER Format',
          reference: 'AUD-STD-001',
          content: `Each audit finding must include:

CONDITION — What was found (factual, specific, supported by evidence)
CRITERIA — What should be (policy, standard, regulation, or best practice)
CAUSE — Why the condition exists (root cause, not symptoms)
EFFECT — Actual or potential impact on the organization
RECOMMENDATION — Specific, actionable steps to remediate

Risk Rating: Critical | High | Medium | Low
Each finding must reference evidence reviewed and workpaper cross-references.`,
        },
        {
          type: 'table',
          title: 'Prior Audit Finding — 2023 (For Context)',
          reference: 'AUD-2023-F-04',
          headers: ['Finding', 'Risk', 'Management Response', 'Current Status (2025)'],
          rows: [
            ['F-2023-04: Shared branch accounts in use', 'High', 'IT will remediate by Q2 2024', 'NOT REMEDIATED — still in use'],
            ['F-2023-07: Password policy overdue for review', 'Medium', 'Review scheduled Q3 2024', 'NOT REMEDIATED — still v2.1 from 2022'],
            ['F-2023-09: Terminated employee account deprovisioning', 'High', 'HR/IT will automate', 'NOT REMEDIATED — manual process, Rico Santos account still active'],
          ],
        },
      ],
      investigationTasks: [
        'Review the 2023 prior audit findings. Which findings remain unresolved? What does this indicate about the control environment?',
        'Review all workpapers from Phases 1–5. Select the most significant conditions discovered.',
      ],
      analysisTasks: [
        'Write a minimum of 5 formal audit findings in full CCER format. Each must reference specific evidence from this laboratory.',
        'Assign a risk rating (Critical/High/Medium/Low) to each finding with justification.',
        'Identify recurring themes across findings (systemic issues vs. isolated incidents).',
        'Prepare a Recommendations Summary with at least 8 recommendations prioritized as Immediate, Short-term, and Long-term.',
        'Write a 1-page Executive Summary of your initial audit assessment suitable for the Board of Directors.',
        'Write a 250-word Reflection on what you learned about the IT audit process from this investigation.',
      ],
    },
  ],
  requiredOutputs: [
    'Asset Inventory with CIA ratings (Hardware, Software, Data, Infrastructure classification)',
    'Threat Catalog (minimum 12 threats across 4 categories)',
    'Vulnerability Analysis Worksheet (minimum 10 vulnerabilities with policy cross-references)',
    'Risk Register (minimum 15 risks with likelihood, impact, and scores)',
    '5×5 Risk Matrix with plotted risks',
    'Control Classification and Control-Risk Mapping Matrix',
    'Audit Findings (minimum 5, full CCER format)',
    'Prioritized Recommendations Summary',
    'Executive Summary (1 page)',
    'Reflection (250 words)',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report (all phase workpapers consolidated)',
    'Risk Register',
    'Control Matrix',
    'Audit Findings (CCER format)',
    'Recommendations',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes: 'This is the opening engagement workpaper. Your findings will be referenced in Labs 2–14 and the Final Audit Project. Maintain consistent Risk IDs and Finding numbers.',
  requiredAnalysis: [
    'Classify assets by Hardware, Software, Data, and Infrastructure with CIA ratings.',
    'Identify threats across insider, external, human error, and physical categories.',
    'Derive vulnerabilities from password policy, access logs, workstation evidence, and HRIS access reports.',
    'Build a risk register with likelihood, impact, and risk matrix plotting.',
    'Classify preventive, detective, and corrective controls and assess effectiveness.',
    'Document audit findings using Condition, Criteria, Cause, Effect, and Recommendation.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
