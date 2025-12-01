import React, { useState } from 'react';
import { AppStatus, Question, QuestionType } from '../types';
import { Button } from './Button';
import { AlertCircle, CheckCircle2, ChevronRight, HelpCircle, Lightbulb, Code, Terminal } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSubmit: (answer: string) => void;
  status: AppStatus;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSubmit,
  status
}) => {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    onAnswerSubmit(answer);
    setAnswer('');
    setShowHint(false);
  };

  const isCodeQuestion = question.type === QuestionType.Code;

  return (
    <div className="max-w-5xl mx-auto w-full pt-16 md:pt-20 pb-12">
      {/* Progress Bar */}
      <div className="mb-8 flex items-center gap-4">
        <span className="text-sm font-medium text-primary-300 whitespace-nowrap">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <div className="h-2 flex-1 bg-dark-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-6 animate-fade-in" key={question.id}>
        {/* Question Card */}
        <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-primary-500 shadow-xl relative overflow-hidden">
          {/* Decorative code pattern background */}
          {isCodeQuestion && (
            <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
              <Code size={150} />
            </div>
          )}
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-300 border border-primary-500/20">
              {isCodeQuestion ? <Terminal size={14} /> : <HelpCircle size={14} />}
              {question.topic}
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight text-white mb-6 relative z-10">
            {question.text}
          </h2>
          
          {/* Hint Toggle */}
          <div className="relative z-10">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-slate-400 hover:text-primary-300 flex items-center gap-2 transition-colors"
            >
              <Lightbulb size={16} />
              {showHint ? 'Hide Hint' : 'Need a hint?'}
            </button>
            
            {showHint && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-100 text-sm animate-slide-up">
                <span className="font-bold block mb-1">Hint:</span> {question.hint}
              </div>
            )}
          </div>
        </div>

        {/* Answer Input Area */}
        <div className={`glass-panel p-1 rounded-2xl shadow-lg flex flex-col ${isCodeQuestion ? 'border-indigo-500/30' : ''}`}>
           {isCodeQuestion && (
             <div className="px-4 py-2 bg-dark-900/80 border-b border-white/5 text-xs text-slate-500 font-mono flex justify-between items-center rounded-t-xl">
                <span>main.js</span>
                <span>JavaScript / React</span>
             </div>
           )}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={isCodeQuestion ? "// Write your solution here..." : "Type your answer here..."}
            className={`w-full min-h-[300px] bg-dark-900/50 rounded-xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-y leading-relaxed
              ${isCodeQuestion ? 'font-mono text-sm bg-dark-950/80 text-emerald-100' : 'font-sans text-lg placeholder-slate-600'}
            `}
            spellCheck={!isCodeQuestion}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            onClick={handleSubmit} 
            disabled={!answer.trim()}
            isLoading={status === AppStatus.Evaluating}
            className="px-8"
          >
            Submit Solution <ChevronRight size={20} />
          </Button>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
          <AlertCircle size={12} />
          {isCodeQuestion 
            ? 'AI will evaluate your code logic, efficiency, and syntax.' 
            : 'AI feedback focuses on clarity and technical accuracy.'}
        </p>
      </div>
    </div>
  );
};