import { STANDARD_ASSESSMENT_CRITERIA, STANDARD_HITL, withControlMatrix, withRiskRegister } from './shared.js'

export default {
  id: 14,
  slug: 'lab-14',
  title: 'AI Validation Portfolio and Final Report Integration',
  shortDescription:
    'Complete HITL AI validation portfolio, integrate final audit report sections, and prepare for presentation and defense.',
  week: 16,
  topic: 'Final Project Preparation',
  type: 'project',
  duration: '2.5–3 hours',
  evidenceIds: [],
  semesterContext: 'Week 16 project laboratory. Final integration of semester outputs and AI validation documentation.',
  objective:
    'Integrate laboratory outputs into a final audit report draft, complete the AI validation portfolio, and prepare for Week 17 presentation and defense.',
  scenario: `You are at the integration phase of the semester-long MCST IT audit engagement. The Audit Committee expects a consolidated report draft that summarizes risk themes, control gaps, findings, recommendations, and responsible AI use throughout the engagement.

This laboratory focuses on quality integration — resolving inconsistencies across prior labs, validating AI-assisted content, and ensuring the report is defensible for presentation and defense.`,
  phases: [
    {
      title: 'Phase 1 – Discovery and Analysis',
      duration: '35 minutes',
      description: 'Assemble and reconcile all prior laboratory outputs.',
      evidence: [
        {
          type: 'table',
          title: 'Semester Evidence and Output Index',
          reference: 'SEM-INDEX-14',
          headers: ['Lab', 'Primary Output', 'Integration Section'],
          rows: [
            ['Lab 10', 'Asset Inventory', 'Asset Inventory / System Description'],
            ['Lab 11', 'Risk Register', 'Risk Assessment'],
            ['Lab 12', 'Gap Analysis', 'Control Assessment / Gap Analysis'],
            ['Lab 13', 'Audit Findings', 'Audit Findings / Recommendations'],
            ['Labs 1–8', 'Guided findings', 'Evidence Summary / Cross-reference'],
          ],
        },
        {
          type: 'memo',
          title: 'Audit Committee Reporting Expectations',
          reference: 'BAC-EXPECT-14',
          content: `Report must include executive summary, scope, methodology, consolidated findings, prioritized recommendations, AI validation summary, and conclusion suitable for Board review.`,
        },
      ],
      investigationTasks: [
        'Collect all laboratory deliverables and identify inconsistencies in Risk IDs or finding numbers.',
        'Map outputs to final report structure sections.',
      ],
      analysisTasks: [
        'Prepare integration checklist for all final report sections.',
        'Resolve contradictions across laboratory workpapers with documented rationale.',
      ],
    },
    {
      title: 'Phase 2 – Investigation',
      duration: '40 minutes',
      description: 'Validate finding consistency and evidence traceability.',
      evidence: [
        {
          type: 'checklist',
          title: 'Final Report Quality Checklist',
          reference: 'QA-CHK-14',
          headers: ['Quality Element', 'Verified'],
          rows: [
            ['Every finding cites evidence ID or document reference', 'Pending'],
            ['Risk IDs consistent across register and findings', 'Pending'],
            ['Recommendations linked to findings and gaps', 'Pending'],
            ['AI-assisted sections validated per HITL framework', 'Pending'],
            ['Executive summary reflects top risks accurately', 'Pending'],
          ],
        },
      ],
      investigationTasks: [
        'Cross-check findings against Evidence Repository and prior lab citations.',
        'Verify recommendation feasibility and ownership assignments.',
      ],
      analysisTasks: [
        'Complete quality checklist with pass/fail notes.',
        'Document integration adjustments made during reconciliation.',
      ],
    },
    {
      title: 'Phase 3 – Risk Assessment',
      duration: '30 minutes',
      description: 'Validate consolidated risk themes in the executive summary.',
      evidence: [
        {
          type: 'table',
          title: 'Consolidated Risk Theme Summary',
          reference: 'THEME-14',
          headers: ['Theme', 'Finding Count', 'Highest Risk'],
          rows: [
            ['Access control failures', '—', '—'],
            ['Privacy and compliance gaps', '—', '—'],
            ['Infrastructure and change management', '—', '—'],
            ['Incident response weaknesses', '—', '—'],
            ['Emerging technology governance', '—', '—'],
          ],
        },
      ],
      investigationTasks: [
        'Ensure executive summary accurately represents prioritized risks.',
      ],
      analysisTasks: [
        'Draft executive summary section for final audit report.',
        'Validate risk theme narrative against risk register and findings.',
      ],
    },
    {
      title: 'Phase 4 – Control Assessment',
      duration: '30 minutes',
      description: 'Integrate control assessment and gap analysis into final report.',
      evidence: [],
      investigationTasks: [
        'Incorporate Lab 12 control inventory and gap analysis into report draft.',
      ],
      analysisTasks: [
        'Draft Control Assessment and Gap Analysis report sections.',
        'Summarize remediation roadmap for management response section.',
      ],
    },
    {
      title: 'Phase 5 – Audit Findings and Recommendations',
      duration: '40 minutes',
      description: 'Finalize integrated findings and recommendations in report format.',
      evidence: [
        {
          type: 'memo',
          title: 'Executive Summary Writing Standards',
          reference: 'EXEC-STD-14',
          content: `Answer: (1) Overall control environment state, (2) Highest-priority risks, (3) Immediate actions required, (4) Expected outcomes if recommendations implemented.`,
        },
      ],
      investigationTasks: [
        'Assemble consolidated findings and recommendations sections.',
      ],
      analysisTasks: [
        'Complete final audit report draft with all required sections.',
        'Prepare presentation outline for Week 17 defense.',
      ],
    },
    {
      title: 'Phase 6 – Reflection and HITL AI Validation',
      duration: '45 minutes',
      description: 'Complete AI usage log and validation portfolio; prepare defense readiness.',
      evidence: [],
      investigationTasks: [
        'Compile AI usage log across all laboratories where AI was used.',
        'Complete AI Declaration for each lab where required.',
      ],
      analysisTasks: [
        'Prepare AI Validation Portfolio with accept/modify/reject documentation per HITL stages.',
        'Write reflection on AI-assisted audit work and professional judgment.',
        'Complete final project readiness checklist for presentation and defense.',
      ],
    },
  ],
  requiredOutputs: [
    'AI Usage Log',
    'AI Validation Portfolio',
    'Final Audit Report Draft',
    'Reflection on AI-Assisted Audit Work',
    'Final Project Readiness Checklist',
    'Presentation Outline',
  ],
  submissionRequirements: withControlMatrix(withRiskRegister([
    'Laboratory Report',
    'AI Validation Portfolio',
    'Final Audit Report Draft',
    'Presentation Outline',
    'HITL AI Validation Notes',
    'Reflection',
  ])),
  submissionNotes:
    'Integrate outputs from Labs 10–13. Complete AI Declaration for laboratories where AI tools were used. Prepare for Week 17 presentation and defense.',
  requiredAnalysis: [
    'Integrate semester laboratory outputs into coherent final report sections.',
    'Validate all AI-assisted content using the five-stage HITL framework.',
    'Prepare presentation materials and defense readiness checklist.',
  ],
  hitlAssessment: STANDARD_HITL,
  assessmentCriteria: STANDARD_ASSESSMENT_CRITERIA,
}
