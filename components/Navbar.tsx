
import React from 'react';
import { Rocket, PenTool, Shield, LogOut, User } from 'lucide-react';
import { Button } from './Button';
import { UserProfile } from '../types';
import { ADMIN_EMAILS } from '../constants';
import { signInWithGoogle, signOut } from '../services/authService';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user: UserProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, user }) => {
  
  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

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
          <button onClick={() => onNavigate('contribute')} className={`${currentPage === 'contribute' ? 'text-white' : 'hover:text-white'} flex items-center gap-1 transition-colors`}>
            <PenTool size={14} /> Contribute
          </button>
          
          <a href="#services" className="hover:text-white transition-colors">Coaching</a>
          <a href="#shop" className="hover:text-white transition-colors">Shop</a>
          
          {isAdmin && (
            <button onClick={() => onNavigate('admin')} className={`${currentPage === 'admin' ? 'text-indigo-300' : 'text-indigo-400 hover:text-indigo-300'} flex items-center gap-1 transition-colors`}>
              <Shield size={14} /> Admin
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
             <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                   <span className="text-xs font-medium text-white">{user.name}</span>
                   <span className="text-[10px] text-slate-500">Free Tier</span>
                </div>
                <div className="relative group">
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-full border border-slate-600 cursor-pointer"
                  />
                  {/* Dropdown for Sign Out */}
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button 
                      onClick={handleSignOut}
                      className="bg-dark-800 border border-white/10 text-slate-300 text-xs px-4 py-2 rounded-lg shadow-xl whitespace-nowrap hover:bg-dark-700 flex items-center gap-2"
                    >
                      <LogOut size={12} /> Sign Out
                    </button>
                  </div>
                </div>
                {currentPage === 'app' ? (
                   <Button 
                    variant="secondary" 
                    onClick={() => onNavigate('landing')}
                    className="!py-2 !px-3 !text-xs hidden sm:flex"
                  >
                    Exit
                  </Button>
                ) : (
                   <Button 
                    variant="primary" 
                    onClick={() => onNavigate('app')}
                    className="!py-2 !px-4 !text-sm hidden sm:flex"
                  >
                    Launch <Rocket size={14} />
                  </Button>
                )}
             </div>
          ) : (
            <>
              <button 
                onClick={signInWithGoogle}
                className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-2 text-sm"
              >
                <User size={16} /> Sign In
              </button>
              <Button 
                variant="primary" 
                onClick={() => onNavigate('app')}
                className="!py-2 !px-4 !text-sm"
              >
                Launch PrepMaster
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
