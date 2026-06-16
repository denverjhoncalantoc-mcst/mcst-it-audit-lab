# MCST IT Audit Lab Sandbox

Semester-long IT audit engagement sandbox for **PEIS002 – IT Audits and Control** (BS Information Systems).

## Overview

Students conduct a continuous IT audit investigation of **MCST Retail Corporation** across 10 laboratory sessions. Each session simulates a **3-hour audit fieldwork engagement** with phased investigation, realistic evidence, and professional deliverables.

This is **not** a submission system. Students prepare outputs offline and submit through Google Classroom.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- No backend, authentication, or database

## Getting Started

```bash
cd mcst-it-audit-lab
npm install
npm run dev
```

## Laboratory Structure

Each lab follows a phased audit methodology:

1. **Discovery and Analysis** — Review evidence, understand the environment
2. **Investigation** — Examine logs, policies, incidents, configurations
3. **Risk Assessment** — Build risk registers and risk matrices
4. **Control Assessment** — Classify and evaluate controls
5. **Audit Findings and Recommendations** — Document CCER findings

Evidence types include incident reports, policy documents, access logs, emails, security reports, change requests, architecture diagrams, and screenshots.

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/laboratory` | Laboratory Activities |
| `/laboratory/lab-1` … `lab-10` | Individual audit engagements |
| `/company` | Sandbox Company Profile |
| `/final-project` | Final Audit Project Guide |

## Deploy to Vercel (with Alumnilink account)

Deploy as a **separate Vercel project** on the same account as Alumnilink. Full steps:

**[DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md)**

Quick CLI deploy:

```bash
npm run build
npx vercel --prod
```

`vercel.json` handles SPA routing. Optional subdomain: `audit.your-alumnilink-domain.com`.

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx, Navbar.jsx, LabCard.jsx
│   ├── PhaseSection.jsx, EvidenceDocument.jsx
│   ├── TaskList.jsx, SubmissionRequirements.jsx
│   └── SectionCard.jsx, DataTable.jsx
├── data/
│   ├── labs/          # lab01.js – lab10.js + index.js
│   ├── company.js
│   └── navigation.js
└── pages/
```
