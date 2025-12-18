
import React, { useState } from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { MailIcon } from './icons/FormIcons';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief authentication delay
    setTimeout(() => {
      setLoading(false);
      onLogin(email);
    }, 1000);
  };

  const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );

  return (
    <div className="w-full max-w-md mx-auto my-auto flex flex-col justify-center min-h-[70vh]">
      <div className="text-center mb-8 animate-fade-in-down">
         <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
          Lead<span className="text-indigo-600 dark:text-indigo-400">Gen</span>
         </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to start generating leads</p>
      </div>

      <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 animate-fade-in-up">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingLabelInput
            id="login-email"
            name="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            Icon={MailIcon}
          />
          
          <FloatingLabelInput
            id="login-password"
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            Icon={LockIcon}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 dark:text-gray-400 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-gray-300 dark:border-gray-600 bg-transparent text-indigo-600 focus:ring-indigo-500" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </div>
            ) : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          Don't have an account? <a href="#" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Create one</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
