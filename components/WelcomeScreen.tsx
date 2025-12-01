import React, { useState } from 'react';
import { AppStatus, Difficulty } from '../types';
import { SAMPLE_ROLES } from '../constants';
import { Button } from './Button';
import { BrainCircuit, Briefcase, Code, Sparkles, Terminal } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (role: string, topic: string, difficulty: Difficulty) => void;
  onStartCurated: () => void;
  status: AppStatus;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onStartCurated, status }) => {
  const [role, setRole] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MidLevel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      // Pass empty topic if not provided; service will handle it
      onStart(role, topic, difficulty);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-slide-up grid md:grid-cols-2 gap-8 items-stretch">
      
      {/* Left: Custom Interview Generator */}
      <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-dark-800 to-dark-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Sparkles size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">AI Generator</h2>
        </div>
        <p className="text-slate-400 mb-8 text-sm">
          Generate a unique set of questions tailored to a specific job description and difficulty level.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Briefcase size={16} /> Target Role
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Full Stack Developer"
                className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
              {/* Quick Select Tags */}
              <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-hide">
                {SAMPLE_ROLES.slice(0, 3).map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)} className="text-xs px-2 py-1 rounded-md bg-dark-800 text-slate-400 hover:text-white whitespace-nowrap border border-white/5 hover:border-indigo-500/30">
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <BrainCircuit size={16} /> Focus Topic <span className="text-slate-500 font-normal ml-auto text-xs">(Optional)</span>
            </label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. System Design, Hooks, Security"
              className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Difficulty</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.values(Difficulty).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`text-xs py-2 px-1 rounded-lg border transition-all ${
                    difficulty === d 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/50' 
                    : 'bg-dark-900 border-dark-700 text-slate-400 hover:bg-dark-800'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-4" 
            disabled={!role || status !== AppStatus.Idle}
          >
            Generate Session
          </Button>
        </form>
      </div>

      {/* Right: Curated Challenges */}
      <div className="flex flex-col gap-6">
        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-900/20 to-dark-900 flex-1 flex flex-col justify-center text-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           
           <div className="relative z-10">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-500/30">
               <Terminal size={32} />
             </div>
             
             <h3 className="text-2xl font-bold text-white mb-2">Coding Challenges</h3>
             <p className="text-slate-400 mb-8 max-w-xs mx-auto">
               Take our curated full-stack assessment covering JS Algorithms, React Hooks, and Backend logic.
             </p>
             
             <Button onClick={onStartCurated} className="w-full bg-white text-indigo-900 hover:bg-slate-200 hover:from-white hover:to-white">
               Start Assessment
             </Button>
           </div>
        </div>

        <div className="p-6 rounded-3xl border border-white/5 bg-dark-800/50">
           <div className="flex items-start gap-4">
              <div className="p-2 bg-green-500/10 text-green-400 rounded-lg">
                 <Code size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Daily Streak: 0</h4>
                <p className="text-xs text-slate-500 mt-1">Complete a challenge to start your streak!</p>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};