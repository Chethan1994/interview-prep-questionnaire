
import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LandingPage } from './components/LandingPage';
import { ContributorPage } from './components/ContributorPage';
import { AdminPage } from './components/AdminPage';
import { Navbar } from './components/Navbar';
import { AppStatus, Difficulty, InterviewSessionData, UserProfile } from './types';
import { generateInterviewQuestions } from './services/geminiService';
import { QUESTION_COUNT } from './constants';
import { CURATED_JS_INTERVIEW } from './data/curatedQuestions';
import { onAuthStateChange } from './services/authService';
import { saveUser, trackEvent } from './services/dbService';

const App: React.FC = () => {
  // Navigation State
  // Allowed pages: 'landing', 'app', 'contribute', 'admin'
  const [currentPage, setCurrentPage] = useState<string>('landing');

  // App Logic State
  const [status, setStatus] = useState<AppStatus>(AppStatus.Idle);
  const [session, setSession] = useState<InterviewSessionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // User State
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Analytics
    trackEvent('page_view', { page: 'home' });

    // Auth Listener
    const unsubscribe = onAuthStateChange((currentUser) => {
       if (currentUser) {
         setUser(currentUser);
         saveUser(currentUser);
       } else {
         setUser(null);
       }
    });

    return () => unsubscribe();
  }, []);

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
        currentQuestionIndex: 0
      });
      setStatus(AppStatus.Interviewing);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate study material');
      setStatus(AppStatus.Error);
    }
  };

  const startCuratedInterview = () => {
    setSession({
      topic: 'Full Stack Curated',
      jobRole: 'Senior Developer',
      difficulty: Difficulty.Senior,
      questions: CURATED_JS_INTERVIEW,
      currentQuestionIndex: 0
    });
    setStatus(AppStatus.Interviewing);
  };

  const handleNextQuestion = () => {
    if (!session) return;

    const nextIndex = session.currentQuestionIndex + 1;
    
    if (nextIndex >= session.questions.length) {
      setSession({
        ...session,
        currentQuestionIndex: nextIndex
      });
      setStatus(AppStatus.Results);
    } else {
      setSession({
        ...session,
        currentQuestionIndex: nextIndex
      });
    }
  };

  const restartApp = () => {
    setSession(null);
    setStatus(AppStatus.Idle);
    setError(null);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'contribute':
        return <ContributorPage user={user} onNavigateHome={() => setCurrentPage('landing')} />;
      case 'admin':
        return <AdminPage />;
      case 'landing':
        return <LandingPage onLaunch={() => setCurrentPage('app')} />;
      case 'app':
      default:
        return (
          <div className="container mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col justify-center max-w-6xl">
            
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
                <h2 className="text-2xl font-bold text-white mb-2">Generating Study Guide</h2>
                <p className="text-slate-400">System is curating questions and detailed answers...</p>
              </div>
            )}

            {status === AppStatus.Interviewing && session && (
              <QuestionScreen 
                question={session.questions[session.currentQuestionIndex]}
                currentIndex={session.currentQuestionIndex}
                totalQuestions={session.questions.length}
                onNext={handleNextQuestion}
                status={status}
              />
            )}

            {status === AppStatus.Results && session && (
              <ResultsScreen 
                questions={session.questions}
                onRestart={restartApp}
              />
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 selection:bg-indigo-500/30 selection:text-white overflow-x-hidden font-sans">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={(page) => setCurrentPage(page)} 
        user={user}
      />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col pt-16">
        {renderContent()}
        
        <footer className="mt-auto py-8 text-center text-slate-600 text-sm border-t border-white/5 bg-dark-900">
          <p>&copy; {new Date().getFullYear()} TechCareerOS. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
