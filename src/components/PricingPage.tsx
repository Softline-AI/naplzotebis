import React from 'react';
import { ArrowLeft, Check, Zap, Crown, Rocket } from 'lucide-react';

const PricingPage = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your AI agent needs. Start free and scale as you grow.
            </p>
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-500/30 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-sm font-semibold">Beta Pricing - 50% Off</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Starter Plan */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Starter</h3>
                  <p className="text-gray-400 text-sm">Perfect for beginners</p>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-green-400 text-sm mt-1">Free forever</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  '3 AI Agents',
                  '1,000 interactions/month',
                  'Basic templates',
                  'Community support',
                  'Solana integration'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => window.location.href = '/#launch'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border-2 border-purple-500/50 hover:border-purple-400/70 transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                  Most Popular
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Pro</h3>
                  <p className="text-gray-400 text-sm">For growing businesses</p>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-400 line-through text-2xl">$49</span>
                  <span className="text-4xl font-bold text-white">$24</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-purple-400 text-sm mt-1">Beta pricing - 50% off</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  '25 AI Agents',
                  '50,000 interactions/month',
                  'Advanced templates',
                  'Priority support',
                  'Multi-chain support',
                  'Custom training data',
                  'Analytics dashboard',
                  'API access'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => window.location.href = '/#launch'}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Enterprise</h3>
                  <p className="text-gray-400 text-sm">For large organizations</p>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
                <p className="text-orange-400 text-sm mt-1">Contact for pricing</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited AI Agents',
                  'Unlimited interactions',
                  'Custom integrations',
                  'Dedicated support',
                  'On-premise deployment',
                  'Custom AI models',
                  'Advanced security',
                  'SLA guarantee'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => window.open('mailto:enterprise@softline.io', '_blank')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Contact Sales
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">
                  What's included in the free plan?
                </h3>
                <p className="text-gray-400">
                  The free plan includes 3 AI agents, 1,000 interactions per month, basic templates, and community support. Perfect for getting started!
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Can I upgrade or downgrade anytime?
                </h3>
                <p className="text-gray-400">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and you'll be billed prorated.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-400">
                  We accept all major credit cards, PayPal, and cryptocurrency payments including SOL, ETH, and USDC.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Is there a setup fee?
                </h3>
                <p className="text-gray-400">
                  No setup fees, ever. You only pay for what you use. Start free and scale as your needs grow.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-12 border border-blue-500/30">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of developers building the future with AI agents on Softline
              </p>
              <button 
                onClick={() => window.location.href = '/#launch'}
                className="bg-white text-black hover:bg-gray-200 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 transform inline-flex items-center gap-3"
              >
                <span>Start Building Today</span>
                <Rocket className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;