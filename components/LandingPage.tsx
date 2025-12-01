
import React from 'react';
import { Button } from './Button';
import { GoogleAd } from './GoogleAd';
import { CheckCircle, Code2, Cpu, Globe, Zap, ShieldCheck, UserCheck, ShoppingBag, BookOpen, ExternalLink, Mail } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  return (
    <div className="animate-fade-in pt-20 overflow-x-hidden scroll-smooth">
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
          The all-in-one platform for software engineers. Practice real-world coding challenges, system design, and behavioral questions with automated feedback.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button onClick={onLaunch} className="w-full sm:w-auto text-lg px-8 py-4 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30">
            Start Free Practice
          </Button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 transition-all">
            View Pricing
          </button>
        </div>
      </section>

      {/* Ad Unit 1 */}
      <GoogleAd label="Sponsored: Cloud Hosting Solutions for Developers" />

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
              title="Smart Grading Engine"
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

      {/* Revenue Stream: Paid Coaching Services */}
      <section id="services" className="py-24 container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 mb-4">
            <UserCheck size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">1-on-1 Expert Coaching</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Get personalized feedback from Senior Engineers at top tech companies. Perfect for your final round preparation.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <ServiceCard 
            title="Mock Interview"
            price="$49"
            duration="45 mins"
            description="Simulated technical interview with real-time feedback on DSA & System Design."
            tags={['Video Call', 'Written Feedback']}
          />
          <ServiceCard 
            title="Portfolio Review"
            price="$29"
            duration="Async"
            description="Deep dive review of your GitHub and Portfolio projects to highlight your strengths."
            tags={['Code Audit', 'Resume Tips']}
          />
          <ServiceCard 
            title="Career Consultation"
            price="$69"
            duration="60 mins"
            description="Strategic career planning, salary negotiation tips, and roadmap creation."
            tags={['Strategy', 'Q&A']}
          />
        </div>
      </section>

      {/* Ad Unit 2 */}
      <GoogleAd label="Sponsored: Best React Courses on Udemy - 90% OFF" />

      {/* Revenue Stream: Digital Products (Shop) */}
      <section id="shop" className="py-24 bg-dark-800/30 relative border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <ShoppingBag className="text-emerald-400" /> Premium Resources
              </h2>
              <p className="text-slate-400">Downloadable cheat sheets and guides to study offline.</p>
            </div>
            <button className="text-emerald-400 font-medium hover:text-emerald-300 flex items-center gap-2">
              View All Products <ExternalLink size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              title="React Interview Handbook"
              price="$9.99"
              type="PDF E-Book"
              image="https://placehold.co/400x300/1e293b/emerald?text=React+PDF"
            />
            <ProductCard 
              title="System Design Templates"
              price="$14.99"
              type="Design Pack"
              image="https://placehold.co/400x300/1e293b/purple?text=System+Design"
            />
            <ProductCard 
              title="Node.js Microservices Guide"
              price="$12.99"
              type="Video Course"
              image="https://placehold.co/400x300/1e293b/orange?text=Node+Course"
            />
            <ProductCard 
              title="Frontend 100 Q&A"
              price="$4.99"
              type="Cheat Sheet"
              image="https://placehold.co/400x300/1e293b/blue?text=Q%26A+Sheet"
            />
          </div>
        </div>
      </section>

      {/* Revenue Stream: Affiliate Resources */}
      <section id="resources" className="py-24 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white text-center mb-10 flex items-center justify-center gap-2">
           <BookOpen className="text-indigo-400" /> Recommended Learning Paths
        </h2>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <AffiliateLink 
             name="Complete React Developer 2025"
             platform="Udemy"
             desc="The highest rated React course on the web."
          />
          <AffiliateLink 
             name="AWS Certified Solutions Architect"
             platform="Coursera"
             desc="Get certified and increase your salary."
          />
          <AffiliateLink 
             name="Grokking System Design"
             platform="Educative.io"
             desc="Essential for L5+ engineering roles."
          />
        </div>
      </section>

      {/* Pricing Section (SaaS Revenue) */}
      <section id="pricing" className="py-24 container mx-auto px-4">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscription Plans</h2>
            <p className="text-slate-400">Unlock unlimited practice and advanced features.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              tier="Free Tier"
              price="$0"
              features={['3 Interviews per month', 'Basic JS Questions', 'Community Support']}
              active={false}
              delay="0s"
            />
            <PricingCard 
              tier="Pro"
              price="$29"
              period="/mo"
              features={['Unlimited Interviews', 'Advanced React & System Design', 'Detailed Code Reviews', 'Priority Support']}
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

      {/* Revenue Stream: Newsletter */}
      <section className="py-20 bg-indigo-900/20 border-t border-indigo-500/20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-300 mb-6">
             <Mail size={32} />
           </div>
           <h2 className="text-3xl font-bold text-white mb-4">Join the Elite Developer Circle</h2>
           <p className="text-slate-300 mb-8">
             Get weekly React tips, system design deep dives, and exclusive discount codes for our premium tools.
           </p>
           <form className="flex flex-col sm:flex-row gap-4">
             <input 
               type="email" 
               placeholder="Enter your email address" 
               className="flex-1 px-6 py-4 rounded-xl bg-dark-900 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
             />
             <Button className="whitespace-nowrap">Subscribe Free</Button>
           </form>
           <p className="text-xs text-slate-500 mt-4">No spam, unsubscribe at any time.</p>
        </div>
      </section>

    </div>
  );
};

// --- Helper Components ---

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

const ServiceCard = ({ title, price, duration, description, tags }: any) => (
  <div className="p-6 rounded-2xl bg-dark-900 border border-white/5 hover:border-pink-500/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold">{duration}</span>
    </div>
    <div className="text-3xl font-bold text-white mb-4">{price}</div>
    <p className="text-slate-400 text-sm mb-6">{description}</p>
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((t: string) => (
        <span key={t} className="text-xs px-2 py-1 bg-dark-800 text-slate-500 rounded">{t}</span>
      ))}
    </div>
    <Button variant="secondary" className="w-full text-sm">Book Session</Button>
  </div>
);

const ProductCard = ({ title, price, type, image }: any) => (
  <div className="rounded-xl overflow-hidden bg-dark-900 border border-white/5 group hover:border-emerald-500/30 transition-all">
    <div className="h-40 bg-dark-800 relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur text-xs font-bold text-white rounded">{type}</div>
    </div>
    <div className="p-4">
      <h4 className="font-bold text-white mb-1">{title}</h4>
      <div className="flex justify-between items-center mt-4">
        <span className="text-emerald-400 font-bold">{price}</span>
        <button className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded hover:bg-emerald-500 hover:text-white transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  </div>
);

const AffiliateLink = ({ name, platform, desc }: any) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-900 border border-white/5 hover:bg-dark-800 transition-colors cursor-pointer">
    <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">IMG</div>
    <div className="flex-1">
      <h5 className="text-white font-medium">{name}</h5>
      <p className="text-xs text-slate-500">{platform} • {desc}</p>
    </div>
    <ExternalLink size={16} className="text-slate-600" />
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
