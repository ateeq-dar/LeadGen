import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-gray-900 dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-indigo-500/20 blur-3xl dark:from-pink-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <div className="w-full max-w-2xl mx-auto">
          <Hero />
          <LeadForm />
        </div>
        <footer className="text-center py-8 mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} LeadGen. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;