import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, History, Settings, PlusCircle } from 'lucide-react';

const TopBar = () => {
  const navItems = [
    { name: 'Nouveau', path: '/', icon: PlusCircle },
    { name: 'Historique', path: '/historique', icon: History },
    { name: 'Paramètres', path: '/parametres', icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-cnas-blue text-white p-1 rounded">
                <FileText size={20} />
              </div>
              <span className="font-bold text-slate-800 tracking-tight">CNAS PEC</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-cnas-blue text-slate-900'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    }`
                  }
                >
                  <item.icon size={16} className="mr-2" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
