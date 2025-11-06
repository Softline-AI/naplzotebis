import React from 'react';
import { usePrivyWallet } from '../contexts/PrivyWalletContext';
import PrivyAuthButton from './PrivyAuthButton';

const Hero = () => {
  const { authenticated, connected, ready } = usePrivyWallet();

  return (
    <section className="bg-black min-h-screen pt-0 pb-0 relative overflow-hidden">
      {/* Full-width video background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.prod.website-files.com/65ae784a453a960b1a7ee1d4/65ae951343b427138c1be625_Video_2024-01-22_163831-transcode.mp4" type="video/mp4" />
          <source src="https://cdn.prod.website-files.com/65ae784a453a960b1a7ee1d4/65ae951343b427138c1be625_Video_2024-01-22_163831-transcode.webm" type="video/webm" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-0">
          <div className="max-w-5xl text-center mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-6 md:mb-8">
              The Future of<br />
              <span className="text-white">
                Softline
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-zinc-300 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              Decentralized AI agents platform for modern developers. 
              Built with cutting-edge technology and enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
              {ready && authenticated && connected ? (
                <button 
                  onClick={() => {
                    console.log('Launch AI Agents clicked');
                    window.location.href = '/#agents';
                  }}
                  className="btn-primary text-base md:text-lg px-8 md:px-10 py-3 md:py-4 font-semibold"
                >
                  Launch AI Agents
                </button>
              ) : ready ? (
                <PrivyAuthButton />
              ) : (
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-6 h-6 border-2 border-zinc-400/30 border-t-zinc-400 rounded-full animate-spin"></div>
                  Loading Softline...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-zinc-400/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-zinc-400/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;