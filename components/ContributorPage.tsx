
import React, { useState } from 'react';
import { Button } from './Button';
import { Send, FileText, Code, CheckCircle } from 'lucide-react';
import { Submission, UserProfile } from '../types';
import { saveSubmission } from '../services/dbService';

interface ContributorPageProps {
  user: UserProfile | null;
  onNavigateHome: () => void;
}

export const ContributorPage: React.FC<ContributorPageProps> = ({ user, onNavigateHome }) => {
  const [role, setRole] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [codeExample, setCodeExample] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSubmission: Submission = {
      id: crypto.randomUUID(),
      contributorName: user?.name || 'Anonymous',
      contributorEmail: user?.email || 'anonymous',
      role,
      topic,
      question,
      answer,
      codeExample,
      timestamp: Date.now()
    };

    saveSubmission(newSubmission);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto pt-20 px-4 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
        <p className="text-slate-400 mb-8">
          Your interview question has been submitted for review. Once approved, it will help thousands of developers prepare for their dream jobs.
        </p>
        <Button onClick={onNavigateHome}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-12 pb-20 px-4 animate-slide-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Contribute a Question</h2>
        <p className="text-slate-400">Share real-world interview questions you've encountered.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-dark-800/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Target Role</label>
              <input 
                required
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Topic / Category</label>
              <input 
                required
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. React Hooks"
                className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <FileText size={16} /> Question Text
            </label>
            <textarea 
              required
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What is the difference between..."
              className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <CheckCircle size={16} /> Suggested Answer
            </label>
            <textarea 
              required
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="The answer is..."
              className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Code size={16} /> Code Example (Optional)
            </label>
            <div className="relative group">
              <textarea 
                rows={5}
                value={codeExample}
                onChange={(e) => setCodeExample(e.target.value)}
                placeholder="const example = () => { ... }"
                className="w-full bg-dark-950 font-mono text-sm border border-dark-700 rounded-xl px-4 py-3 text-blue-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
              <div className="absolute top-3 right-3 text-xs text-slate-600 font-mono">JS/TS</div>
            </div>
          </div>

          <div className="pt-4">
             <Button type="submit" className="w-full">
               <Send size={18} /> Submit Question
             </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
