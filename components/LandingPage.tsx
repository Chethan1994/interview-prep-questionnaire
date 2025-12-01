import React from 'react';
import { Button } from './Button';
import { CheckCircle, Code2, Cpu, Globe, Zap, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  return (
    <div className="animate-fade-in pt-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 text-center">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-[100%] blur-[120px] -z-10 animate-pulse" />
        
        <div className="absolute top-20 left-[10%] w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float -z-10" />
        <div className="absolute bottom-20 right-[10%] w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float-delayed -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 animate-slide-up hover:scale-105 transition-transform cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          New: React & Full Stack Challenges Added
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight animate-slide-up">
          Master Your Tech Interview <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Get Hired Faster
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          The all-in-one platform for software engineers. Practice real-world coding challenges, system design, and behavioral questions with AI-powered feedback.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button onClick={onLaunch} className="w-full sm:w-auto text-lg px-8 py-4 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30">
            Start Free Practice
          </Button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 transition-all">
            View Pricing
          </button>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-500 font-medium animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <span className="flex items-center gap-2"><Globe size={20} /> Used by devs from</span>
          <span className="hover:text-slate-300 transition-colors cursor-default">GOOGLE</span>
          <span className="hover:text-slate-300 transition-colors cursor-default">META</span>
          <span className="hover:text-slate-300 transition-colors cursor-default">AMAZON</span>
          <span className="hover:text-slate-300 transition-colors cursor-default">NETFLIX</span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-dark-800/50 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Everything you need to <span className="text-indigo-400">crack the code</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Code2 className="text-blue-400" />}
              title="Live Coding Environment"
              description="Practice JS, React, and Node.js challenges in a realistic IDE environment."
              delay="0s"
            />
            <FeatureCard 
              icon={<Cpu className="text-purple-400" />}
              title="AI Grading Engine"
              description="Get instant, detailed feedback on your code efficiency, readability, and logic."
              delay="0.1s"
            />
            <FeatureCard 
              icon={<Zap className="text-yellow-400" />}
              title="Curated Question Bank"
              description="Access 500+ real interview questions from top tech companies."
              delay="0.2s"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section (Income Generation) */}
      <section className="py-24 container mx-auto px-4">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Invest in your career with plans that scale with your ambition.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              tier="Free Tier"
              price="$0"
              features={['3 AI Interviews per month', 'Basic JS Questions', 'Community Support']}
              active={false}
              delay="0s"
            />
            <PricingCard 
              tier="Pro"
              price="$29"
              period="/mo"
              features={['Unlimited AI Interviews', 'Advanced React & System Design', 'Detailed Code Reviews', 'Priority Support']}
              active={true}
              recommended
              delay="0.1s"
            />
            <PricingCard 
              tier="Lifetime"
              price="$199"
              period=" one-time"
              features={['Everything in Pro', 'Lifetime Updates', '1-on-1 Mock Interview (1x)', 'Resume Review']}
              active={false}
              delay="0.2s"
            />
         </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) => (
  <div 
    className="p-8 rounded-2xl bg-dark-900 border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 group animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className="w-12 h-12 rounded-lg bg-dark-800 group-hover:bg-indigo-500/20 transition-colors flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const PricingCard = ({ tier, price, period = '', features, active, recommended, delay }: any) => (
  <div 
    className={`relative p-8 rounded-2xl border flex flex-col transition-all duration-300 animate-slide-up hover:-translate-y-2 ${active ? 'bg-indigo-900/10 border-indigo-500/50 shadow-2xl shadow-indigo-900/20 scale-105 z-10' : 'bg-dark-900 border-white/5 hover:border-indigo-500/20'}`}
    style={{ animationDelay: delay }}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
        Most Popular
      </div>
    )}
    <h3 className="text-lg font-medium text-slate-300 mb-2">{tier}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-bold text-white">{price}</span>
      <span className="text-slate-500">{period}</span>
    </div>
    <div className="space-y-4 mb-8 flex-1">
      {features.map((f: string, i: number) => (
        <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
          <CheckCircle size={18} className="text-indigo-400 shrink-0 mt-0.5" />
          <span>{f}</span>
        </div>
      ))}
    </div>
    <Button variant={active ? 'primary' : 'secondary'} className="w-full">
      {active ? 'Start Free Trial' : 'Get Started'}
    </Button>
  </div>
);