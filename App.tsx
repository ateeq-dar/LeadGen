
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import ThemeToggle from './components/ThemeToggle';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [view, setView] = useState<'landing' | 'login' | 'app'>('landing');
  const [user, setUser] = useState<{ name: string; email: string; credits: number } | null>(null);

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

  const handleLogin = (email: string) => {
    // New users get 10 free credits (enough for 1 generation)
    setUser({ name: email.split('@')[0], email: email, credits: 10 });
    setView('app');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const deductCredits = (amount: number) => {
    if (user && user.credits >= amount) {
      setUser({ ...user, credits: user.credits - amount });
      return true;
    }
    return false;
  };

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-gray-900 overflow-x-hidden transition-colors duration-500 font-sans">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-gray-900 dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-indigo-500/20 blur-3xl dark:from-pink-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full flex justify-between items-center max-w-6xl mx-auto mb-8 gap-4">
          <div className="flex items-center space-x-2 shrink-0">
            {view === 'app' && user && (
              <Navbar user={user} onLogout={handleLogout} />
            )}
            {view !== 'app' && (
              <button 
                onClick={() => setView('landing')}
                className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tighter"
              >
                Lead<span className="text-indigo-600 dark:text-indigo-400">Gen</span>
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {view === 'landing' && (
              <button 
                onClick={() => setView('login')}
                className="px-4 py-2 sm:px-6 sm:py-2 bg-indigo-600 text-white rounded-full font-bold text-sm sm:text-base hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 whitespace-nowrap"
              >
                Sign In
              </button>
            )}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
        
        {view === 'landing' && <LandingPage onGetStarted={() => setView('login')} />}
        {view === 'login' && <LoginPage onLogin={handleLogin} />}
        {view === 'app' && user && (
          <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
            <Hero />
            <LeadForm userCredits={user.credits} onGenerate={() => deductCredits(10)} />
            <footer className="text-center py-8 mt-8 text-gray-500 dark:text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} LeadGen. All Rights Reserved.</p>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
