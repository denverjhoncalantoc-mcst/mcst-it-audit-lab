import { CIA_GUIDE, STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withRiskRegister } from './shared.js'

export default {
  id: 10,
  slug: 'lab-10',
  title: 'Asset Inventory and System Documentation',
  shortDescription:
    'Develop asset inventory, system documentation, data classification, process flows, and dependency analysis for the final audit engagement.',
  week: 12,
  topic: 'Final Audit Engagement Project',
  type: 'project',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-INF-001', 'EV-INF-002', 'EV-APP-001', 'EV-PRV-001'],
  semesterContext: 'Week 12 project laboratory. Fieldwork begins with comprehensive asset and system documentation.',
  objective:
    'Compile a complete asset inventory and system documentation package supporting the final MCST Retail Corporation audit engagement.',
  scenario: `Following engagement planning in Lab 9, your audit team must document the IT environment in sufficient detail for risk assessment, control testing, and final reporting.

Use evidence from the Evidence Repository, prior laboratory workpapers, and new fieldwork exports. Expect incomplete asset records, undocumented branch devices, and inconsistent data classification — your documentation must reflect both what is known and what remains unverified.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '40 minutes',
      description: 'Gather asset and system evidence from AMS exports, architecture diagrams, and case file.',
      evidence: [
        {
          type: 'architecture',
          title: 'MCST Retail Corporation — System Architecture Diagram',
          reference: 'IT-ARCH-2024-01',
          content: `[HEAD OFFICE] DC, SQL Server, App Servers, Firewall, Backup Server
[12 BRANCHES] POS terminals, shared manager PC, Wi-Fi via MPLS VPN
[CLOUD] CloudStore backup replication, object storage staging
[SYSTEMS] SMS, IMS, HRIS, Payroll, Microsoft 365`,
        },
        {
          type: 'table',
          title: 'IT Asset Inventory Export (Partial)',
          reference: 'AMS-EXPORT-2025-06',
          headers: ['Asset ID', 'Asset Name', 'Category', 'Owner', 'Last Review'],
          rows: [
            ['A-001', 'Sales Management System', 'Software', 'IT', '2024-11-01'],
            ['A-005', 'POS Terminals (48 units)', 'Hardware', 'Sales', '2024-08-01'],
            ['A-009', 'Shared Branch Workstations', 'Hardware', 'Sales', 'Never reviewed'],
            ['A-010', 'Cloud Backup', 'Infrastructure', 'IT', '2024-01-10'],
            ['A-015', 'IoT Warehouse Gateways', 'Hardware', 'Warehouse', 'Not in AMS'],
          ],
        },
        CIA_GUIDE,
      ],
      investigationTasks: [
        'Identify all systems, hardware, software, data, and infrastructure components in scope.',
        'Note assets referenced in evidence but missing from formal inventory.',
      ],
      analysisTasks: [
        'Classify assets into Hardware, Software, Data, and Infrastructure.',
        'Assign CIA ratings to critical assets with justification.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '40 minutes',
      description: 'Document system descriptions, data flows, and process dependencies.',
      evidence: [
        {
          type: 'table',
          title: 'System Dependency Matrix',
          reference: 'DEP-MAT-10',
          headers: ['System', 'Depends On', 'Supports', 'Criticality'],
          rows: [
            ['SMS', 'SQL Server, Network, AD', 'POS, Reporting', 'Critical'],
            ['HRIS', 'SQL Server, AD', 'Payroll, HR processes', 'Critical'],
            ['Payroll', 'HRIS, Bank API', 'Finance disbursement', 'Critical'],
            ['IoT Monitoring', 'Warehouse gateways, Network', 'Inventory quality', 'Medium'],
          ],
        },
        {
          type: 'memo',
          title: 'IT Department Memo — Undocumented Assets',
          reference: 'IT-MEMO-2025-06',
          content: `Branch peripherals, USB backup drives, and IoT gateways are not consistently tracked in AMS. Marketing maintains separate customer export files on shared drives.`,
        },
      ],
      investigationTasks: [
        'Map data flows between core systems and supporting infrastructure.',
        'Identify single points of failure and undocumented dependencies.',
      ],
      analysisTasks: [
        'Prepare system description for each in-scope application and infrastructure component.',
        'Document process flow descriptions for sales, inventory, HR/payroll, and backup processes.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '35 minutes',
      description: 'Identify documentation and asset management risks affecting audit reliability.',
      evidence: [
        {
          type: 'table',
          title: 'Documentation Gap Indicators',
          reference: 'DOC-GAP-10',
          headers: ['Gap', 'Evidence Source', 'Audit Impact'],
          rows: [
            ['Never-reviewed branch workstations', 'AMS export', 'Incomplete access risk assessment'],
            ['Missing IoT assets in inventory', 'Warehouse walkthrough', 'Emerging tech exposure unknown'],
            ['Undefined data classification', 'Privacy evidence', 'Compliance assessment impaired'],
            ['Informal USB backups at branches', 'IT memo', 'Backup and recovery uncertainty'],
          ],
        },
      ],
      investigationTasks: [
        'Link documentation gaps to potential audit scope and risk assessment limitations.',
      ],
      analysisTasks: [
        'Document at least 8 asset/documentation risks in workpapers.',
        'Prioritize gaps requiring follow-up in Labs 11–12.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '30 minutes',
      description: 'Evaluate asset management and documentation controls.',
      evidence: [
        {
          type: 'policy',
          title: 'IT Asset Management Policy Excerpt',
          reference: 'POL-AM-001',
          content: `All IT assets must be registered in AMS within 5 business days of deployment. Annual review required. Branch managers responsible for notifying IT of new devices.`,
        },
      ],
      investigationTasks: [
        'Compare policy requirements against AMS export and memo evidence.',
      ],
      analysisTasks: [
        'Assess design and operating effectiveness of asset management controls.',
        'Document control weaknesses affecting inventory reliability.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '30 minutes',
      description: 'Document findings on asset inventory and system documentation gaps.',
      evidence: [],
      investigationTasks: [
        'Select material documentation gaps supported by evidence.',
      ],
      analysisTasks: [
        'Draft at least 3 CCER findings on asset/documentation weaknesses.',
        'Recommend actions to improve inventory accuracy before final reporting.',
      ],
    },
    {
      title: 'Phase 6 – Reflection and HITL AI Validation',
      duration: '25 minutes',
      description: 'Validate AI-assisted asset lists or system descriptions against evidence.',
      evidence: [],
      investigationTasks: ['Review AI-generated asset inventories or diagrams for accuracy.'],
      analysisTasks: [
        'Document HITL validation of AI-assisted documentation.',
        'Reflect on challenges of auditing incomplete asset records.',
      ],
    },
  ],
  requiredOutputs: [
    'Asset Inventory (classified with CIA ratings)',
    'System Documentation (all in-scope systems)',
    'Data Classification Summary',
    'Process Flow Descriptions',
    'System Dependency Summary',
    'HITL AI Validation Notes',
  ],
  submissionRequirements: withRiskRegister([
    'Laboratory Report',
    'Asset Inventory',
    'System Documentation',
    'Data Classification Summary',
    'HITL AI Validation Notes',
    'Reflection',
  ]),
  submissionNotes: 'Maintain asset IDs consistent with Lab 1 where applicable. Reference Evidence Repository IDs in documentation.',
  requiredAnalysis: [
    'Complete asset inventory with Hardware, Software, Data, and Infrastructure classification.',
    'Document system descriptions, data classification, and process flows.',
    'Analyze system dependencies and documentation gaps.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
