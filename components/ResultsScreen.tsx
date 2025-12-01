import React from 'react';
import { Evaluation, Question } from '../types';
import { Button } from './Button';
import { Award, RefreshCcw, Share2, Star, Check, X } from 'lucide-react';

interface ResultsScreenProps {
  questions: Question[];
  evaluations: Record<string, Evaluation>;
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  evaluations,
  onRestart
}) => {
  // Calculate average score
  const scores = Object.values(evaluations).map((e: Evaluation) => e.score);
  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleShare = () => {
    // Mock share functionality
    navigator.clipboard.writeText(`I just scored ${averageScore.toFixed(1)}/10 on PrepMaster AI!`);
    alert("Result copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-20 animate-slide-up">
      {/* Header Summary */}
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 mb-6 border border-white/10 backdrop-blur-md">
          <Award className="w-16 h-16 text-primary-300" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Interview Complete</h2>
        <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-slate-400 text-lg">Overall Score:</span>
            <span className={`text-5xl font-bold ${getScoreColor(averageScore)}`}>
              {averageScore.toFixed(1)}
              <span className="text-2xl text-slate-500">/10</span>
            </span>
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={onRestart} variant="secondary">
            <RefreshCcw size={18} /> New Session
          </Button>
          <Button onClick={handleShare}>
            <Share2 size={18} /> Share Result
          </Button>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="space-y-8">
        <h3 className="text-xl font-semibold text-slate-300 border-b border-slate-700 pb-4">
          Detailed Feedback
        </h3>

        {questions.map((q, index) => {
          const evalData = evaluations[q.id];
          if (!evalData) return null;

          return (
            <div key={q.id} className="glass-panel rounded-2xl overflow-hidden transition-all hover:border-primary-500/30">
              {/* Question Header */}
              <div className="bg-dark-800/50 p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-primary-400 mb-1 block">QUESTION {index + 1}</span>
                  <h4 className="text-lg font-medium text-white">{q.text}</h4>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-900 border border-white/5 ${getScoreColor(evalData.score)}`}>
                  <Star size={18} fill="currentColor" className="opacity-80"/>
                  <span className="font-bold text-xl">{evalData.score}</span>
                </div>
              </div>

              {/* Feedback Body */}
              <div className="p-6 space-y-6">
                
                {/* User Answer */}
                <div className="bg-dark-900/30 rounded-xl p-4 border border-white/5">
                   <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Your Answer</div>
                   <p className="text-slate-300 leading-relaxed">{evalData.userAnswer}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* AI Feedback */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-slate-200 font-medium">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Award size={14} />
                      </div>
                      Analysis
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {evalData.feedback}
                    </p>
                  </div>

                  {/* Ideal Answer */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-slate-200 font-medium">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                        <Check size={14} />
                      </div>
                      Ideal Response
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-slate-700 pl-4">
                      "{evalData.idealAnswer}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};