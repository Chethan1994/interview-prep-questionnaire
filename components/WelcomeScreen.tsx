import React, { useState } from 'react';
import { AppStatus, Difficulty } from '../types';
import { SAMPLE_ROLES } from '../constants';
import { Button } from './Button';
import { BrainCircuit, Briefcase, Code, Sparkles, Terminal, FileJson, FileCode, Layers, Palette } from 'lucide-react';

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
      onStart(role, topic, difficulty);
    }
  };

  const handleFrontendPath = (selectedTopic: string) => {
    onStart("Frontend Developer", selectedTopic, difficulty);
  };

  return (
    <div className="max-w-5xl mx-auto w-full animate-slide-up flex flex-col gap-10 pb-12">
      
      {/* SECTION 1: FRONTEND MASTERY PATH (Priority UI) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
           <h2 className="text-2xl font-bold text-white">Frontend Mastery Path</h2>
           <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30">POPULAR</span>
        </div>
        <p className="text-slate-400">Select a core technology to generate 20 rapid-fire study questions.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           <TopicCard 
             title="JavaScript" 
             icon={<FileJson className="text-yellow-400" />} 
             color="hover:border-yellow-500/50 hover:bg-yellow-500/5"
             onClick={() => handleFrontendPath("JavaScript Core Concepts")}
           />
           <TopicCard 
             title="TypeScript" 
             icon={<FileCode className="text-blue-400" />} 
             color="hover:border-blue-500/50 hover:bg-blue-500/5"
             onClick={() => handleFrontendPath("TypeScript Advanced Types & Interfaces")}
           />
           <TopicCard 
             title="React" 
             icon={<Layers className="text-cyan-400" />} 
             color="hover:border-cyan-500/50 hover:bg-cyan-500/5"
             onClick={() => handleFrontendPath("React Hooks & Patterns")}
           />
           <TopicCard 
             title="CSS & Design" 
             icon={<Palette className="text-pink-400" />} 
             color="hover:border-pink-500/50 hover:bg-pink-500/5"
             onClick={() => handleFrontendPath("CSS Layouts & Responsive Design")}
           />
        </div>
      </div>

      <div className="w-full h-px bg-white/5" />

      {/* SECTION 2: CUSTOM GENERATOR & CURATED (Secondary) */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        
        {/* Left: Custom Interview Generator */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-dark-800/50">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-700/50 text-slate-300">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Custom Topic</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Target Role</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Backend Engineer"
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Specific Focus (Optional)</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Docker, AWS, GraphQL"
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
                      ? 'bg-indigo-600 border-indigo-500 text-white' 
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
              className="w-full mt-2" 
              disabled={!role || status !== AppStatus.Idle}
              variant="secondary"
            >
              Generate Custom Session
            </Button>
          </form>
        </div>

        {/* Right: Curated Challenges */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-900/20 to-dark-900 flex-1 flex flex-col justify-center text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-300 mx-auto mb-4 border border-indigo-500/30">
                 <Terminal size={28} />
               </div>
               
               <h3 className="text-xl font-bold text-white mb-2">Hardcore Coding Mode</h3>
               <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
                 Solve 15+ complex algorithm and system design challenges with pre-written model answers.
               </p>
               
               <Button onClick={onStartCurated} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border-0">
                 Start Coding Challenge
               </Button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper for Topic Cards
const TopicCard = ({ title, icon, color, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`p-6 rounded-2xl bg-dark-800 border border-white/5 cursor-pointer transition-all duration-300 group ${color} hover:-translate-y-1 hover:shadow-xl`}
  >
    <div className="w-12 h-12 rounded-xl bg-dark-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
    <p className="text-xs text-slate-500 font-medium">20 Questions • 15 Mins</p>
  </div>
);