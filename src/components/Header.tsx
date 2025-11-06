import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import PrivyAuthButton from './PrivyAuthButton';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/90 backdrop-blur-sm py-3 md:py-4">
      <div className="container mx-auto px-3 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <a className="logo-container" href="/">
            <div className="flex items-center gap-4">
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 w-8 h-8 md:w-12 md:h-12 bg-white/5 rounded-lg blur-md animate-pulse"></div>
                <div className="absolute inset-0 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
                <img 
                  src="https://i.ibb.co/Z61x2BSq/avatar.png"
                  alt="Softline Logo" 
                  className="relative z-10 w-8 h-8 md:w-12 md:h-12 object-contain opacity-90 filter brightness-110 contrast-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:opacity-100 hover:drop-shadow-[0_0_30px_rgba(255,255,255,1)] transition-all duration-500" 
                />
              </div>
              <span className="font-brand text-lg md:text-2xl text-white tracking-[0.2em] font-black">SOFTLINE</span>
            </div>
          </a>
          <div className="hidden lg:flex items-center space-x-8">
            <a 
              className="text-zinc-300 hover:text-white transition-colors text-sm font-semibold" 
              href="/#agents"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#agents';
              }}
            >
              My Agents
            </a>
            <a 
              className="text-zinc-300 hover:text-white transition-colors text-sm font-semibold" 
              href="/#chatbot"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#chatbot';
              }}
            >
              AI Chat
            </a>
            <a 
              className="text-zinc-300 hover:text-white transition-colors text-sm font-semibold" 
              href="/#ca"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#ca';
              }}
            >
              CA
            </a>
            <a 
              className="text-zinc-300 hover:text-white transition-colors text-sm font-semibold" 
              href="/#docs"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#docs';
              }}
            >
              Docs
            </a>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <PrivyAuthButton />
        </div>
        <button 
          className="sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-zinc-800">
          <div className="px-4 py-6 space-y-4">
            <a 
              href="/#agents" 
              className="block text-white hover:text-zinc-400 font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                window.location.href = '/#agents';
              }}
            >
              My Agents
            </a>
            <a 
              href="/#chatbot" 
              className="block text-white hover:text-zinc-400 font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                window.location.href = '/#chatbot';
              }}
            >
              AI Chat
            </a>
            <a 
              href="/#ca" 
              className="block text-white hover:text-zinc-400 font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                window.location.href = '/#ca';
              }}
            >
              CA
            </a>
            <a 
              href="/#docs" 
              className="block text-white hover:text-zinc-400 font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                window.location.href = '/#docs';
              }}
            >
              Docs
            </a>
            <div className="pt-4">
              <div className="flex justify-center">
                <PrivyAuthButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;