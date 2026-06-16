import { Link } from 'react-router-dom'
import DataTable from '../components/DataTable'
import SectionCard from '../components/SectionCard'
import { caseProfile } from '../data/caseProfile'

export default function CompanyProfile() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">MCST Retail Corporation Case File</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          Semester-long audit case organization for all PEIS002 laboratory investigations and the final audit project.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-mcst-700 to-mcst-900 px-6 py-8 text-white sm:px-8">
        <h2 className="text-2xl font-bold">{caseProfile.name}</h2>
        <p className="mt-1 text-mcst-200">{caseProfile.tagline}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mcst-100">
          {caseProfile.overview}
        </p>
      </section>

      <SectionCard title="Organization Profile" icon="scenario">
        <p className="text-sm leading-relaxed text-slate-700">{caseProfile.mission}</p>
      </SectionCard>

      <SectionCard title="Business Processes" icon="data">
        <div className="space-y-3">
          {caseProfile.businessProcesses.map((process) => (
            <div key={process.name} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-semibold text-mcst-800">{process.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{process.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Departments">
        <DataTable
          headers={['Department', 'Head', 'Employees', 'Role']}
          rows={caseProfile.departments.map((d) => [d.name, d.head, d.employees, d.role])}
        />
      </SectionCard>

      <SectionCard title="Systems Used" icon="evidence">
        <div className="space-y-4">
          {caseProfile.systems.map((system) => (
            <div key={system.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-mcst-800">{system.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{system.description}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                <span><strong className="text-slate-700">Users:</strong> {system.users}</span>
                <span><strong className="text-slate-700">Data:</strong> {system.data}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="IT Environment">
        <DataTable
          headers={['Component', 'Details']}
          rows={caseProfile.itEnvironment.map((item) => [item.item, item.detail])}
        />
      </SectionCard>

      <SectionCard title="Users and Roles">
        <DataTable
          headers={['Role', 'Account Pattern', 'Typical Access']}
          rows={caseProfile.usersAndRoles.map((u) => [u.role, u.account, u.access])}
        />
      </SectionCard>

      <SectionCard title="Technology Inventory">
        <ul className="space-y-2">
          {caseProfile.technologyInventory.map((item) => (
            <li key={item} className="rounded-lg border border-slate-100 bg-white px-4 py-2 text-sm text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Policies and Procedures">
        <ul className="space-y-2">
          {caseProfile.policies.map((policy) => (
            <li key={policy} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700">
              <svg className="h-5 w-5 shrink-0 text-mcst-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {policy}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Known Audit Context" icon="objective">
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {caseProfile.auditContext}
        </p>
      </SectionCard>

      <SectionCard title="Evidence Repository Links" icon="evidence">
        <p className="mb-4 text-sm text-slate-600">
          Review fictional audit evidence organized by category in the Evidence Repository.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {caseProfile.evidenceCategories.map((category) => (
            <Link
              key={category}
              to="/evidence"
              className="rounded-lg border border-mcst-200 bg-mcst-50 px-4 py-3 text-sm font-medium text-mcst-800 hover:bg-mcst-100"
            >
              {category} &rarr;
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
