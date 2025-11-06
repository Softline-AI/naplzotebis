import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Settings, RefreshCw, Zap, TrendingUp, AlertCircle, CheckCircle, Clock, ExternalLink, Copy, Wallet } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
  balance?: number;
  price?: number;
}

interface SwapPanelProps {
  onSwap?: (fromToken: Token, toToken: Token, amount: number) => void;
  onTransfer?: (token: Token, amount: number, recipient: string) => void;
}

const SwapPanel: React.FC<SwapPanelProps> = ({ onSwap, onTransfer }) => {
  const [mode, setMode] = useState<'swap' | 'transfer'>('swap');
  const [fromToken, setFromToken] = useState<Token>({
    symbol: 'SOL',
    name: 'Solana',
    address: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    balance: 45.2,
    price: 98.45
  });
  const [toToken, setToToken] = useState<Token>({
    symbol: 'USDC',
    name: 'USD Coin',
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    balance: 3200.00,
    price: 1.00
  });
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [priceImpact, setPriceImpact] = useState<number>(0);
  const [route, setRoute] = useState<string[]>(['Raydium', 'Orca']);
  const [estimatedFee, setEstimatedFee] = useState<number>(0.000005);

  const popularTokens: Token[] = [
    {
      symbol: 'SOL',
      name: 'Solana',
      address: 'So11111111111111111111111111111111111111112',
      decimals: 9,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      balance: 45.2,
      price: 98.45
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
      balance: 3200.00,
      price: 1.00
    },
    {
      symbol: 'BONK',
      name: 'Bonk',
      address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      decimals: 5,
      logoURI: 'https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I',
      balance: 2500000,
      price: 0.00001
    },
    {
      symbol: 'JUP',
      name: 'Jupiter',
      address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      decimals: 6,
      logoURI: 'https://static.jup.ag/jup/icon.png',
      balance: 150,
      price: 1.20
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png',
      balance: 85,
      price: 15.00
    }
  ];

  // Calculate swap amounts
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount)) && mode === 'swap') {
      const amount = parseFloat(fromAmount);
      const fromPrice = fromToken.price || 0;
      const toPrice = toToken.price || 1;
      const calculatedAmount = (amount * fromPrice) / toPrice;
      const slippageAmount = calculatedAmount * (1 - slippage / 100);
      setToAmount(slippageAmount.toFixed(6));
      
      // Calculate price impact (mock)
      const impact = Math.min((amount / 1000) * 0.1, 5);
      setPriceImpact(impact);
    }
  }, [fromAmount, fromToken, toToken, slippage, mode]);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount('');
  };

  const handleMaxAmount = () => {
    if (fromToken.balance) {
      setFromAmount(fromToken.balance.toString());
    }
  };

  const handleExecute = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (mode === 'swap' && onSwap) {
        onSwap(fromToken, toToken, parseFloat(fromAmount));
      } else if (mode === 'transfer' && onTransfer) {
        onTransfer(fromToken, parseFloat(fromAmount), recipient);
      }
      
      // Reset form
      setFromAmount('');
      setToAmount('');
      setRecipient('');
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidTransaction = () => {
    if (mode === 'swap') {
      return fromAmount && parseFloat(fromAmount) > 0 && parseFloat(fromAmount) <= (fromToken.balance || 0);
    } else {
      return fromAmount && parseFloat(fromAmount) > 0 && recipient.length > 32 && parseFloat(fromAmount) <= (fromToken.balance || 0);
    }
  };

  const formatBalance = (balance: number, decimals: number = 6) => {
    if (balance >= 1000000) {
      return `${(balance / 1000000).toFixed(2)}M`;
    } else if (balance >= 1000) {
      return `${(balance / 1000).toFixed(2)}K`;
    }
    return balance.toFixed(decimals);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-2xl p-6 shadow-2xl max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Softline Exchange</h2>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-300"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Mode Toggle */}
      <div className="flex bg-gray-800/50 rounded-lg p-1 mb-6">
        <button
          onClick={() => setMode('swap')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-300 ${
            mode === 'swap'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Swap
        </button>
        <button
          onClick={() => setMode('transfer')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-300 ${
            mode === 'transfer'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Transfer
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">Slippage Tolerance</span>
            <span className="text-blue-400 font-semibold">{slippage}%</span>
          </div>
          <div className="flex gap-2">
            {[0.1, 0.5, 1.0, 3.0].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  slippage === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>
      )}

      {/* From Token */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 mb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm">From</span>
          <span className="text-gray-400 text-sm">
            Balance: {formatBalance(fromToken.balance || 0)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2 min-w-0">
            <img src={fromToken.logoURI} alt={fromToken.symbol} className="w-6 h-6 rounded-full" />
            <span className="text-white font-semibold">{fromToken.symbol}</span>
          </div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="w-full bg-transparent text-white text-xl font-semibold text-right placeholder-gray-500 focus:outline-none"
            />
            <div className="text-right text-gray-400 text-sm mt-1">
              ${fromAmount ? (parseFloat(fromAmount) * (fromToken.price || 0)).toFixed(2) : '0.00'}
            </div>
          </div>
          <button
            onClick={handleMaxAmount}
            className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs font-semibold rounded hover:bg-blue-600/30 transition-colors"
          >
            MAX
          </button>
        </div>
      </div>

      {/* Swap Button */}
      {mode === 'swap' && (
        <div className="flex justify-center -my-1 relative z-10">
          <button
            onClick={handleSwapTokens}
            className="p-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110"
          >
            <ArrowUpDown className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      )}

      {/* To Token / Recipient */}
      {mode === 'swap' ? (
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm">To</span>
            <span className="text-gray-400 text-sm">
              Balance: {formatBalance(toToken.balance || 0)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2 min-w-0">
              <img src={toToken.logoURI} alt={toToken.symbol} className="w-6 h-6 rounded-full" />
              <span className="text-white font-semibold">{toToken.symbol}</span>
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="0.00"
                value={toAmount}
                readOnly
                className="w-full bg-transparent text-white text-xl font-semibold text-right placeholder-gray-500 focus:outline-none"
              />
              <div className="text-right text-gray-400 text-sm mt-1">
                ${toAmount ? (parseFloat(toAmount) * (toToken.price || 0)).toFixed(2) : '0.00'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm">Recipient Address</span>
          </div>
          <input
            type="text"
            placeholder="Enter Solana address..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none font-mono text-sm"
          />
        </div>
      )}

      {/* Route Info (Swap only) */}
      {mode === 'swap' && fromAmount && toAmount && (
        <div className="bg-gray-800/20 border border-gray-700/50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Route</span>
            <div className="flex items-center gap-1">
              {route.map((dex, index) => (
                <React.Fragment key={dex}>
                  <span className="text-blue-400 font-medium">{dex}</span>
                  {index < route.length - 1 && <span className="text-gray-500">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Price Impact</span>
            <span className={`font-medium ${priceImpact > 1 ? 'text-yellow-400' : 'text-green-400'}`}>
              {priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Network Fee</span>
            <span className="text-white font-medium">{estimatedFee} SOL</span>
          </div>
        </div>
      )}

      {/* Execute Button */}
      <button
        onClick={handleExecute}
        disabled={!isValidTransaction() || isLoading}
        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
          isValidTransaction() && !isLoading
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            {mode === 'swap' ? 'Swapping...' : 'Sending...'}
          </div>
        ) : (
          mode === 'swap' ? 'Swap Tokens' : 'Send Tokens'
        )}
      </button>

      {/* Powered by */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
        <span>Powered by</span>
        <div className="flex items-center gap-1">
          <img 
            src="https://i.ibb.co/Z61x2BSq/avatar.png" 
            alt="Softline" 
            className="w-4 h-4 object-contain opacity-70"
          />
          <span className="font-semibold">Softline AI</span>
        </div>
      </div>
    </div>
  );
};

export default SwapPanel;