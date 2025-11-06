import React from 'react';
import { usePrivyWallet } from '../contexts/PrivyWalletContext';

const LaunchPage = () => {
  const { authenticated, ready, login, user, connected } = usePrivyWallet();
  const [showWelcomeCard, setShowWelcomeCard] = React.useState(false);

  const handleGetStarted = () => {
    if (!authenticated) {
      login();
    } else {
      setShowWelcomeCard(true);
    }
  };

  // Show welcome card after authentication
  React.useEffect(() => {
    if (ready && authenticated && !showWelcomeCard) {
      setShowWelcomeCard(true);
    }
  }, [authenticated, ready, showWelcomeCard]);

  const handleEnterSoftline = () => {
    window.location.href = '/#agents';
  };

  // Show loading while Privy initializes
  if (!ready) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Softline...</h2>
          <p className="text-gray-400">Initializing secure connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[-25%] w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[-50%] right-1/3 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {!showWelcomeCard ? (
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-2xl mx-auto">
            {/* Logo with enhanced glow effect */}
            <div className="mb-12">
              <div className="relative inline-block">
                {/* Multiple glow layers for enhanced effect */}
                <div className="absolute inset-0 w-32 h-32 bg-white/20 rounded-2xl blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-2xl blur-xl"></div>
                <div className="absolute inset-0 w-32 h-32 bg-gradient-radial from-white/15 via-white/5 to-transparent rounded-2xl"></div>
                
                {/* Tech corners */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/40 rounded-tl-xl opacity-80"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/40 rounded-tr-xl opacity-80"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white/40 rounded-bl-xl opacity-80"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/40 rounded-br-xl opacity-80"></div>
                
                <img 
                  src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                  alt="Softline Logo" 
                  className="relative z-10 w-32 h-32 object-contain opacity-95 filter brightness-125 contrast-115 saturate-110 drop-shadow-[0_0_40px_rgba(255,255,255,0.8)] hover:opacity-100 hover:drop-shadow-[0_0_60px_rgba(255,255,255,1)] transition-all duration-700 animate-float" 
                />
              </div>
            </div>

            {/* Brand name */}
            <div className="mb-8">
              <h1 className="font-brand text-5xl md:text-6xl text-white tracking-[0.3em] font-black mb-4">
                SOFTLINE
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-60"></div>
            </div>

            {/* Main heading */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-8 leading-tight">
              The Hub of<br />
              <span className="text-gradient-white">Decentralized AI Agents</span>
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
              Join the future of autonomous AI. Create, deploy, and manage intelligent agents 
              that operate 24/7 across decentralized networks.
            </p>

            {/* Registration prompt */}
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8 mb-10 shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {authenticated ? 'Welcome Back!' : 'Sign In to Continue'}
              </h3>
              
              <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                {authenticated 
                  ? `Hello ${user?.email?.address || 'User'}! You're authenticated and ready to explore AI agents.`
                  : 'Sign in to your account to access powerful AI agents, build custom automations, and join our decentralized ecosystem.'
                }
              </p>

              {!authenticated && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
                  <div className="flex items-center gap-3 text-zinc-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Free to start</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>3 AI agents included</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>No credit card required</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action button */}
            <button
              onClick={handleGetStarted}
              className="bg-white text-black hover:bg-gray-100 font-bold text-lg px-12 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 transform inline-flex items-center gap-3 group"
            >
              <span>{authenticated ? 'Continue' : 'Sign In'}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Additional info */}
            <div className="mt-12 text-center">
              <p className="text-zinc-500 text-sm mb-4">
                Trusted by developers worldwide • SOC2 compliant • 99.9% uptime
              </p>
              <div className="flex items-center justify-center gap-8 text-zinc-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs">1,247+ Active Agents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-xs">65K+ TPS Capability</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-xs">Multi-chain Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Welcome Card after authentication */
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-12 max-w-lg w-full text-center shadow-2xl">
            {/* Logo */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-xl blur-lg animate-pulse"></div>
                <img 
                  src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                  alt="Softline Logo" 
                  className="relative z-10 w-20 h-20 object-contain opacity-90 filter brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" 
                />
              </div>
            </div>
            
            {/* Welcome message */}
            <h2 className="text-3xl font-bold text-white mb-6">Welcome to Softline!</h2>
            
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-300 text-sm font-semibold">BETA VERSION</span>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                You're now part of our exclusive beta program! Experience the future of decentralized AI agents with cutting-edge features and early access to new capabilities.
              </p>
              
              <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-2">Signed in as:</p>
                <div className="flex items-center justify-center gap-3">
                  <img 
                    src="https://i.postimg.cc/wThS9PL4/dws.jpg" 
                    alt="User Avatar" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-white font-medium">{user?.email?.address || 'User'}</p>
                </div>
              </div>
            </div>
            
            {/* Features list */}
            <div className="grid grid-cols-1 gap-3 mb-8 text-sm">
              <div className="flex items-center gap-3 text-zinc-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Access to AI Agent Builder</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Real-time Analytics Dashboard</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Multi-chain Agent Deployment</span>
              </div>
            </div>
            
            {/* Enter button */}
            <button 
              onClick={handleEnterSoftline}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 transform inline-flex items-center gap-3 group w-full justify-center"
            >
              <span>Enter AI Agent Hub</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchPage;