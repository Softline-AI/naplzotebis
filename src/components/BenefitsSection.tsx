import React from 'react';

const BenefitsSection = () => {
  return (
    <section id="benefits" className="bg-black py-24 px-4 md:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            Benefits of <span className="text-white">AI Agents</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-medium">
            Discover the difference.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="card">
            {/* Header */}
            <div className="grid grid-cols-3 gap-8 p-6 border-b border-zinc-700 bg-zinc-900/50">
              <div className="col-span-1"></div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-zinc-400">Smart Contracts</h3>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">AI Agents</h3>
              </div>
            </div>
            
            {/* Comparison rows */}
            {[
              {
                feature: 'Available Data',
                smartContract: 'Limited to on-chain and oracles',
                aiAgent: 'Unlimited'
              },
              {
                feature: 'Execution Logic',
                smartContract: 'Static',
                aiAgent: 'Dynamic (learning over time)'
              },
              {
                feature: 'Execution Resources',
                smartContract: 'Limited by gas price',
                aiAgent: 'Unlimited'
              },
              {
                feature: 'Autonomous Execution',
                smartContract: false,
                aiAgent: true
              },
              {
                feature: 'Cross-Chain',
                smartContract: false,
                aiAgent: true
              },
              {
                feature: 'Continuous Learning',
                smartContract: false,
                aiAgent: true
              }
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-3 gap-8 p-6 border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-all">
                <div className="text-white text-lg font-semibold">{row.feature}</div>
                <div className="text-center">
                  {typeof row.smartContract === 'boolean' ? (
                    row.smartContract ? (
                      <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 mx-auto text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )
                  ) : (
                    <span className="text-zinc-400 font-medium">{row.smartContract}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof row.aiAgent === 'boolean' ? (
                    row.aiAgent ? (
                      <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 mx-auto text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )
                  ) : (
                    <span className="text-white font-semibold">{row.aiAgent}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;