import React from 'react';
import { Question } from '../types';
import { Button } from './Button';
import { RefreshCcw, CheckCircle, BookOpen } from 'lucide-react';

interface ResultsScreenProps {
  questions: Question[];
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  onRestart
}) => {
  return (
    <div className="max-w-4xl mx-auto w-full pb-20 animate-slide-up px-4">
      {/* Header Summary */}
      <div className="text-center mb-12 pt-10">
        <div className="inline-block p-4 rounded-full bg-green-500/10 mb-6 border border-green-500/20 backdrop-blur-md">
          <CheckCircle className="w-16 h-16 text-green-400" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Session Complete!</h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-8">
          You've reviewed all {questions.length} questions. Here is a summary of the material covered in this session.
        </p>
        
        <div className="flex justify-center gap-4">
          <Button onClick={onRestart} variant="primary">
            <RefreshCcw size={18} /> Start New Session
          </Button>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
           <BookOpen className="text-indigo-400" size={24} />
           <h3 className="text-2xl font-bold text-white">Study Summary</h3>
        </div>

        {questions.map((q, index) => {
          const answer = q.answer || q.modelAnswer || "No answer provided.";
          
          return (
            <div key={q.id} className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all">
              {/* Question Header */}
              <div className="bg-dark-800/50 p-6 border-b border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">TOPIC {index + 1}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{q.topic}</span>
                  </div>
                  <h4 className="text-lg font-medium text-white">{q.text}</h4>
              </div>

              {/* Answer Body */}
              <div className="p-6 bg-dark-900/30">
                <div className="text-xs uppercase tracking-wider text-emerald-500 font-bold mb-3 flex items-center gap-2">
                  <CheckCircle size={12} /> Solution
                </div>
                {q.type === 'code' ? (
                   <pre className="font-mono text-sm text-slate-300 bg-black/40 p-4 rounded-lg overflow-x-auto border border-white/5">
                     <code>{answer}</code>
                   </pre>
                ) : (
                   <p className="text-slate-300 leading-relaxed text-sm">
                     {answer}
                   </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};