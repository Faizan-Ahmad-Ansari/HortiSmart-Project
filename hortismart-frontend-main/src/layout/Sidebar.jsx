import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  LineChart, 
  MapPin, 
  Wand2, 
  UserCircle,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/market', label: 'Market Prices', icon: ShoppingBag },
  { path: '/prediction', label: 'Price Prediction', icon: LineChart },
  { path: '/storage', label: 'Storage Locator', icon: MapPin },
  { path: '/value-addition', label: 'Value Addition', icon: Wand2 },
  { path: '/profile', label: 'Profile', icon: UserCircle },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 w-64 z-50 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 lg:hidden flex justify-between items-center bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <span className="font-bold text-lg text-primary-700 dark:text-primary-400">Navigation</span>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors">
            <X className="w-5 h-5 dark:text-slate-300" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-full">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-semibold shadow-sm shadow-primary-100 dark:shadow-none" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                "group-hover:text-primary-600 dark:group-hover:text-primary-400"
              )} />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 px-4">
            <div className="bg-earthy-50 dark:bg-earthy-950/30 rounded-2xl p-4 border border-earthy-100 dark:border-earthy-900/50">
              <h4 className="text-sm font-bold text-earthy-800 dark:text-earthy-300 mb-1">Need help?</h4>
              <p className="text-xs text-earthy-600 dark:text-earthy-400 mb-3">Check out our guide for best market practices.</p>
              <NavLink 
                to="/guide" 
                className="block text-center w-full text-xs font-semibold py-2 px-4 bg-white dark:bg-slate-800 border border-earthy-200 dark:border-earthy-800 text-earthy-700 dark:text-earthy-300 rounded-lg hover:bg-earthy-100 dark:hover:bg-slate-700 transition-colors"
              >
                View Guide
              </NavLink>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
