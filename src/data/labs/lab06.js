import { STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 6,
  slug: 'lab-6',
  title: 'Information Security and Compliance Assessment',
  shortDescription:
    'Assess data privacy, data protection, encryption, sensitive data access, and compliance requirements.',
  week: 7,
  topic: 'IT Auditing for Data and Privacy Protection',
  type: 'guided',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-PRV-001', 'EV-PRV-002', 'EV-CMP-001'],
  semesterContext:
    'Mid-semester engagement (Week 9). This lab extends prior control testing into formal privacy governance and personal data lifecycle auditing.',
  objective:
    'Perform an end-to-end privacy audit of MCST data handling practices. Students must discover processing gaps, assess privacy risks, evaluate control effectiveness, and issue evidence-based recommendations aligned with data protection principles.',
  scenario: `MCST Retail Corporation expanded digital onboarding, branch biometrics, and marketing partnerships in 2024. Management reports that "privacy controls are already adequate" because the company has a published privacy notice and basic consent forms.

During walkthrough interviews, your audit team identified signs of weak governance: biometric attendance data is exported weekly to shared spreadsheets, customer mobile numbers are sent to a third-party marketing vendor without a signed Data Processing Agreement (DPA), and payroll bank transfer files still include records of terminated employees.

You are tasked to review the full personal data lifecycle (collection, storage, use, sharing, retention, disposal) for both customer and employee information. Use the evidence to identify concrete privacy failures and document audit findings.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description:
        'Identify all personal data categories, processing activities, owners, and systems. Establish how data flows across the organization.',
      evidence: [
        {
          type: 'table',
          title: 'Personal Data Inventory Export (Draft)',
          reference: 'PRIV-INV-2025-06',
          headers: ['Process', 'Data Subject', 'Data Elements', 'System/Location', 'Owner', 'Purpose', 'Retention'],
          rows: [
            ['POS Loyalty Enrollment', 'Customer', 'Name, mobile number, email, birthdate', 'SMS + Marketing CSV', 'Sales', 'Rewards and promotions', 'Indefinite'],
            ['Online Refund Request', 'Customer', 'Name, mobile, GCash account', 'Shared inbox + Excel tracker', 'Customer Service', 'Refund validation', 'Not defined'],
            ['HR Onboarding', 'Employee', 'TIN, SSS, address, emergency contact, bank account', 'HRIS + paper folder', 'HR', 'Employment administration', '7 years'],
            ['Biometric Attendance', 'Employee', 'Fingerprint template, timestamps', 'Branch device + USB export', 'HR + Branch Managers', 'Attendance and payroll prep', 'Not defined'],
            ['Payroll Bank Transfer', 'Employee', 'Employee ID, name, bank account, net pay', 'Payroll app + emailed CSV to bank liaison', 'Finance', 'Salary disbursement', 'Current + prior cycles'],
            ['Marketing Campaign Upload', 'Customer', 'Mobile number, product segment tags', 'Vendor portal upload', 'Marketing', 'SMS campaign execution', 'Not defined'],
          ],
        },
        {
          type: 'diagram',
          title: 'Data Flow Sketch from Process Walkthrough',
          reference: 'DFD-PRIV-06',
          content: `Customer Sign-up (Branch/POS) -> SMS Database -> Monthly Export CSV -> Marketing Team Laptop
                                                             -> Third-Party Vendor Portal (ad-hoc upload)

Employee Biometrics (Branch devices) -> USB Export by Branch Admin -> Shared Drive \\HO-FILE01\\attendance
                                                                  -> Payroll Worksheet (Excel)

Payroll System -> Bank Transfer CSV -> Email attachment to bank.relations@mcstretail.com
                                      (includes active and inactive employee records in template tabs)`,
        },
        {
          type: 'memo',
          title: 'Privacy Office Staffing Note',
          reference: 'DPO-NOTE-2025-02',
          meta: { From: 'Compliance Director', Date: 'February 27, 2025' },
          content: `The designated Data Protection Officer (DPO) role is currently concurrent with Legal Counsel duties. No dedicated privacy analyst has been hired.

The Records of Processing Activities (ROPA) template was circulated in 2024 but not completed by Marketing, Finance, and three branch operations units.

Management priority has been focused on sales growth and ERP stabilization.`,
        },
      ],
      investigationTasks: [
        'Build a complete data map from the inventory and data flow evidence. Identify where personal data is created, transferred, transformed, and stored.',
        'Determine which processing activities contain sensitive or high-risk personal data (e.g., biometrics, bank account details).',
        'Identify undocumented processing and undefined retention practices.',
      ],
      analysisTasks: [
        'Create a classified data inventory separating customer, employee, and sensitive personal data.',
        'Highlight at least 8 lifecycle control gaps across collection, storage, sharing, retention, and disposal.',
        'Assess whether each process has clear legal basis, purpose limitation, and retention definition.',
        'Identify top 5 data flows with highest privacy exposure and justify using evidence.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '35 minutes',
      description:
        'Validate privacy controls through document review and forensic evidence. Focus on policy-to-practice gaps.',
      evidence: [
        {
          type: 'policy',
          title: 'MCST Privacy Policy v1.2 (Public Website Excerpt)',
          reference: 'POL-PRIV-001',
          meta: { 'Last Updated': 'May 2023' },
          content: `We collect personal information to provide services and improve customer experience. We retain data only as long as necessary for legitimate business purposes.

We may share data with trusted partners under appropriate safeguards.

We implement organizational, physical, and technical controls to protect personal data.`,
        },
        {
          type: 'contract-register',
          title: 'Third-Party Data Sharing Register',
          reference: 'VDR-PRIV-2025-Q1',
          headers: ['Vendor', 'Data Shared', 'Purpose', 'DPA Signed', 'Date Reviewed'],
          rows: [
            ['PromoReach Digital', 'Customer mobile numbers + segment tags', 'SMS promotions', 'NO', 'Never'],
            ['CloudStore Inc.', 'Backup archives (contains HR and payroll)', 'Disaster recovery', 'YES', '2024-01-15'],
            ['QuickSurvey PH', 'Customer feedback responses', 'Market research', 'NO', 'Never'],
            ['PayrollConnect Bank Link', 'Payroll transfer files', 'Salary processing', 'N/A', '2023-03-20'],
          ],
        },
        {
          type: 'log',
          title: 'File Access Log — Shared Attendance Folder',
          reference: 'LOG-FILE01-ATTEND-0425',
          headers: ['Timestamp', 'User', 'Action', 'File', 'Source'],
          rows: [
            ['2025-04-05 09:11', 'branch04.admin', 'COPY', 'attendance_apr_week1.xlsx', 'USB Device'],
            ['2025-04-05 09:13', 'branch04.admin', 'COPY', 'attendance_apr_week1.xlsx', 'Local Desktop'],
            ['2025-04-05 09:55', 'marketing.assistant', 'OPEN', 'attendance_apr_week1.xlsx', 'Head Office LAN'],
            ['2025-04-12 10:21', 'branch07.admin', 'RENAME', 'attendance_apr_week2_final_final.xlsx', 'Head Office LAN'],
            ['2025-04-19 08:50', 'it.support', 'PERMISSION CHANGE', '\\\\HO-FILE01\\\\attendance', 'All Authenticated Users = Read'],
          ],
        },
        {
          type: 'email',
          title: 'Marketing Email Thread — Campaign Upload',
          reference: 'EMAIL-MKT-2025-04-17',
          meta: { From: 'marketing.lead@mcstretail.com', To: 'team@mcstretail.com' },
          content: `Please upload all loyalty customer numbers to PromoReach by Friday. They requested full list this time, no need to filter inactive entries yet.

Use the same CSV as last campaign. I know Legal asked for an agreement update but this campaign is urgent.`,
        },
      ],
      investigationTasks: [
        'Cross-check policy statements against operational evidence and logs.',
        'Validate whether third-party sharing has contractual safeguards and review cadence.',
        'Identify unauthorized access or over-permission patterns in shared data repositories.',
      ],
      analysisTasks: [
        'Document minimum 10 policy-to-practice deviations with evidence references.',
        'Identify all third-party processing activities lacking DPA or equivalent safeguards.',
        'Assess whether access controls on privacy-critical repositories follow least privilege.',
        'Determine whether data minimization and purpose limitation are actually enforced in campaigns.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description:
        'Develop privacy risk scenarios using identified weaknesses. Score and prioritize high-impact exposures.',
      evidence: [
        {
          type: 'table',
          title: 'Privacy Incident Signals (Internal Tracker)',
          reference: 'PRIV-SIG-2025',
          headers: ['Date', 'Event', 'Affected Data', 'Impact Notes'],
          rows: [
            ['2025-02-03', 'Former employee still included in payroll file batch', 'Name + bank account', 'Incorrect transfer attempt flagged by bank'],
            ['2025-03-11', 'Customer opted-out numbers re-uploaded to campaign', 'Mobile numbers', 'Customer complaints on unsolicited messages'],
            ['2025-03-20', 'Biometric export copied to unsecured laptop', 'Fingerprint templates', 'No encryption on copied file'],
            ['2025-04-02', 'Refund tracker forwarded to personal email', 'Customer mobile + e-wallet account', 'No incident classification performed'],
          ],
        },
        {
          type: 'guide',
          title: 'Audit Risk Scoring Reminder',
          reference: 'AUD-RISK-PRIV-01',
          content: `Use 1-5 likelihood and 1-5 impact.

Impact should account for regulatory exposure, financial consequences, and trust damage.
Any risk score >= 15 must be escalated as high-priority privacy finding.`,
        },
      ],
      investigationTasks: [
        'Define threat-vulnerability-impact chains for each observed privacy weakness.',
        'Quantify likelihood drivers based on recurrence, control weakness, and process frequency.',
      ],
      analysisTasks: [
        'Build a privacy risk register with at least 12 risks tied to specific evidence.',
        'Score each risk and classify urgency (Critical, High, Medium, Low).',
        'Identify the top 5 risks requiring immediate remediation and justify ranking.',
        'Explain compounding risk effects where one weakness increases several risk scenarios.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '35 minutes',
      description:
        'Evaluate design and operating effectiveness of privacy controls in policy, process, and technology.',
      evidence: [
        {
          type: 'table',
          title: 'Privacy Control Register',
          reference: 'CTRL-PRIV-2025',
          headers: ['Control ID', 'Control', 'Type', 'Frequency', 'Owner', 'Observed Weakness'],
          rows: [
            ['PC-01', 'Privacy policy publication', 'Preventive', 'Ad hoc', 'Legal', 'Policy is generic and outdated'],
            ['PC-02', 'Consent checkbox at loyalty enrollment', 'Preventive', 'Per transaction', 'Sales', 'No evidence of consent version tracking'],
            ['PC-03', 'Access request form for HR data', 'Preventive', 'On request', 'HR', 'Branch practice bypasses formal requests'],
            ['PC-04', 'Quarterly vendor compliance review', 'Detective', 'Quarterly', 'Procurement', 'No records for marketing vendors'],
            ['PC-05', 'Inactive employee payroll cleanup', 'Corrective', 'Per cycle', 'Finance', 'Terminated employee records remain in templates'],
            ['PC-06', 'Data retention cleanup script', 'Corrective', 'Monthly', 'IT', 'Script not deployed to shared folders'],
          ],
        },
        {
          type: 'minutes',
          title: 'Privacy Governance Meeting Minutes',
          reference: 'MIN-PRIV-2025-03',
          content: `Agenda item: DPA status with PromoReach.

Discussion:
- Legal noted no signed DPA.
- Marketing requested exception for campaign deadlines.
- No risk acceptance form completed.
- Action item deferred to next month due to staffing constraints.`,
        },
      ],
      investigationTasks: [
        'Test whether listed controls are implemented consistently and not only documented.',
        'Identify controls that exist but are not operating effectively.',
      ],
      analysisTasks: [
        'Rate each control design and operating effectiveness (Effective, Partially Effective, Ineffective).',
        'Create a control-to-risk matrix for top privacy risks from Phase 3.',
        'Identify at least 6 control failures with clear root causes.',
        'Recommend practical control improvements with accountable owners and near-term timelines.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '40 minutes',
      description:
        'Draft formal privacy audit findings using CCER and propose prioritized, implementable recommendations.',
      evidence: [
        {
          type: 'memo',
          title: 'CCER Finding Documentation Standards',
          reference: 'TPL-CCER-PRIV',
          content: `Condition: What was observed.
Criteria: Applicable policy, law, or control expectation.
Cause: Why it happened.
Effect: Actual/potential business impact.
Recommendation: Specific corrective actions with owners and deadlines.`,
        },
        {
          type: 'note',
          title: 'Management Priority Note',
          reference: 'MGT-NOTE-06',
          content: `Management requested recommendations that can be implemented within one quarter and tracked in the existing audit action log.`,
        },
      ],
      investigationTasks: [
        'Select the most material findings from previous phases and validate evidence sufficiency.',
        'Differentiate isolated process errors from systemic privacy governance failures.',
      ],
      analysisTasks: [
        'Draft at least 5 CCER findings with precise evidence references and risk ratings.',
        'Develop prioritized recommendations (Immediate, 30-day, 90-day) with owners.',
        'Write an executive-ready privacy risk summary (1 page equivalent) that explains business impact.',
        'Include one monitoring plan that defines metrics to verify remediation effectiveness.',
      ],
    },
  ],
  requiredOutputs: [
    'Personal Data Map and Classified Inventory',
    'Policy-to-Practice Gap Analysis',
    'Privacy Risk Register (minimum 12 risks)',
    'Control Assessment Matrix',
    'Audit Findings (minimum 5 CCER)',
    'Prioritized Privacy Remediation Plan',
    'Executive Privacy Risk Summary',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report',
    'Privacy Risk Register',
    'Control Matrix',
    'Audit Findings (CCER format)',
    'Recommendations',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes:
    'Maintain consistent risk IDs and control IDs. Link every finding to evidence and privacy lifecycle stages.',
  requiredAnalysis: [
    'Review data classification, privacy policy, and customer record handling practices.',
    'Assess encryption configuration and sensitive data access controls.',
    'Evaluate compliance checklist gaps against data protection requirements.',
    'Identify privacy and compliance risks with evidence-based findings.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
