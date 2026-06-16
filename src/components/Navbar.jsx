import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../data/navigation'

export default function Navbar({ onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 border-b border-mcst-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-lg p-2 text-mcst-700 hover:bg-mcst-50 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-mcst-600">PEIS002</p>
            <h1 className="text-sm font-bold text-mcst-900 sm:text-base">MCST IT Audit Lab Sandbox</h1>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-mcst-50 px-4 py-1.5 text-xs font-medium text-mcst-700 md:flex">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Sandbox Environment
        </div>
      </div>
    </header>
  )
}

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-mcst-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-mcst-100 px-6 lg:hidden">
          <span className="font-bold text-mcst-900">Navigation</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-mcst-600 hover:bg-mcst-50"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-mcst-700 text-white'
                        : 'text-slate-600 hover:bg-mcst-50 hover:text-mcst-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-mcst-100 p-4">
          <p className="text-xs text-slate-500">PEIS002 — IT Audits and Control</p>
          <p className="text-xs font-medium text-mcst-700">BS Information Systems — ICS, MCST</p>
        </div>
      </aside>
    </>
  )
}
