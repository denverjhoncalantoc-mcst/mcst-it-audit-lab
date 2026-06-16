export const caseProfile = {
  name: 'MCST Retail Corporation',
  tagline: 'Semester-Long IT Audit Case Organization',
  overview:
    'MCST Retail Corporation is a medium-sized retail organization with multiple branches across the region. It sells consumer electronics, home appliances, and accessories. The company uses a Sales Management System, Inventory Management System, HRIS, Payroll System, Branch POS, email collaboration tools, shared network storage, cloud services, IoT devices, and cloud-based backup. All laboratory investigations in PEIS002 use this fictional organization as the audit subject.',
  mission:
    'To deliver quality retail products through reliable technology systems that support sales, inventory, human resources, and financial operations.',
  businessProcesses: [
    { name: 'Sales and POS Operations', description: 'Branch sales transactions, receipts, daily sales reporting, and customer service at 12 retail locations.' },
    { name: 'Inventory and Procurement', description: 'Stock management, supplier orders, warehouse transfers, and replenishment across branches.' },
    { name: 'Human Resources and Payroll', description: 'Employee onboarding, attendance, leave management, compensation processing, and benefits administration.' },
    { name: 'Finance and Reporting', description: 'Financial close, bank disbursements, management reporting, and regulatory filings.' },
    { name: 'IT Operations and Support', description: 'Infrastructure management, application support, access provisioning, backup, and incident handling.' },
  ],
  departments: [
    { name: 'IT Department', head: 'Mr. Carlo Mendoza', employees: 8, role: 'Infrastructure, applications, security, and user support' },
    { name: 'Sales Department', head: 'Ms. Liza Santos', employees: 45, role: 'POS operations, branch sales, and customer transactions' },
    { name: 'Inventory and Logistics', head: 'Mr. James Rivera', employees: 22, role: 'Stock control, warehouse systems, and procurement' },
    { name: 'Human Resources', head: 'Ms. Anna Cruz', employees: 6, role: 'Employee records, HRIS administration, and payroll coordination' },
    { name: 'Finance and Payroll', head: 'Mr. Mark Dela Cruz', employees: 10, role: 'Financial reporting, payroll disbursement, and compliance' },
    { name: 'Operations', head: 'Ms. Rosa Villanueva', employees: 18, role: 'Branch coordination, operational policies, and service delivery' },
    { name: 'Branch Offices', head: '12 Branch Managers', employees: 120, role: 'Local retail operations, shared workstations, and POS terminals' },
  ],
  systems: [
    { name: 'Sales Management System (SMS)', description: 'Core sales application for transactions, receipts, and daily sales reporting.', users: 'Sales staff, branch managers', data: 'Customer transactions, payment records, sales reports' },
    { name: 'Inventory Management System (IMS)', description: 'Tracks stock levels, purchase orders, supplier deliveries, and inter-branch transfers.', users: 'Inventory clerks, warehouse staff', data: 'Product SKUs, stock quantities, supplier information' },
    { name: 'Human Resource Information System (HRIS)', description: 'Employee profiles, attendance, leave records, and organizational structure.', users: 'HR staff, department managers', data: 'Employee personal data, employment history, salary records' },
    { name: 'Payroll System', description: 'Salary processing, deductions, tax computations, and payslip generation.', users: 'HR staff, finance team', data: 'Salary information, bank account details, tax records' },
    { name: 'Branch POS', description: 'Point-of-sale terminals at each branch connected to SMS and inventory systems.', users: 'Sales associates, cashiers', data: 'Transaction logs, payment data, shift reports' },
    { name: 'Email and Collaboration Tools', description: 'Microsoft 365 for corporate email, file sharing, and team coordination.', users: 'All departments', data: 'Business communications, shared documents' },
    { name: 'Shared Network Storage', description: 'Head office and branch file shares for operational documents and exports.', users: 'All departments', data: 'Reports, exports, shared spreadsheets' },
    { name: 'Cloud Backup', description: 'Third-party cloud replication of backup data from head office systems.', users: 'IT operations', data: 'System backups, configuration archives' },
    { name: 'Cloud Services', description: 'Cloud object storage and analytics staging used beyond formal backup scope.', users: 'IT, procurement innovation team', data: 'Backup replicas, pilot datasets' },
    { name: 'IoT Devices', description: 'Warehouse temperature and humidity sensors with local gateway management.', users: 'Warehouse operations, IT', data: 'Environmental sensor readings, device logs' },
  ],
  itEnvironment: [
    { item: 'Head Office Data Center', detail: 'On-premises servers hosting domain services, databases, and core applications' },
    { item: 'Branch Network', detail: '12 branches connected via MPLS VPN; guest and staff Wi-Fi at each location' },
    { item: 'Identity and Access', detail: 'Active Directory with mixed role-based and shared account practices' },
    { item: 'Backup and Recovery', detail: 'On-premises backup server with cloud replication; retention and testing gaps noted in evidence' },
    { item: 'Emerging Technology Pilots', detail: 'IoT warehouse monitoring and blockchain supplier settlement pilot in limited deployment' },
  ],
  usersAndRoles: [
    { role: 'IT Manager', account: 'carlo.mendoza', access: 'Domain admin, backup console, change approval' },
    { role: 'HR Officer', account: 'anna.cruz', access: 'HRIS admin, payroll module, employee records' },
    { role: 'Branch Manager', account: 'branch*.manager', access: 'POS supervisor, shared workstation, limited HRIS shortcut' },
    { role: 'Sales Associate', account: 'U-2xx series', access: 'POS terminal, no formal HRIS entitlement' },
    { role: 'Finance Analyst', account: 'finance.*', access: 'Payroll reports, bank file generation' },
    { role: 'Contractor / Vendor', account: 'varies', access: 'Ad hoc VPN and cloud API access in some evidence items' },
  ],
  technologyInventory: [
    '48 POS terminals across 12 branches',
    '12 shared branch manager workstations',
    '12 biometric attendance devices',
    '6 warehouse IoT gateways',
    'Windows Server 2012 R2 application and database servers',
    'Firewall/IDS appliance at head office',
    'Microsoft 365 tenant',
    'Cloud object storage tenant (CloudStore Inc.)',
  ],
  policies: [
    'Information Security Policy (last updated 2023)',
    'Password and Access Control Policy (v2.1, 2022)',
    'Data Privacy and Retention Policy (v1.2)',
    'Backup and Disaster Recovery Policy',
    'Acceptable Use Policy for IT Resources',
    'Change Management and Secure Deployment Policy',
    'Incident Response Procedure (v1.4)',
  ],
  auditContext: `MCST Retail Corporation is under semester-long IT audit review following recurring access control incidents, privacy concerns, deferred remediation items from prior audits, and rapid adoption of cloud and IoT technologies without mature governance.

Students should treat all evidence as authentic fieldwork material. Control weaknesses are embedded throughout the sandbox and must be discovered through professional investigation — they are not labeled in the evidence repository.`,
  evidenceCategories: [
    'Governance and Policy Evidence',
    'User and Access Evidence',
    'Infrastructure Evidence',
    'Application Evidence',
    'Data Privacy Evidence',
    'Compliance Evidence',
    'Incident Response Evidence',
    'Backup and Recovery Evidence',
    'Change Management Evidence',
    'Emerging Technology Evidence',
  ],
}

// Backward compatibility
export const companyProfile = caseProfile
