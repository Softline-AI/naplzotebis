import React from 'react';

const BeyondSection = () => {
  return (
    <section id="beyond" className="bg-black py-24 px-4 md:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative flex items-center justify-center">
              <img 
                src="https://i.postimg.cc/Jzsvm2wX/photo-2025-06-05-21-28-25.jpg" 
                alt="Smart Contracts Evolution" 
                className="w-full h-auto object-contain"
                style={{ imageRendering: 'auto' }}
              />
            </div>
          </div>
          <div className="max-w-2xl order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="https://i.postimg.cc/yW8CCmc8/image.png" 
                alt="Beyond the Limitations" 
                className="w-12 h-12 object-contain" 
              />
              <h3 className="text-lg font-semibold text-white">Beyond the Limitations</h3>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight">
              Smart Contracts<br />
              <span className="text-white">
                Evolved
              </span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-medium">
              AI Agents are the evolutionary next-step after smart contracts, enabling developers to create 
              fully reactive applications adapting to market conditions. Softline leverages Solana and 
              proprietary infrastructure to make AI agents autonomous, scalable, and decentralized.
            </p>
            <button 
              onClick={() => {
                window.location.href = '/#agents';
              }}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <span>Start Building</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondSection;