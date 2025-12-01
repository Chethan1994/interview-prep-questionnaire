import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LandingPage } from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { AppStatus, Difficulty, InterviewSessionData } from './types';
import { generateInterviewQuestions, evaluateAnswer } from './services/geminiService';
import { QUESTION_COUNT } from './constants';
import { CURATED_JS_INTERVIEW } from './data/curatedQuestions';

const App: React.FC = () => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<'landing' | 'app'>('landing');

  // App Logic State
  const [status, setStatus] = useState<AppStatus>(AppStatus.Idle);
  const [session, setSession] = useState<InterviewSessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startInterview = async (role: string, topic: string, difficulty: Difficulty) => {
    setStatus(AppStatus.GeneratingQuestions);
    setError(null);
    try {
      const questions = await generateInterviewQuestions(role, topic, difficulty, QUESTION_COUNT);
      setSession({
        topic,
        jobRole: role,
        difficulty,
        questions,
        evaluations: {},
        currentQuestionIndex: 0
      });
      setStatus(AppStatus.Interviewing);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start interview');
      setStatus(AppStatus.Error);
    }
  };

  const startCuratedInterview = () => {
    setSession({
      topic: 'Full Stack Curated',
      jobRole: 'Senior Developer',
      difficulty: Difficulty.Senior,
      questions: CURATED_JS_INTERVIEW,
      evaluations: {},
      currentQuestionIndex: 0
    });
    setStatus(AppStatus.Interviewing);
  };

  const handleAnswerSubmit = async (answer: string) => {
    if (!session) return;

    const currentQuestion = session.questions[session.currentQuestionIndex];
    
    setStatus(AppStatus.Evaluating);

    try {
      const evaluation = await evaluateAnswer(
        currentQuestion, 
        answer, 
        session.jobRole, 
        session.difficulty
      );

      const nextEvaluations = {
        ...session.evaluations,
        [currentQuestion.id]: evaluation
      };

      const nextIndex = session.currentQuestionIndex + 1;
      
      if (nextIndex >= session.questions.length) {
        setSession({
          ...session,
          evaluations: nextEvaluations,
          currentQuestionIndex: nextIndex // End of list
        });
        setStatus(AppStatus.Results);
      } else {
        setSession({
          ...session,
          evaluations: nextEvaluations,
          currentQuestionIndex: nextIndex
        });
        setStatus(AppStatus.Interviewing);
      }
    } catch (err) {
       setError("Failed to submit answer. Please try again.");
       setStatus(AppStatus.Interviewing); 
    }
  };

  const restartApp = () => {
    setSession(null);
    setStatus(AppStatus.Idle);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 selection:bg-indigo-500/30 selection:text-white overflow-x-hidden font-sans">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={(page) => setCurrentPage(page)} 
      />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col pt-16">
        {currentPage === 'landing' ? (
          <LandingPage onLaunch={() => setCurrentPage('app')} />
        ) : (
          <div className="container mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col justify-center max-w-6xl">
            
            {/* App Header (Only visible inside app view) */}
            <div className="mb-8 flex items-center justify-between">
              <div onClick={restartApp} className="cursor-pointer text-sm text-slate-400 hover:text-white flex items-center gap-2">
                 &larr; Back to Dashboard
              </div>
               {session && status !== AppStatus.Results && (
                 <div className="hidden md:flex items-center gap-4 text-xs font-mono text-indigo-300 bg-indigo-900/20 px-4 py-2 rounded-full border border-indigo-500/20">
                    <span className="uppercase tracking-wider">{session.jobRole}</span>
                    <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                    <span>{session.difficulty}</span>
                 </div>
               )}
            </div>

            {error && (
              <div className="mx-auto w-full max-w-md mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-center animate-slide-up">
                <p>{error}</p>
                <button 
                  onClick={() => setError(null)} 
                  className="text-xs underline mt-2 hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            )}

            {status === AppStatus.Idle && (
              <WelcomeScreen 
                onStart={startInterview} 
                onStartCurated={startCuratedInterview}
                status={status} 
              />
            )}

            {status === AppStatus.GeneratingQuestions && (
              <div className="text-center animate-fade-in py-20">
                <div className="inline-block relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-dark-700 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Curating Your Session</h2>
                <p className="text-slate-400">AI is analyzing current industry trends...</p>
              </div>
            )}

            {(status === AppStatus.Interviewing || status === AppStatus.Evaluating) && session && (
              <QuestionScreen 
                question={session.questions[session.currentQuestionIndex]}
                currentIndex={session.currentQuestionIndex}
                totalQuestions={session.questions.length}
                onAnswerSubmit={handleAnswerSubmit}
                status={status}
              />
            )}

            {status === AppStatus.Results && session && (
              <ResultsScreen 
                questions={session.questions}
                evaluations={session.evaluations}
                onRestart={restartApp}
              />
            )}
          </div>
        )}
        
        <footer className="mt-auto py-8 text-center text-slate-600 text-sm border-t border-white/5 bg-dark-900">
          <p>&copy; {new Date().getFullYear()} TechCareerOS. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;