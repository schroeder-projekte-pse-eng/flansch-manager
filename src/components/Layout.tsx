import { NavLink, useLocation } from 'react-router-dom';
import { ScanLine, FolderOpen, LayoutList, Database, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Scannen', icon: ScanLine },
  { to: '/projekte', label: 'Projekte', icon: FolderOpen },
  { to: '/uebersicht', label: 'Übersicht', icon: LayoutList },
  { to: '/flanschen', label: 'Flanschdaten', icon: Database },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const pageTitle = navItems.find(n => n.to === location.pathname)?.label ?? 'Flanschmanagement';

  return (
    <div className="flex flex-col min-h-svh bg-slate-100">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-1 rounded hover:bg-blue-700"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <span className="font-semibold text-lg tracking-tight">
              Flanschmanagement
            </span>
            <span className="hidden sm:block text-blue-300 text-sm">— {pageTitle}</span>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors
                  ${isActive ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-700'}`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-blue-900 px-4 pb-3 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded text-sm font-medium transition-colors
                  ${isActive ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-700'}`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Bottom nav mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 shadow-lg">
        <div className="flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-2 text-xs font-medium transition-colors
                ${isActive ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`
              }
            >
              <Icon size={20} />
              <span className="mt-0.5">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>
    </div>
  );
}
