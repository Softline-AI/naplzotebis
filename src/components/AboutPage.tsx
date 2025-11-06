import React from 'react';
import { ArrowLeft, Users, Target, Zap, Globe, Shield, Code } from 'lucide-react';

const AboutPage = () => {
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
              <div className="relative">
                <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-2xl blur-lg animate-pulse"></div>
                <img 
                  src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                  alt="Softline Logo" 
                  className="relative z-10 w-20 h-20 object-contain opacity-90 filter brightness-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" 
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Softline
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're building the future of decentralized AI agents, empowering developers to create 
              autonomous, intelligent applications that operate across blockchain networks.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Softline is revolutionizing the Web3 ecosystem by providing the infrastructure 
                for truly autonomous AI agents. We believe that the future of decentralized 
                applications lies in intelligent systems that can operate independently, 
                make decisions, and adapt to changing conditions.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our platform bridges the gap between artificial intelligence and blockchain 
                technology, enabling developers to create sophisticated agents that can 
                interact with smart contracts, analyze market data, and execute complex 
                strategies without human intervention.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/30">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">1,247+</div>
                    <div className="text-gray-400">Active Agents</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">65K+</div>
                    <div className="text-gray-400">TPS Capability</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                    <div className="text-gray-400">Uptime</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="text-gray-400">Autonomous Operation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Security First</h3>
                <p className="text-gray-400">
                  We prioritize the security of user funds and data with enterprise-grade 
                  encryption and decentralized architecture.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Developer Experience</h3>
                <p className="text-gray-400">
                  We build tools that developers love to use, with comprehensive documentation 
                  and intuitive APIs.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Decentralization</h3>
                <p className="text-gray-400">
                  We believe in a decentralized future where no single entity controls 
                  the infrastructure of the internet.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AK</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Alex Kim</h3>
                <p className="text-blue-400 mb-4">CEO & Co-Founder</p>
                <p className="text-gray-400 text-sm">
                  Former AI researcher at Google DeepMind with 10+ years in blockchain technology.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SM</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sarah Martinez</h3>
                <p className="text-green-400 mb-4">CTO & Co-Founder</p>
                <p className="text-gray-400 text-sm">
                  Blockchain architect with experience building scalable DeFi protocols on Solana.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DJ</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">David Johnson</h3>
                <p className="text-purple-400 mb-4">Head of AI Research</p>
                <p className="text-gray-400 text-sm">
                  PhD in Machine Learning from MIT, specializing in autonomous agent systems.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Technology</h2>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 border border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Built for Scale</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-yellow-400" />
                      <span className="text-gray-300">High-performance Rust infrastructure</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-6 h-6 text-blue-400" />
                      <span className="text-gray-300">Multi-chain compatibility</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-green-400" />
                      <span className="text-gray-300">Enterprise-grade security</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="w-6 h-6 text-purple-400" />
                      <span className="text-gray-300">Sub-second transaction finality</span>
                    </div>
                  </div>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-gray-600">
                  <pre className="text-green-400 text-sm font-mono">
{`// Softline Agent Example
const agent = new SoftlineAgent({
  name: "TradingBot",
  blockchain: "solana",
  capabilities: [
    "market_analysis",
    "risk_management",
    "automated_trading"
  ]
});

await agent.deploy();
console.log("Agent deployed successfully!");`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-12 border border-blue-500/30">
              <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Have questions about Softline? Want to partner with us? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://x.com/SoftlinePy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span>Contact Us</span>
                  <Users className="w-4 h-4" />
                </a>
                <a 
                  href="https://t.me/SoftlinePy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span>Join Community</span>
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;