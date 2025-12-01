import React from 'react';
import { Layout, Rocket, DollarSign, BookOpen } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  onNavigate: (page: 'landing' | 'app') => void;
  currentPage: 'landing' | 'app';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-dark-900/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('landing')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-indigo-500/30 transition-all">
            T
          </div>
          <span className="font-bold text-xl tracking-tight text-white">TechCareer<span className="text-indigo-400">OS</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#services" className="hover:text-white transition-colors">Coaching</a>
          <a href="#shop" className="hover:text-white transition-colors">Shop</a>
          <a href="#resources" className="hover:text-white transition-colors">Resources</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          {currentPage === 'landing' ? (
            <>
              <button className="hidden md:block text-slate-300 hover:text-white font-medium px-4 py-2">
                Sign In
              </button>
              <Button 
                variant="primary" 
                onClick={() => onNavigate('app')}
                className="!py-2 !px-4 !text-sm"
              >
                Launch PrepMaster <Rocket size={16} />
              </Button>
            </>
          ) : (
             <Button 
                variant="secondary" 
                onClick={() => onNavigate('landing')}
                className="!py-2 !px-4 !text-sm"
              >
                Exit to Home
              </Button>
          )}
        </div>
      </div>
    </nav>
  );
};