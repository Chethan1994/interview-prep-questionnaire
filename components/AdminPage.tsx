
import React, { useEffect, useState } from 'react';
import { Submission } from '../types';
import { getSubmissions } from '../services/dbService';
import { ShieldCheck, User, Calendar, Tag } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    // Load submissions from "Database"
    const data = getSubmissions();
    // Sort by newest first
    setSubmissions(data.sort((a, b) => b.timestamp - a.timestamp));
  }, []);

  return (
    <div className="container mx-auto pt-12 pb-20 px-4 animate-fade-in max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
          <ShieldCheck size={32} />
        </div>
        <div>
           <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
           <p className="text-slate-400">Review user contributed questions.</p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-20 bg-dark-800/30 rounded-2xl border border-dashed border-slate-700">
          <p className="text-slate-500">No submissions yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {submissions.map((sub) => (
            <div key={sub.id} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4 border-b border-white/5 pb-4">
                 <div>
                   <h3 className="text-xl font-bold text-white mb-1">{sub.question}</h3>
                   <div className="flex flex-wrap gap-2 text-xs">
                     <span className="flex items-center gap-1 bg-blue-500/10 text-blue-300 px-2 py-1 rounded">
                       <Tag size={12} /> {sub.topic}
                     </span>
                     <span className="bg-purple-500/10 text-purple-300 px-2 py-1 rounded">
                       {sub.role}
                     </span>
                   </div>
                 </div>
                 <div className="text-right text-xs text-slate-500 flex flex-col items-end">
                    <span className="flex items-center gap-1 mb-1">
                      <User size={12} /> {sub.contributorName} ({sub.contributorEmail})
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {new Date(sub.timestamp).toLocaleDateString()}
                    </span>
                 </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wide mb-2">Answer</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{sub.answer}</p>
                </div>
                {sub.codeExample && (
                   <div>
                     <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-2">Code Example</h4>
                     <pre className="bg-dark-950 p-4 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto border border-white/5">
                       {sub.codeExample}
                     </pre>
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
