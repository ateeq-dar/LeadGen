import React, { useState } from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { generateLeads } from '../services/geminiService';
import type { Lead } from '../types';
import Confetti from './Confetti';
import { CheckIcon } from './icons/CheckIcon';
import { UserIcon, LocationIcon, MailIcon, NameIcon, SparklesIcon } from './icons/FormIcons';

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    lookingFor: '',
    location: '',
    email: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    try {
      const generatedLeads = await generateLeads(formData.lookingFor, formData.location);

      // --- Webhook Integration: Attempt webhook call BEFORE showing success ---
      try {
        const webhookUrl = 'https://n8n-1tc6.onrender.com/webhook/lead';
        const payload = {
          submittedData: formData,
          generatedLeads: generatedLeads,
        };
        
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!webhookResponse.ok) {
            throw new Error(`Webhook failed with status: ${webhookResponse.status}`);
        }

        console.log('Webhook successfully triggered.');

        // Only show success message AFTER the webhook is successful
        setLeads(generatedLeads);
        setSubmitted(true);

      } catch (webhookError) {
        console.error('Failed to trigger webhook:', webhookError);
        setError('Leads were generated, but we failed to submit them. Please try again.');
      }
      // --- End Webhook Integration ---

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setFormData({ lookingFor: '', location: '', email: '', fullName: '' });
    setSubmitted(false);
    setLeads([]);
    setError(null);
  }

  if (submitted) {
    return (
      <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl ring-1 ring-black/5 animate-fade-in-up w-full">
        <Confetti />
        <div className="text-center">
            <div className="mx-auto bg-green-100 dark:bg-green-900/50 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <CheckIcon className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Leads Generated!</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">We've sent the list to {formData.email}. Here's a preview:</p>
        </div>
        <div className="mt-8 space-y-4 max-h-80 overflow-y-auto pr-2">
            {leads.map((lead, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600/50">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">@{lead.username}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{lead.profileDescription}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">Reasoning: {lead.reasoning}</p>
                </div>
            ))}
        </div>
        <button
            onClick={resetForm}
            className="w-full mt-8 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 rounded-lg py-3 px-6 transition-all duration-300"
        >
            Generate More Leads
        </button>
      </div>
    );
  }

  return (
    <div 
      style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl ring-1 ring-black/5 animate-fade-in-up"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FloatingLabelInput id="lookingFor" name="lookingFor" label="Who are you looking for?" value={formData.lookingFor} onChange={handleChange} required Icon={UserIcon}/>
        <FloatingLabelInput id="location" name="location" label="Location" value={formData.location} onChange={handleChange} required Icon={LocationIcon}/>
        <FloatingLabelInput id="email" name="email" type="email" label="Your Email" value={formData.email} onChange={handleChange} required Icon={MailIcon}/>
        <FloatingLabelInput id="fullName" name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} required Icon={NameIcon}/>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex items-center justify-center text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 rounded-lg py-3 px-6 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Get Leads Instantly
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;