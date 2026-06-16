import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar, { Sidebar } from './Navbar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <footer className="border-t border-mcst-100 bg-white px-6 py-4 text-center text-xs text-slate-500">
          MCST IT Audit Lab Sandbox &mdash; PEIS002 IT Audits and Control &mdash; For academic use only
        </footer>
      </div>
    </div>
  )
}
