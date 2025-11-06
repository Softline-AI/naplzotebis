import React from 'react';
import { useState } from 'react';
import { usePrivyWallet } from '../contexts/PrivyWalletContext';
import { Mail, Wallet, LogOut, Loader2, ExternalLink, X, RefreshCw, AlertCircle, CheckCircle, Wifi, WifiOff, Copy, Eye, EyeOff } from 'lucide-react';

const PrivyAuthButton: React.FC = () => {
  const { 
    authenticated, 
    ready,
    user, 
    login, 
    logout, 
    connected, 
    publicKey, 
    walletType, 
    balance, 
    connecting, 
    connectWallet,
    wallets,
    activeWallet,
    refreshBalance,
    switchNetwork,
    walletInfo
  } = usePrivyWallet();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [connectionStep, setConnectionStep] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
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

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    try {
      await refreshBalance();
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleConnectWallet = async () => {
    setConnectionStep('connecting');
    setErrorMessage('');
    
    try {
      await connectWallet();
      setConnectionStep('success');
      setTimeout(() => setConnectionStep('idle'), 3000);
    } catch (error) {
      setConnectionStep('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to connect wallet');
      console.error('Wallet connection error:', error);
      setTimeout(() => setConnectionStep('idle'), 5000);
    }
  };

  const getConnectionStepContent = () => {
    switch (connectionStep) {
      case 'connecting':
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          text: 'Connecting...',
          color: 'text-blue-400'
        };
      case 'success':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'Connected!',
          color: 'text-green-400'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          text: 'Connection failed',
          color: 'text-red-400'
        };
      default:
        return {
          icon: <Wallet className="w-4 h-4" />,
          text: 'Connect Wallet',
          color: 'text-white'
        };
    }
  };

  // Show loading while Privy is initializing
  if (!ready) {
    return (
      <div className="bg-gray-800/50 text-gray-400 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 text-sm border border-gray-700">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Initializing Softline...</span>
      </div>
    );
  }

  // If not authenticated, show login button
  if (!authenticated) {
    return (
      <button
        onClick={() => {
          console.log('Login button clicked');
          try {
            login();
          } catch (error) {
            console.error('Login failed:', error);
          }
        }}
        className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 text-sm shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <span className="relative z-10 font-bold">Sign In</span>
        <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    );
  }

  // If authenticated but no wallet connected
  if (authenticated && !connected) {
    return (
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="bg-green-900/30 border border-green-500/30 rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <div className="flex flex-col">
                <span className="text-green-300 text-sm font-medium">
                  Authenticated
                </span>
                <span className="text-gray-400 text-xs">
                  {user?.email?.address || 'Ready to connect'}
                </span>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-xs">No wallet</span>
            </div>
          </div>
          
          <button
            onClick={handleConnectWallet}
            disabled={connecting || connectionStep === 'connecting' || wallets.length === 0}
            className={`font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm shadow-lg hover:translate-y-[-2px] group relative border ${
              connectionStep === 'error' 
                ? 'bg-red-600/20 border-red-500/50 text-red-300 hover:bg-red-600/30' 
                : connectionStep === 'success'
                ? 'bg-green-600/20 border-green-500/50 text-green-300'
                : 'bg-blue-600 hover:bg-blue-700 border-blue-500 text-white'
            } ${connecting || connectionStep === 'connecting' || wallets.length === 0 ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {getConnectionStepContent().icon}
            <span>{wallets.length === 0 ? 'No Wallets Found' : getConnectionStepContent().text}</span>
            {wallets.length > 0 && connectionStep === 'idle' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </button>
        </div>
        
        {/* Error Message */}
        {connectionStep === 'error' && errorMessage && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-red-900/30 border border-red-500/30 rounded-lg p-3 text-sm text-red-300 shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
        
        {/* Success Message */}
        {connectionStep === 'success' && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-green-900/30 border border-green-500/30 rounded-lg p-3 text-sm text-green-300 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>Wallet connected successfully!</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If authenticated and wallet connected
  if (authenticated && connected && publicKey) {
    const getWalletIcon = (type: string) => {
      switch (type) {
        case 'phantom':
          return '👻';
        case 'metamask':
          return '🦊';
        case 'coinbase_wallet':
          return '🔵';
        case 'wallet_connect':
          return '🔗';
        case 'rainbow':
          return '🌈';
        default:
          return '💼';
      }
    };

    return (
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFullAddress(!showFullAddress)}
                  className="text-green-300 text-sm font-mono hover:text-green-200 transition-colors flex items-center gap-1"
                  title="Click to toggle full address"
                >
                  {showFullAddress ? publicKey : formatAddress(publicKey)}
                  {showFullAddress ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
                
                <button
                  onClick={() => copyToClipboard(publicKey)}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded"
                  title="Copy address"
                >
                  {copied ? <CheckCircle className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
                
                <div className="flex items-center gap-1 text-gray-400 text-xs capitalize">
                  <span>{getWalletIcon(walletType || '')}</span>
                  <span>{walletType?.replace('_', ' ')}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="text-gray-400">
                  {user?.email?.address || 'Verified'}
                </span>
                
                {balance.sol && (
                  <span className="text-white font-mono bg-gray-800/50 px-2 py-1 rounded border border-gray-600">
                    {balance.sol} SOL
                  </span>
                )}
                {balance.eth && (
                  <span className="text-white font-mono bg-gray-800/50 px-2 py-1 rounded border border-gray-600">
                    {balance.eth} ETH
                  </span>
                )}
                
                <button
                  onClick={handleRefreshBalance}
                  disabled={isRefreshing}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded"
                  title="Refresh balance"
                >
                  <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Network Status */}
          {walletInfo && (
            <div className="flex items-center gap-2 bg-gray-800/30 border border-gray-700 rounded-lg px-3 py-2">
              <div className={`w-2 h-2 rounded-full ${
                walletInfo.isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              }`}></div>
              <span className="text-xs text-gray-400 capitalize">
                {walletInfo.network}
              </span>
              <span className="text-xs text-gray-500">
                {walletInfo.isConnected ? 'Online' : 'Offline'}
              </span>
            </div>
          )}
          
          <button
            onClick={logout}
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 hover:bg-zinc-800/30 px-3 py-2 rounded-lg group border border-transparent hover:border-zinc-700"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
        
        {/* Copy Success Message */}
        {copied && (
          <div className="absolute top-full left-0 mt-2 bg-green-900/30 border border-green-500/30 rounded-lg p-2 text-xs text-green-300 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3" />
              <span>Address copied to clipboard!</span>
            </div>
          </div>
        )}
        
        {/* Balance Refresh Success */}
        {isRefreshing && (
          <div className="absolute top-full right-0 mt-2 bg-blue-900/30 border border-blue-500/30 rounded-lg p-2 text-xs text-blue-300 shadow-lg">
            <div className="flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Refreshing balance...</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default PrivyAuthButton;