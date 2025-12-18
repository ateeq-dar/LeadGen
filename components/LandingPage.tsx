
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">
          Scale Your Outreach <br />
          <span className="text-indigo-600 dark:text-indigo-400">With AI Precision</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Instantly generate high-quality Instagram leads for any niche. Stop wasting time manually searching for clients.
        </p>
        <button 
          onClick={onGetStarted}
          className="mt-10 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/40 transform hover:-translate-y-1"
        >
          Try For Free (10 Credits Included)
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-20">
        {/* Basic Plan */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl flex flex-col items-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Basic Plan</h3>
          <p className="text-gray-500 mt-2 mb-6">Perfect for starters</p>
          <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-6">$9<span className="text-lg text-gray-500">/mo</span></div>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-8 w-full">
            <li className="flex items-center"><span className="mr-2">✓</span> 100 Credits Monthly</li>
            <li className="flex items-center"><span className="mr-2">✓</span> 10 Generations (10 credits ea)</li>
            <li className="flex items-center"><span className="mr-2">✓</span> Standard AI Model</li>
            <li className="flex items-center"><span className="mr-2">✓</span> Email Support</li>
          </ul>
          <button onClick={onGetStarted} className="w-full py-4 rounded-xl border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-600 hover:text-white transition-all">Choose Basic</button>
        </div>

        {/* Advance Plan */}
        <div className="bg-indigo-600/5 dark:bg-indigo-500/10 backdrop-blur-xl p-8 rounded-3xl border-2 border-indigo-500 shadow-2xl flex flex-col items-center relative scale-105">
          <div className="absolute -top-4 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Plan</h3>
          <p className="text-gray-500 mt-2 mb-6">For power users</p>
          <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-6">$39<span className="text-lg text-gray-500">/mo</span></div>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-8 w-full">
            <li className="flex items-center font-bold text-indigo-600 dark:text-indigo-400"><span className="mr-2">✓</span> 500 Credits Monthly</li>
            <li className="flex items-center"><span className="mr-2">✓</span> 50 Generations (10 credits ea)</li>
            <li className="flex items-center"><span className="mr-2">✓</span> Priority AI Access</li>
            <li className="flex items-center"><span className="mr-2">✓</span> 24/7 Priority Support</li>
          </ul>
          <button onClick={onGetStarted} className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/40">Choose Advanced</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
