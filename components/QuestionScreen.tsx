import React, { useState, useEffect } from 'react';
import { AppStatus, Question, QuestionType } from '../types';
import { Button } from './Button';
import { ChevronRight, Lightbulb, Code, CheckCircle } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  status: AppStatus;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onNext,
  status
}) => {
  const [showHint, setShowHint] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setShowHint(false);
  }, [question.id]);

  const handleNext = () => {
    onNext();
  };

  const isCodeQuestion = question.type === QuestionType.Code;
  
  // Use either the 'answer' from API or 'modelAnswer' from curated data
  const finalAnswer = question.answer || question.modelAnswer || "No answer provided.";
  const example = question.example;

  return (
    <div className="max-w-4xl mx-auto w-full pt-16 md:pt-20 pb-12 px-4">
      {/* Progress Bar */}
      <div className="mb-8 flex items-center gap-4">
        <span className="text-sm font-medium text-primary-300 whitespace-nowrap">
          Q {currentIndex + 1} / {totalQuestions}
        </span>
        <div className="h-2 flex-1 bg-dark-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-6 animate-fade-in" key={question.id}>
        
        {/* Question & Answer Card (Combined for direct view) */}
        <div className="glass-panel rounded-2xl overflow-hidden shadow-xl bg-dark-800/80 border border-white/5">
          
          {/* Question Header */}
          <div className="bg-dark-900/50 p-6 md:p-8 border-b border-white/5">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wide">
                {question.topic}
              </span>
              <button 
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-slate-500 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <Lightbulb size={12} />
                {showHint ? 'Hide Hint' : 'Hint'}
              </button>
            </div>
            
            <h2 className="text-2xl font-semibold leading-tight text-white mb-2">
              {question.text}
            </h2>

            {showHint && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-100 text-sm animate-slide-up">
                <span className="font-bold mr-1">Hint:</span> {question.hint}
              </div>
            )}
          </div>

          {/* Direct Answer Section */}
          <div className="p-6 md:p-8 bg-gradient-to-b from-dark-800 to-dark-900/80">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-1">
                <CheckCircle size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-emerald-100 mb-3">Answer</h3>
                
                {isCodeQuestion ? (
                  <div className="relative group mt-2">
                    <div className="absolute -top-3 left-4 bg-dark-900 px-2 text-xs font-mono text-emerald-500 border border-emerald-500/30 rounded select-none">
                       Solution
                    </div>
                    <pre className="font-mono text-sm leading-relaxed text-emerald-100 bg-[#0d1117] p-6 rounded-xl border border-white/10 shadow-inner overflow-x-auto">
                      <code>{finalAnswer.trim()}</code>
                    </pre>
                  </div>
                ) : (
                  <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                    {finalAnswer}
                  </p>
                )}
              </div>
            </div>

            {/* Code Example Section (if available) */}
            {example && (
              <div className="ml-0 md:ml-12 mt-6">
                 <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
                   <Code size={12} /> {isCodeQuestion ? 'Usage Example' : 'Code Example'}
                 </div>
                 <div className="relative group">
                   <pre className="font-mono text-sm text-blue-200 bg-dark-950 p-5 rounded-xl border border-white/5 shadow-inner overflow-x-auto">
                     <code>{example.trim()}</code>
                   </pre>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex justify-end pt-4">
          <Button onClick={onNext} className="w-full md:w-auto text-lg px-8 py-4 shadow-xl shadow-indigo-900/20">
            Next Question <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>

      </div>
    </div>
  );
};