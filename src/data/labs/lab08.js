import { STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 8,
  slug: 'lab-8',
  title: 'Emerging Technology Audit Risk Assessment',
  shortDescription:
    'Assess cloud computing, IoT, blockchain, vendor, and emerging technology governance risks with proposed audit procedures and controls.',
  week: 10,
  topic: 'Auditing IT Systems and Emerging Technologies',
  type: 'guided',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-ET-001', 'EV-ET-002'],
  semesterContext:
    'Week 10 guided investigation. Students apply IT audit techniques to cloud, IoT, and blockchain environments adopted by MCST Retail Corporation.',
  objective:
    'Identify emerging technology risks, evaluate control gaps, and propose audit procedures and controls suitable for production and pilot-stage systems.',
  scenario: `MCST launched several innovation initiatives without a formal emerging technology governance framework: cloud backup expansion, IoT sensor rollout in warehouses, and a blockchain pilot for supplier settlement tracking.

Management views these initiatives as low-risk experiments. Preliminary audit walkthroughs indicate implementation shortcuts: shared cloud API keys, default IoT credentials with no firmware lifecycle process, and blockchain wallet private keys stored on a project manager laptop without segregation.

Your role is to perform an integrated audit of these technologies and determine whether current controls are adequate for production or pilot-stage operations.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description: 'Profile emerging technology assets, dependencies, and operational ownership.',
      evidence: [
        {
          type: 'table',
          title: 'Emerging Tech Asset Register',
          reference: 'ET-REG-2025',
          headers: ['Technology', 'Use Case', 'Environment', 'Owner', 'Current Status'],
          rows: [
            ['Cloud Object Storage', 'Backup and analytics file staging', 'Public cloud tenant', 'IT Operations', 'Active production use'],
            ['Warehouse IoT Sensors', 'Temperature/humidity monitoring', '6 warehouses', 'Warehouse Ops + IT', 'Active'],
            ['Blockchain Supplier Pilot', 'Settlement event ledger', 'Consortium sandbox network', 'Procurement Innovation Team', 'Pilot'],
          ],
        },
        {
          type: 'architecture',
          title: 'High-Level Emerging Tech Architecture',
          reference: 'ARCH-ET-08',
          content: `Cloud: Branch and HO systems -> backup agent -> cloud object buckets. Authentication via shared API key (same key used by 3 admins + 1 contractor script).

IoT: Sensors -> local gateway -> central monitoring dashboard. Gateway web console exposed to internal network; remote support enabled.

Blockchain: Supplier pilot app -> smart contract network. Signing keys kept in local wallet on project manager laptop.`,
        },
        {
          type: 'memo',
          title: 'Innovation Program Note',
          reference: 'INNOV-NOTE-08',
          content: `Due to timeline pressure, projects were deployed with minimum viable controls. Formal hardening and governance documentation were deferred to post-pilot review.`,
        },
      ],
      investigationTasks: [
        'Identify key assets, trust boundaries, and sensitive operations per technology.',
        'Determine where pilot controls have silently become production dependencies.',
      ],
      analysisTasks: [
        'Develop a technology risk profile for cloud, IoT, and blockchain environments.',
        'List at least 8 baseline governance gaps from ownership, architecture, and deployment context.',
        'Prioritize technology areas for deep control testing in later phases.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '35 minutes',
      description: 'Inspect technical evidence for authentication, hardening, key management, and monitoring weaknesses.',
      evidence: [
        {
          type: 'table',
          title: 'Cloud Access Configuration Snapshot',
          reference: 'CLOUD-CFG-08',
          headers: ['Control Area', 'Current Setting', 'Observation'],
          rows: [
            ['API Key Management', 'Single key: backup_master_key', 'Shared among multiple users and scripts'],
            ['MFA for cloud console', 'Disabled for service admin account', 'Exception approved informally'],
            ['Bucket Encryption', 'Enabled at rest', 'No key rotation evidence'],
            ['Public Access Block', 'Partially enabled', 'One staging bucket allows public list access'],
            ['Access Logging', 'Enabled', 'Logs retained only 7 days'],
          ],
        },
        {
          type: 'table',
          title: 'Warehouse IoT Gateway Security Scan Results',
          reference: 'IOT-SCAN-2025-05',
          headers: ['Gateway', 'Issue', 'Severity', 'Details'],
          rows: [
            ['WH-GW-01', 'Default admin credentials still active', 'Critical', 'admin/admin accepted'],
            ['WH-GW-02', 'Firmware outdated', 'High', 'Last update 2023-10'],
            ['WH-GW-03', 'TLS certificate expired', 'High', 'Expired 41 days'],
            ['WH-GW-04', 'Open management port', 'Medium', 'Port 8080 unrestricted internally'],
            ['WH-GW-05', 'No tamper alert integration', 'Medium', 'Physical tamper events not forwarded'],
          ],
        },
        {
          type: 'memo',
          title: 'Blockchain Pilot Key Management Review',
          reference: 'BC-KEY-08',
          content: `Private signing keys stored in encrypted folder on pilot manager laptop. Recovery phrase stored in same laptop notes app. No dual control, key escrow, rotation process, or HSM usage. Smart contract deployed without third-party audit.`,
        },
        {
          type: 'email',
          title: 'Vendor Email — Supplier Pilot Coordination',
          reference: 'EMAIL-BC-2025-04',
          content: `We can proceed to next pilot phase even without contract security review. Smart contract was copied from open-source sample and modified by intern dev team. Let's not delay for external audit unless legal requires it.`,
        },
      ],
      investigationTasks: [
        'Validate critical weaknesses in cloud IAM, IoT hardening, and blockchain key control.',
        'Determine whether monitoring and detection controls are sufficient for these environments.',
      ],
      analysisTasks: [
        'Document at least 12 technical and process vulnerabilities across all three technologies.',
        'Identify attack paths that combine weaknesses across systems.',
        'Assess third-party and vendor risk exposure from pilot communications.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description: 'Quantify and prioritize emerging technology risks, including cross-domain systemic risk.',
      evidence: [
        {
          type: 'table',
          title: 'Emerging Tech Risk Scenarios',
          reference: 'ET-RISK-08',
          headers: ['Scenario', 'Trigger', 'Potential Impact'],
          rows: [
            ['Cloud key compromise', 'Shared API key leaked', 'Unauthorized backup access and data exposure'],
            ['IoT manipulation', 'Default gateway password abused', 'Sensor falsification affecting inventory decisions'],
            ['Blockchain wallet compromise', 'Laptop theft/malware', 'Unauthorized transaction signing'],
            ['Smart contract flaw exploit', 'Unreviewed code bug', 'Settlement disruption and integrity loss'],
            ['Log retention gap', 'Incident discovered late', 'Forensic blind spots and delayed response'],
          ],
        },
      ],
      investigationTasks: [
        'Define risk statements linking vulnerabilities to business and compliance consequences.',
        'Assess correlation where one domain weakness amplifies another domain risk.',
      ],
      analysisTasks: [
        'Create an emerging technology risk register with at least 12 risks.',
        'Score and rank risks with explicit rationale and evidence references.',
        'Propose audit procedures for top 5 risks.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '35 minutes',
      description: 'Evaluate existing controls and define target-state controls for emerging technology governance.',
      evidence: [
        {
          type: 'table',
          title: 'Current Emerging Tech Controls Inventory',
          reference: 'CTRL-ET-08',
          headers: ['Control', 'Domain', 'Type', 'Current State', 'Gap Indicator'],
          rows: [
            ['Cloud bucket encryption', 'Cloud', 'Preventive', 'Enabled', 'No key lifecycle governance'],
            ['Cloud admin account review', 'Cloud', 'Detective', 'Ad hoc', 'No periodic recertification'],
            ['Gateway password policy', 'IoT', 'Preventive', 'Documented only', 'Defaults still active'],
            ['Firmware update procedure', 'IoT', 'Corrective', 'Undefined cadence', 'Aging firmware'],
            ['Wallet access restriction', 'Blockchain', 'Preventive', 'Single user custody', 'No segregation of duties'],
            ['Smart contract testing checklist', 'Blockchain', 'Detective', 'Internal-only', 'No independent audit'],
          ],
        },
        {
          type: 'memo',
          title: 'Control Design Principles for Emerging Tech',
          reference: 'GUIDE-ET-CTRL-08',
          content: `Controls should include strong identity assurance, key management discipline, configuration baselines, continuous monitoring, and independent assurance before production scaling.`,
        },
      ],
      investigationTasks: [
        'Evaluate whether existing controls are proportionate to current exposure.',
        'Identify controls present in policy but absent in operation.',
      ],
      analysisTasks: [
        'Rate each listed control as Effective, Partially Effective, or Ineffective.',
        'Produce a control-to-risk matrix for highest-ranked risks.',
        'Recommend minimum control baseline before expansion of each technology.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '35 minutes',
      description: 'Document formal findings and strategic recommendations to improve innovation governance.',
      evidence: [
        {
          type: 'memo',
          title: 'CCER Documentation Standards for Emerging Tech',
          reference: 'CCER-ET-08',
          content: `Findings must reference concrete technical evidence and explain business relevance. Recommendations should balance security rigor with practical rollout sequencing.`,
        },
      ],
      investigationTasks: [
        'Consolidate cross-domain weaknesses into material audit findings.',
        'Differentiate pilot-stage acceptable risk from unacceptable production risk.',
      ],
      analysisTasks: [
        'Draft at least 5 CCER findings covering cloud, IoT, and blockchain domains.',
        'Provide phased recommendations: immediate safeguards, near-term hardening, long-term governance.',
        'Define assurance checkpoints before any pilot graduates to production.',
      ],
    },
    {
      title: 'Phase 6 – Reflection and HITL AI Validation',
      duration: '25 minutes',
      description: 'Validate any AI-assisted risk lists or control suggestions against emerging technology evidence.',
      evidence: [],
      investigationTasks: [
        'Review AI-generated emerging technology risk or control suggestions against evidence reviewed in this lab.',
      ],
      analysisTasks: [
        'Document HITL validation of AI outputs: accepted, modified, and rejected items with justification.',
        'Write a brief reflection on professional judgment in auditing fast-changing technology environments.',
      ],
    },
  ],
  requiredOutputs: [
    'Emerging Technology Risk Profile',
    'Cross-Domain Vulnerability Analysis',
    'Emerging Technology Risk Register',
    'Control-Risk Mapping Matrix',
    'Proposed Audit Procedures for Top Risks',
    'Audit Findings (minimum 5 CCER)',
    'Phased Emerging Tech Control Roadmap',
    'HITL AI Validation Notes',
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
    'Justify every recommendation using observed evidence. Indicate whether each technology is suitable for production, limited pilot, or suspension pending remediation.',
  requiredAnalysis: [
    'Identify cloud computing, IoT, and blockchain-related audit risks from evidence.',
    'Assess emerging technology governance and third-party/vendor risks.',
    'Propose audit procedures and controls for prioritized risks.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
