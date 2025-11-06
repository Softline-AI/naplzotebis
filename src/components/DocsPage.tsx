import React from 'react';
import { ArrowLeft, Atom, Binary, Rocket, Fingerprint, Orbit, Crown, Github, Satellite, Scroll, ExternalLink } from 'lucide-react';

const DocsPage = () => {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
      <div className="absolute top-1/4 left-[-10%] w-64 h-64 bg-white/5 rounded-full blur-[80px] animate-float"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-gray-800/50 backdrop-blur-sm bg-black/30 sticky top-0 z-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 w-10 h-10 bg-white/8 rounded-lg blur-lg animate-pulse"></div>
                <img 
                  src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                  alt="Softline" 
                  className="relative z-10 w-10 h-10 object-contain opacity-85 filter brightness-115 contrast-105 drop-shadow-[0_0_25px_rgba(255,255,255,0.7)] transition-all duration-300" 
                />
              </div>
              <span className="font-brand text-lg text-white tracking-[0.15em] font-black">SOFTLINE</span>
            </div>
            
            <button 
              onClick={handleBackToHome}
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/30"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                <Atom className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Softline Documentation
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to build powerful AI agents on the decentralized web.
              Get started with our comprehensive guides and API references.
            </p>
          </div>

          {/* Quick Start Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Quick Start</h3>
              <p className="text-gray-400 mb-6">
                Get up and running with Softline in under 5 minutes. Create your first AI agent.
              </p>
              <a 
                href="https://softline.gitbook.io/softline/getting-started/quick-start"
                target="_blank"
                className="text-green-400 hover:text-green-300 font-medium flex items-center gap-2"
              >
                Start Building
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <Binary className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">API Reference</h3>
              <p className="text-gray-400 mb-6">
                Complete API documentation with examples for all Softline endpoints and SDKs.
              </p>
              <a 
                href="https://softline.gitbook.io/softline/api-reference"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2"
              >
                View API Docs
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Fingerprint className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Security Guide</h3>
              <p className="text-gray-400 mb-6">
                Learn best practices for securing your AI agents and handling sensitive data.
              </p>
              <a 
                href="https://softline.gitbook.io/softline/security"
                target="_blank"
                className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2"
              >
                Security Docs
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* SDK Examples */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">SDK Examples</h2>
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">TypeScript/JavaScript</h3>
                  <div className="bg-black rounded-lg p-4 border border-gray-600">
                    <pre className="text-sm text-green-400 font-mono overflow-x-auto">
{`import { Softline } from '@softline/sdk';

const softline = new Softline({
  apiKey: 'your-api-key'
});

const agent = await softline.createAgent({
  name: 'TradingBot',
  type: 'autonomous',
  capabilities: ['trading', 'analysis']
});

await agent.start();`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Python</h3>
                  <div className="bg-black rounded-lg p-4 border border-gray-600">
                    <pre className="text-sm text-blue-400 font-mono overflow-x-auto">
{`from softline import Softline

softline = Softline(api_key='your-api-key')

agent = await softline.create_agent(
    name='TradingBot',
    type='autonomous',
    capabilities=['trading', 'analysis']
)

await agent.start()`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Community Resources */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Community & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/30 border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/70 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-600/20 rounded-xl flex items-center justify-center">
                    <Github className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">GitHub</h3>
                <p className="text-gray-400 text-sm text-center mb-4">
                  Contribute to our open-source projects and report issues
                </p>
                <a 
                  href="https://github.com/softline-ai"
                  target="_blank"
                  className="block text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 font-medium text-sm transition-colors">
                    <span>View on GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </div>

              {/* Telegram */}
              <div className="bg-black/30 border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/70 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <Satellite className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">Telegram</h3>
                <p className="text-gray-400 text-sm text-center mb-4">
                  Join our community chat for real-time support
                </p>
                <a 
                  href="https://t.me/softline_ai"
                  target="_blank"
                  className="block text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                    <Crown className="w-4 h-4" />
                    <span>Join Chat</span>
                  </div>
                </a>
              </div>

              {/* Documentation */}
              <div className="bg-black/30 border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/70 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                    <Scroll className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">Full Docs</h3>
                <p className="text-gray-400 text-sm text-center mb-4">
                  Complete documentation with tutorials and guides
                </p>
                <a 
                  href="https://softline.gitbook.io/softline"
                  target="_blank"
                  className="block text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors">
                    <Orbit className="w-4 h-4" />
                    <span>Read Docs</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Getting Started CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-12 border border-blue-500/30">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Build?</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Start building your first AI agent today with our comprehensive documentation and tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/#launch'}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                >
                  Get Started
                </button>
                <a 
                  href="https://softline.gitbook.io/softline"
                  target="_blank"
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span>View Full Docs</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;