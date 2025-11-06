import React from 'react';

const JoinFutureSection = () => {
  return (
    <section className="bg-black py-24 px-4 md:px-6 lg:px-8 relative">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-white/5 to-transparent opacity-30 blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
            Join the future of Web3<br />
            with <span className="text-white">Softline</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-6 font-medium">
            Softline is designed with app creators in mind.
          </p>
          <p className="text-xl text-zinc-400 mb-12 font-medium">
            Start building now on world's fastest infrastructure for AI Agents.
          </p>
          <div className="flex justify-center">
            <a
              href="https://softline.gitbook.io/softline"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
            >
              Check our Docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinFutureSection;