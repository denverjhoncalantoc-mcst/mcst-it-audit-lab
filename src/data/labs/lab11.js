import { IMPACT_GUIDE, LIKELIHOOD_GUIDE, STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 11,
  slug: 'lab-11',
  title: 'Risk and Compliance Assessment',
  shortDescription:
    'Perform threat identification, vulnerability analysis, risk rating, compliance assessment, and risk prioritization for the final engagement.',
  week: 13,
  topic: 'Final Audit Engagement Project',
  type: 'project',
  duration: '2.5–3 hours',
  evidenceIds: ['EV-GOV-003', 'EV-CMP-001', 'EV-PRV-001', 'EV-PRV-002'],
  semesterContext: 'Week 13 project laboratory. Consolidate semester evidence into an engagement-level risk and compliance assessment.',
  objective:
    'Develop a comprehensive threat and vulnerability analysis, risk register, risk matrix, compliance assessment, and priority risk summary for MCST Retail Corporation.',
  scenario: `Your audit team must now quantify the organization's IT risk posture using evidence collected across the semester. Management expects a defensible risk register and compliance assessment that can support Board reporting and remediation planning.

Weaknesses are embedded throughout prior laboratory evidence. Do not treat management's partial risk register as complete — validate, expand, and score risks using professional judgment.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description: 'Consolidate threat and vulnerability inputs from prior labs and Evidence Repository.',
      evidence: [
        {
          type: 'table',
          title: 'Threat and Vulnerability Catalog Inputs',
          reference: 'TVC-IN-11',
          headers: ['Source', 'Threat/Vulnerability Indicator', 'Related System'],
          rows: [
            ['Lab 1 / EV-INC-001', 'Unauthorized HRIS access via shared session', 'HRIS'],
            ['Lab 5 / EV-CHG-001', 'Unapproved production changes', 'Core applications'],
            ['Lab 6 / EV-PRV-002', 'Customer data shared without DPA', 'SMS/Marketing'],
            ['Lab 8 / EV-ET-001', 'Shared cloud API keys', 'Cloud services'],
            ['EV-CMP-001', 'Incomplete privacy program', 'Enterprise compliance'],
          ],
        },
        LIKELIHOOD_GUIDE,
        IMPACT_GUIDE,
      ],
      investigationTasks: [
        'Compile threat and vulnerability indicators from Labs 1–10 and Evidence Repository.',
        'Eliminate duplicates and normalize terminology across workpapers.',
      ],
      analysisTasks: [
        'Prepare threat and vulnerability list with at least 20 entries.',
        'Categorize threats by insider, external, human error, and physical sources where applicable.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '40 minutes',
      description: 'Validate risks against compliance requirements and control evidence.',
      evidence: [
        {
          type: 'checklist',
          title: 'Compliance Checklist Excerpt — Data Protection',
          reference: 'EV-CMP-001',
          content: `DPO appointed — No | ROPA complete — Partial | DPIA for biometrics — No | Breach procedure tested — No | Vendor DPAs — 2 of 7`,
        },
        {
          type: 'table',
          title: 'Risk Register Draft — Management Submission',
          reference: 'EV-GOV-003',
          headers: ['Risk ID', 'Description', 'Score', 'Owner', 'Status'],
          rows: [
            ['R-001', 'Unauthorized HRIS access', '16', 'IT', 'Open'],
            ['R-004', 'Shared branch credentials', '18', 'Operations', 'Open'],
            ['R-005', 'Privacy breach (marketing)', 'blank', 'blank', 'Not assessed'],
          ],
        },
      ],
      investigationTasks: [
        'Compare management risk register against independent audit evidence.',
        'Identify compliance gaps that create or amplify IT risks.',
      ],
      analysisTasks: [
        'Complete risk scoring for all material risks using likelihood and impact guides.',
        'Map compliance checklist gaps to specific risks.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '40 minutes',
      description: 'Build engagement risk register and risk matrix with prioritization.',
      evidence: [],
      investigationTasks: [
        'Ensure every high-priority risk links to specific evidence references.',
      ],
      analysisTasks: [
        'Create consolidated risk register with minimum 20 risks.',
        'Plot risks on 5×5 risk matrix with legend and prioritization narrative.',
        'Prepare priority risk summary for top 10 risks.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '30 minutes',
      description: 'Assess whether existing controls reduce prioritized risks adequately.',
      evidence: [
        {
          type: 'table',
          title: 'Compliance Assessment Summary',
          reference: 'COMP-ASM-11',
          headers: ['Requirement Area', 'Status', 'Risk Linkage'],
          rows: [
            ['Access management', 'Partial', 'R-001, R-004'],
            ['Privacy governance', 'Weak', 'R-005'],
            ['Backup and recovery', 'Partial', 'Infrastructure risks'],
            ['Emerging technology governance', 'Immature', 'Cloud/IoT risks'],
          ],
        },
      ],
      investigationTasks: [
        'Evaluate compliance status for access, privacy, backup, and emerging technology domains.',
      ],
      analysisTasks: [
        'Prepare compliance assessment with gap narrative.',
        'Link compliance gaps to risk register entries.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '30 minutes',
      description: 'Document risk and compliance findings for the final engagement.',
      evidence: [],
      investigationTasks: ['Identify material risk management and compliance weaknesses.'],
      analysisTasks: [
        'Draft at least 4 CCER findings on risk/compliance governance.',
        'Recommend risk treatment priorities for management.',
      ],
    },
    {
      title: 'Phase 6 – Reflection and HITL AI Validation',
      duration: '25 minutes',
      description: 'Validate AI-assisted risk registers or compliance summaries.',
      evidence: [],
      investigationTasks: ['Review AI-generated risk lists for unsupported entries.'],
      analysisTasks: [
        'Document HITL validation of AI-assisted risk and compliance analysis.',
        'Reflect on professional judgment in risk prioritization.',
      ],
    },
  ],
  requiredOutputs: [
    'Threat and Vulnerability List',
    'Consolidated Risk Register',
    '5×5 Risk Matrix',
    'Compliance Assessment',
    'Priority Risk Summary',
    'HITL AI Validation Notes',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report',
    'Risk Register',
    'Risk Matrix',
    'Compliance Assessment',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes: 'Maintain consistent Risk IDs for the final audit report. Reference Evidence Repository IDs throughout.',
  requiredAnalysis: [
    'Identify threats and vulnerabilities from semester evidence.',
    'Rate and prioritize risks using likelihood and impact criteria.',
    'Assess compliance gaps and link them to prioritized risks.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
