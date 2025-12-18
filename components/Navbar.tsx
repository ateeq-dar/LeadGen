
import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  user: { name: string; email: string; credits: number };
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center space-x-4" ref={dropdownRef}>
      {/* Credit Display */}
      <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-200 dark:border-indigo-800 flex items-center shadow-sm">
        <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
        </svg>
        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{user.credits} Credits</span>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-1 pr-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:border-indigo-400 transition-all duration-300 group"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-gray-800 dark:text-white capitalize leading-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">{user.name}</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">Free Plan</p>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in-up origin-top-right">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">User Profile</p>
            <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
          
          <div className="py-1">
            <div className="px-4 py-2">
               <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${(user.credits / 10) * 100}%` }}></div>
               </div>
               <p className="text-[10px] mt-1 text-gray-500">Credits remaining for current generation</p>
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700/50">
            <button 
              onClick={onLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-semibold flex items-center"
            >
              <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
