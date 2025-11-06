import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/30 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/3 rounded-full blur-[60px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/3 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 w-10 h-10 bg-white/10 rounded-lg blur-lg animate-pulse"></div>
                <img 
                  src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                  alt="Softline AI" 
                  className="relative z-10 w-10 h-10 object-contain opacity-90 filter brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" 
                />
              </div>
              <h3 className="font-brand text-xl text-white tracking-[0.15em] font-black">SOFTLINE</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Advanced AI-powered trading platform for the next generation of DeFi. 
              Empowering traders with intelligent automation and cutting-edge blockchain technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="/#about" className="text-gray-400 hover:text-white transition-colors text-sm">About</a></li>
              <li><a href="/#agents" className="text-gray-400 hover:text-white transition-colors text-sm">AI Agents</a></li>
              <li><a href="/#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="/#docs" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://x.com/SoftlinePy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/SoftlinePy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Softline-AI/Softline/blob/main/README.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Softline AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;