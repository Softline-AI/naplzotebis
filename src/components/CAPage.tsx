import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, ExternalLink, CheckCircle, AlertCircle, Shield, Code, Zap, Users, TrendingUp, Activity, DollarSign, Globe, Lock, Cpu, Database, Network, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { usePrivyWallet } from '../contexts/PrivyWalletContext';

const CAPage = () => {
  const { authenticated, ready, login } = usePrivyWallet();
  const [copied, setCopied] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock contract address - replace with real one
  const contractAddress = '7EpKy18C3tEraancgCYdSiLgXSBaaHQxjRyP2dPKpump';
  const tokenName = 'Softline Token';
  const tokenSymbol = 'SOFT';
  const network = 'Solana';

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleVerifyContract = async () => {
    setIsVerifying(true);
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsVerifying(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  // Show loading while Privy initializes
  if (!ready) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-gray-400">Initializing contract data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
      <div className="absolute top-1/4 left-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-float"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-gray-800/50 backdrop-blur-sm bg-black/30 sticky top-0 z-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={handleBackToHome}
                  className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Contract Address</h1>
                <p className="text-gray-400 text-sm">Softline Token (SOFT)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href={`https://solscan.io/token/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Explorer
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 w-20 h-20 bg-blue-500/20 rounded-2xl blur-lg animate-pulse"></div>
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Code className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contract Address
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Official Softline Token smart contract details and verification
            </p>
          </div>

          {/* Contract Info Card */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              {/* Token Info */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                      alt="Softline Token" 
                      className="w-10 h-10 object-contain filter brightness-110"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{tokenName}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-blue-400 font-semibold">${tokenSymbol}</span>
                      <span className="px-2 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-green-300 text-xs font-semibold">
                        {network}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contract Address */}
              <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Contract Address
                </h3>
                <div className="flex items-center justify-between bg-black/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex-1">
                    <button
                      onClick={() => setShowFullAddress(!showFullAddress)}
                      className="text-blue-400 hover:text-blue-300 font-mono text-sm transition-colors flex items-center gap-2"
                      title="Click to toggle full address"
                    >
                      {showFullAddress ? contractAddress : formatAddress(contractAddress)}
                      {showFullAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(contractAddress)}
                      className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-300"
                      title="Copy address"
                    >
                      {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`https://solscan.io/token/${contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-300"
                      title="View on Solscan"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Security Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Contract Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Liquidity Locked</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Ownership Renounced</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">No Mint Function</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Actions */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={handleVerifyContract}
                disabled={isVerifying}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Verify Contract
                  </>
                )}
              </button>

              <a
                href={`https://solscan.io/token/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Globe className="w-5 h-5" />
                View on Explorer
              </a>

              <button
                onClick={() => window.location.href = '/#agents'}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Cpu className="w-5 h-5" />
                Use with AI Agents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAPage;