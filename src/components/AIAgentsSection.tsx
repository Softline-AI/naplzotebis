import React from 'react';

const AIAgentsSection = () => {
  return (
    <section id="agents" className="bg-black py-24 px-4 md:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="badge mb-8">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>AI-Powered Solutions</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight">
            Decentralized AI Agents<br />
            <span className="text-white">
              at Your Fingertips
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed font-medium">
            Softline is a leading infrastructure hub for decentralized AI agents, providing 
            an environment where developers can create, deploy, and manage AI-driven 
            applications with high efficiency and low cost.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Agent Interface */}
          <div className="relative">
            <div className="relative flex items-center justify-center">
              <img 
                src="https://i.ibb.co/23R4BhRt/photo-2025-06-05-22-30-35.jpg" 
                alt="photo-2025-06-05-22-30-35"
                className="w-full h-auto object-contain"
                style={{ imageRendering: 'auto' }}
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="https://i.postimg.cc/y3cFbg14/crafted-for-builders.png" 
                alt="Crafted for Builders" 
                className="w-12 h-12 object-contain" 
              />
              <h3 className="text-lg font-semibold text-white">Crafted for Builders</h3>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight">
              Build the Future with AI
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-medium">
              Our platform empowers developers to create sophisticated AI agents that can operate 
              autonomously across various protocols and use cases. From DeFi automation to NFT trading, 
              the possibilities are endless.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AIAgentsSection;