import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, History, Zap, Settings, MessageSquare, Sparkles, X, Copy, RefreshCw, Star, Heart, ThumbsUp, Download, Share2, Trash2, Edit3, MoreHorizontal, ChevronDown, ChevronUp, Search, Filter, SortDesc, Clock, TrendingUp, BarChart3, DollarSign, Shield, Target, Briefcase, Code, Database, Globe, Cpu, Brain, Lightbulb, Rocket, Crown, Award, CheckCircle, AlertCircle, Info, HelpCircle, ExternalLink, PlayCircle, PauseCircle, StopCircle, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw, Save, FileText, Image, Video, Mic, Camera, Paperclip, Smile, Hash, AtSign, Percent, Ampersand, Plus, Minus, Equal, Slash, Pipette as Pipe, Folder as Tilde, Car as Caret, UnderlineIcon as Underscore, Quote, Quote as DoubleQuote, Parentheses, Brackets, Braces, Brackets as AngleBrackets, FileQuestion as Question, Radiation as Exclamation, Percent as Period, Command as Comma, GemIcon as Semicolon, Cone as Colon, Trophy as Apostrophe, Grab as Grave, Route as Acute, Circle as Circumflex, Diameter as Diaeresis, BellRing as Ring, Pill as Cedilla, Bone as Ogonek, Strikethrough as Stroke, ScrollIcon as Macron, Move as Breve, Dot, CarFront as Caron, BedDouble as DoubleAcute, Clover as Inverted, Turtle as Turned, ALargeSmall as Small, Guitar as Capital, Subscript, Superscript, Option as Fraction, Infinity, Instagram as Integral, Sun as Sum, Projector as Product, FolderRoot as Root, Power, LogIn as Log, Pin as Sin, Cog as Cos, Ban as Tan, Album as Alpha, Bed as Beta, Drama as Gamma, Delete as Delta, PopsicleIcon as Epsilon, HandMetal as Zeta, Star as Eta, Sheet as Theta, Bot as Iota, Map as Kappa, Lamp as Lambda, Music as Mu, Nut as Nu, AArrowDown as Xi, MicrowaveIcon as Omicron, Pi, Ghost as Rho, Sigma, Tag as Tau, FileUpIcon as Upsilon, Ship as Phi, Ship as Chi, Music as Psi, Vegan as Omega, Coins } from 'lucide-react';
import { usePrivyWallet } from '../contexts/PrivyWalletContext';
import SwapPanel from './SwapPanel';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'code' | 'image' | 'file';
  metadata?: {
    tokens?: number;
    model?: string;
    confidence?: number;
    sources?: string[];
  };
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  created: Date;
  updated: Date;
  agent: string;
}

interface AIAgent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  specialty: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  isActive: boolean;
}

interface ChatSettings {
  selectedAgent: string;
  temperature: number;
  maxTokens: number;
  contextWindow: number;
  chatStyle: 'professional' | 'casual' | 'technical';
  responseLength: 'short' | 'medium' | 'detailed';
  streamingResponses: boolean;
  autoSave: boolean;
  showTimestamps: boolean;
  compactMode: boolean;
  syntaxHighlighting: boolean;
  mathRendering: boolean;
  soundEffects: boolean;
}

const ChatbotPage = () => {
  const { authenticated, ready, user } = usePrivyWallet();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeSection, setActiveSection] = useState<'chat' | 'history'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showConsole, setShowConsole] = useState(false);
  const [showJupiterWindow, setShowJupiterWindow] = useState(false);
  const [jupiterWindowMinimized, setJupiterWindowMinimized] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [tokens, setTokens] = useState(10000);
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    selectedAgent: 'crypto-trader',
    temperature: 0.7,
    maxTokens: 2000,
    contextWindow: 8000,
    chatStyle: 'professional',
    responseLength: 'medium',
    streamingResponses: true,
    autoSave: true,
    showTimestamps: true,
    compactMode: false,
    syntaxHighlighting: true,
    mathRendering: true,
    soundEffects: false
  });

  // AI Agents
  const aiAgents: AIAgent[] = [
    {
      id: 'crypto-trader',
      name: 'Crypto Trader',
      description: 'Expert in cryptocurrency trading with 5+ years experience',
      avatar: 'https://i.ibb.co/Z61x2BSq/avatar.png',
      specialty: 'Trading & DeFi',
      model: 'Softline AI',
      temperature: 0.7,
      maxTokens: 2048,
      systemPrompt: 'You are an expert cryptocurrency trader with deep knowledge of DeFi, technical analysis, and market trends.',
      isActive: true
    },
    {
      id: 'defi-expert',
      name: 'DeFi Expert',
      description: 'Specialized in decentralized finance protocols and yield farming',
      avatar: 'https://i.ibb.co/Z61x2BSq/avatar.png',
      specialty: 'DeFi & Protocols',
      model: 'Softline AI',
      temperature: 0.5,
      maxTokens: 2048,
      systemPrompt: 'You are a DeFi expert with comprehensive knowledge of protocols, yield farming, and liquidity provision.',
      isActive: true
    },
    {
      id: 'nft-analyst',
      name: 'NFT Analyst',
      description: 'NFT market analysis and collection evaluation specialist',
      avatar: 'https://i.ibb.co/Z61x2BSq/avatar.png',
      specialty: 'NFTs & Collections',
      model: 'Softline AI',
      temperature: 0.6,
      maxTokens: 2048,
      systemPrompt: 'You are an NFT market analyst with expertise in collection valuation and market trends.',
      isActive: true
    },
    {
      id: 'blockchain-dev',
      name: 'Blockchain Developer',
      description: 'Smart contract development and blockchain architecture',
      avatar: 'https://i.ibb.co/Z61x2BSq/avatar.png',
      specialty: 'Development',
      model: 'Softline AI',
      temperature: 0.3,
      maxTokens: 4096,
      systemPrompt: 'You are a blockchain developer expert in Solana, Ethereum, and smart contract development.',
      isActive: true
    }
  ];

  // Quick prompts
  const quickPrompts = [
    "What's the current market sentiment?",
    "Analyze SOL price action",
    "send 1 sol 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "Best DeFi yield opportunities",
    "Explain liquidity pools",
    "send 0.1 eth 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "Smart contract security tips",
    "NFT market trends today"
  ];

  useEffect(() => {
    if (aiAgents.length > 0) {
      const defaultAgent = aiAgents.find(agent => agent.id === chatSettings.selectedAgent) || aiAgents[0];
      setSelectedAgent(defaultAgent);
    }
  }, [chatSettings.selectedAgent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Transaction processing functions
  const parseTransactionCommand = (message: string) => {
    const sendRegex = /send\s+([\d.]+)\s+(sol|eth|usdc)\s+([a-zA-Z0-9]{32,44})/i;
    const match = message.match(sendRegex);
    
    if (match) {
      return {
        amount: parseFloat(match[1]),
        token: match[2].toUpperCase(),
        address: match[3]
      };
    }
    return null;
  };

  const processTransaction = async (amount: number, token: string, address: string) => {
    setIsProcessingTransaction(true);
    setShowConsole(true);
    setConsoleOutput([]);
    
    const addConsoleLog = (message: string) => {
      setConsoleOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    };

    try {
      addConsoleLog('🚀 Initializing Jupiter transaction...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addConsoleLog(`💰 Processing ${amount} ${token} to ${address.slice(0, 8)}...${address.slice(-8)}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addConsoleLog('🔍 Fetching best route from Jupiter...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addConsoleLog('📊 Route found: Direct swap via Jupiter');
      addConsoleLog(`💸 Estimated fee: 0.000005 SOL`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addConsoleLog('✍️ Signing transaction...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addConsoleLog('📡 Broadcasting to Solana network...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const txHash = `${Math.random().toString(36).substr(2, 9)}${Date.now().toString(36)}`;
      addConsoleLog(`✅ Transaction successful!`);
      addConsoleLog(`🔗 TX Hash: ${txHash}`);
      addConsoleLog(`🌐 View on Solscan: https://solscan.io/tx/${txHash}`);
      
      return txHash;
    } catch (error) {
      addConsoleLog(`❌ Transaction failed: ${error}`);
      throw error;
    } finally {
      setIsProcessingTransaction(false);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading || !selectedAgent) return;

    // Check if user has enough tokens
    if (tokens <= 0) {
      alert('У вас закончились токены! Пополните баланс для продолжения.');
      return;
    }

    // Check if message is a transaction command
    const transactionData = parseTransactionCommand(currentMessage);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);
    setIsTyping(true);
    
    // Check if user is asking for swap/trade functionality
    const swapKeywords = ['swap', 'trade', 'exchange', 'buy', 'sell', 'jupiter', 'обмен', 'торговля', 'купить', 'продать'];
    const isSwapRequest = swapKeywords.some(keyword => 
      currentMessage.toLowerCase().includes(keyword.toLowerCase())
    );

    if (transactionData) {
      // Handle transaction
      try {
        const txHash = await processTransaction(
          transactionData.amount,
          transactionData.token,
          transactionData.address
        );
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `✅ Transaction completed successfully!\n\n💰 Sent: ${transactionData.amount} ${transactionData.token}\n📍 To: ${transactionData.address.slice(0, 8)}...${transactionData.address.slice(-8)}\n🔗 TX Hash: ${txHash}\n\nTransaction processed via Jupiter aggregator with optimal routing.`,
          sender: 'ai',
          timestamp: new Date(),
          type: 'text',
          metadata: {
            tokens: 150,
            model: 'Softline AI',
            confidence: 0.95,
            sources: ['Jupiter', 'Solana RPC', 'Transaction Pool']
          }
        };
        
        setMessages(prev => [...prev, aiResponse]);
      } catch (error) {
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `❌ Transaction failed: ${error}\n\nPlease check your wallet balance and try again.`,
          sender: 'ai',
          timestamp: new Date(),
          type: 'text',
          metadata: {
            tokens: 50,
            model: 'Softline AI',
            confidence: 0.9,
            sources: ['Error Handler']
          }
        };
        
        setMessages(prev => [...prev, errorResponse]);
      }
      setIsLoading(false);
      setIsTyping(false);
    } else if (isSwapRequest) {
      // Show Jupiter window instead of regular message
      setShowJupiterWindow(true);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've opened the Jupiter swap interface for you. You can now trade tokens directly!",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      setIsTyping(false);
    } else {
      // Regular AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateAIResponse(currentMessage, selectedAgent),
          sender: 'ai',
          timestamp: new Date(),
          type: 'text',
          metadata: {
            tokens: Math.floor(Math.random() * 500) + 100,
            model: 'Softline AI',
            confidence: Math.random() * 0.3 + 0.7,
            sources: ['CoinGecko', 'DeFiPulse', 'Solana Beach']
          }
        };

        // Deduct tokens (10 tokens per message)
        setTokens(prev => Math.max(0, prev - 10));

        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1000);
    }
  };

  const generateAIResponse = (message: string, agent: AIAgent): string => {
    const responses = {
      'crypto-trader': [
        "Based on current market analysis, I'm seeing strong bullish momentum in SOL with key resistance at $98. The RSI indicates we're not yet overbought, suggesting potential for further upside. Consider DCA strategy with stop-loss at $85.",
        "The DeFi sector is showing renewed interest with TVL increasing 15% this week. Raydium and Orca are leading the charge on Solana. I'd recommend looking into ORCA/SOL LP positions for yield opportunities.",
        "Market sentiment has shifted to 'Greed' territory (Fear & Greed Index: 72). This typically signals caution for new positions. Consider taking some profits and waiting for a pullback to the $90-92 support zone."
      ],
      'defi-expert': [
        "The latest Solana DeFi protocols are offering impressive yields. Jupiter's new perpetuals platform is gaining traction with 0.05% fees. Marinade's liquid staking is also worth considering for passive SOL rewards.",
        "Yield farming opportunities are abundant right now. The SOL-USDC pool on Raydium is offering 12% APY, while Orca's concentrated liquidity positions can yield up to 25% with proper management.",
        "Protocol risk assessment: Lido has the highest TVL but lower yields. Marinade offers better decentralization. For maximum yield with acceptable risk, consider splitting between established protocols."
      ],
      'nft-analyst': [
        "The Solana NFT market is experiencing a renaissance. DeGods floor price has stabilized around 15 SOL, while y00ts continues to show strong community engagement. Magic Eden volume is up 40% this week.",
        "Collection analysis shows that utility-driven NFTs are outperforming PFP projects. Gaming NFTs on Solana, particularly from Star Atlas and Aurory, are showing strong fundamentals and growing user bases.",
        "Market trends indicate a shift toward NFTs with real-world utility. Consider projects with staking mechanisms, DAO governance, or gaming integration for long-term value appreciation."
      ],
      'blockchain-dev': [
        "For Solana development, I recommend starting with the Anchor framework. It provides excellent abstractions for program development and has comprehensive documentation. The latest version includes improved security features.",
        "Smart contract security is paramount. Always implement proper access controls, use checked arithmetic operations, and conduct thorough testing. Consider using Solana's built-in security features like rent exemption.",
        "The Solana ecosystem is rapidly evolving. New tools like Clockwork for automation and Squads for multisig are game-changers. Stay updated with the latest SDK versions for optimal performance."
      ]
    };

    const agentResponses = responses[agent.id as keyof typeof responses] || responses['crypto-trader'];
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  };

  const handleQuickPrompt = (prompt: string) => {
    setCurrentMessage(prompt);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Chat ${chatSessions.length + 1}`,
      messages: [],
      created: new Date(),
      updated: new Date(),
      agent: selectedAgent?.id || 'crypto-trader'
    };

    setChatSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setMessages([]);
  };

  const updateChatSettings = (updates: Partial<ChatSettings>) => {
    setChatSettings(prev => ({ ...prev, ...updates }));
  };

  const saveSettings = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('softline-chat-settings', JSON.stringify(chatSettings));
    alert('Settings saved successfully!');
    setShowSettings(false);
  };

  // Load settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('softline-chat-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setChatSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  if (!ready) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Softline AI...</h2>
          <p className="text-gray-400">Initializing chat interface...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-8">
            You need to sign in to access Softline AI Chat.
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => window.location.href = '/#launch'}
              className="bg-white text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Sign In
            </button>
            <button 
              onClick={handleBackToHome}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        >
          <source src="https://cdn.prod.website-files.com/65ae784a453a960b1a7ee1d4/65ae951343b427138c1be625_Video_2024-01-22_163831-transcode.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-1/4 left-[-25%] w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[-50%] right-1/3 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-[-20%] left-1/4 w-72 h-72 bg-white/8 rounded-full blur-[90px] animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-black/50 backdrop-blur-sm border-r border-gray-800/50 relative z-10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 w-8 h-8 bg-white/8 rounded-lg blur-lg animate-pulse"></div>
              <img 
                src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                alt="Softline" 
                className="relative z-10 w-8 h-8 object-contain opacity-85 filter brightness-115 contrast-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]" 
              />
            </div>
            <span className="font-brand text-sm text-white tracking-[0.15em] font-black">SOFTLINE</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2">
          <button 
            onClick={createNewChat}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Chat</span>
          </button>

          <div className="space-y-1 mt-6">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 text-gray-400 hover:text-white hover:bg-gray-800/30">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm">Chat</span>
            </button>
            <button 
              onClick={() => setActiveSection('chat')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                activeSection === 'chat' 
                  ? 'text-white bg-blue-600/20 border border-blue-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
              }`}
            >
              <History className="w-5 h-5" />
              <span className="text-sm">History</span>
              {activeSection === 'chat' && <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>}
            </button>
            <button 
              onClick={() => setActiveSection('history')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                activeSection === 'history' 
                  ? 'text-white bg-blue-600/20 border border-blue-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 w-4 h-4 bg-white/8 rounded blur-sm animate-pulse"></div>
                <img 
                  src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                  alt="AI Agents" 
                  className="relative z-10 w-4 h-4 object-contain opacity-85 filter brightness-115 contrast-105" 
                />
              </div>
              <span className="text-sm">AI Agents</span>
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600">
              <img 
                src="https://i.postimg.cc/wThS9PL4/dws.jpg" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{user?.email?.address || 'User'}</p>
              <p className="text-xs text-gray-400 font-mono truncate">0xf272...6455</p>
              {activeSection === 'history' && <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>}
            </div>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-400 hover:text-white transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
            
          {/* History Panel */}
          {activeSection === 'history' && (
            <div className="mt-4 space-y-2">
              <div className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Recent Chats
              </div>
              {chatSessions.length > 0 ? (
                chatSessions.slice(0, 5).map((session) => (
                  <button
                    key={session.id}
                    onClick={() => {
                      setCurrentSessionId(session.id);
                      setMessages(session.messages);
                      setActiveSection('chat');
                    }}
                    className={`w-full text-left p-2 rounded-lg transition-all duration-300 ${
                      currentSessionId === session.id
                        ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                    }`}
                  >
                    <div className="text-sm font-medium truncate">{session.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {session.messages.length} messages • {session.updated.toLocaleDateString()}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center text-gray-500 text-sm">
                  No chat history yet
                </div>
              )}
              
              {chatSessions.length > 5 && (
                <button className="w-full text-center py-2 text-xs text-gray-500 hover:text-gray-400 transition-colors">
                  View all ({chatSessions.length} total)
                </button>
              )}
            </div>
          )}
          
          {/* Chat Stats */}
          {activeSection === 'chat' && (
            <div className="mt-4 space-y-2">
              <div className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Current Session
              </div>
              <div className="px-3 py-2 bg-gray-800/30 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Messages</span>
                  <span className="text-white font-medium">{messages.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-400">Agent</span>
                  <span className="text-white font-medium">{selectedAgent?.name || 'None'}</span>
                </div>
                {selectedAgent && (
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-400">Model</span>
                    <span className="text-white font-medium">{selectedAgent.model}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Jupiter Swap Window */}
      {showJupiterWindow && (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ${
          jupiterWindowMinimized ? 'pointer-events-none' : ''
        }`}>
          <div className={`bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-600 rounded-2xl shadow-2xl transition-all duration-300 ${
            jupiterWindowMinimized 
              ? 'w-80 h-16 fixed bottom-4 right-4' 
              : 'w-full max-w-md'
          }`}>
            {/* Window Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-600 bg-gray-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Jupiter Exchange</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setJupiterWindowMinimized(!jupiterWindowMinimized)}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all duration-300"
                  title={jupiterWindowMinimized ? "Maximize" : "Minimize"}
                >
                  {jupiterWindowMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setShowJupiterWindow(false)}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all duration-300"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Swap Panel Content */}
            {!jupiterWindowMinimized && (
              <div className="p-0">
                <SwapPanel 
                  onSwap={(fromToken, toToken, amount) => {
                    console.log('Swap executed:', { fromToken, toToken, amount });
                    // Add swap success message to chat
                    const swapMessage: Message = {
                      id: Date.now().toString(),
                      content: `✅ Successfully swapped ${amount} ${fromToken.symbol} for ${toToken.symbol}!`,
                      sender: 'ai',
                      timestamp: new Date(),
                      type: 'text'
                    };
                    setMessages(prev => [...prev, swapMessage]);
                  }}
                  onTransfer={(token, amount, recipient) => {
                    console.log('Transfer executed:', { token, amount, recipient });
                    // Add transfer success message to chat
                    const transferMessage: Message = {
                      id: Date.now().toString(),
                      content: `✅ Successfully sent ${amount} ${token.symbol} to ${recipient.slice(0, 8)}...${recipient.slice(-8)}!`,
                      sender: 'ai',
                      timestamp: new Date(),
                      type: 'text'
                    };
                    setMessages(prev => [...prev, transferMessage]);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {showSettings ? (
          /* Settings Panel */
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Chat Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {/* AI Agent Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">AI Agent</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => updateChatSettings({ selectedAgent: agent.id })}
                        className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                          chatSettings.selectedAgent === agent.id
                            ? 'border-blue-500 bg-blue-900/20 text-white'
                            : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={agent.avatar} 
                            alt={agent.name} 
                            className="w-10 h-10 rounded-full object-contain" 
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{agent.name}</h4>
                            <p className="text-sm opacity-75">{agent.specialty}</p>
                          </div>
                          {chatSettings.selectedAgent === agent.id && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Model Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Temperature: {chatSettings.temperature}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={chatSettings.temperature}
                        onChange={(e) => updateChatSettings({ temperature: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Focused</span>
                        <span>Creative</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Max Tokens</label>
                        <select
                          value={chatSettings.maxTokens}
                          onChange={(e) => updateChatSettings({ maxTokens: parseInt(e.target.value) })}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="500">500</option>
                          <option value="1000">1000</option>
                          <option value="2000">2000</option>
                          <option value="4000">4000</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Context Window</label>
                        <select
                          value={chatSettings.contextWindow}
                          onChange={(e) => updateChatSettings({ contextWindow: parseInt(e.target.value) })}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="2000">2K</option>
                          <option value="4000">4K</option>
                          <option value="8000">8K</option>
                          <option value="16000">16K</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Style */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Chat Style</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'professional', name: 'Professional', desc: 'Formal and business-like' },
                      { id: 'casual', name: 'Casual', desc: 'Friendly and relaxed' },
                      { id: 'technical', name: 'Technical', desc: 'Detailed and precise' }
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => updateChatSettings({ chatStyle: style.id as any })}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          chatSettings.chatStyle === style.id
                            ? 'border-blue-500 bg-blue-900/20 text-white'
                            : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800/70'
                        }`}
                      >
                        <div className="text-sm font-semibold mb-1">{style.name}</div>
                        <div className="text-xs">{style.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Response Length */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Response Length</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'short', name: 'Short', desc: 'Brief answers' },
                      { id: 'medium', name: 'Medium', desc: 'Balanced responses' },
                      { id: 'detailed', name: 'Detailed', desc: 'Comprehensive explanations' }
                    ].map((length) => (
                      <button
                        key={length.id}
                        onClick={() => updateChatSettings({ responseLength: length.id as any })}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          chatSettings.responseLength === length.id
                            ? 'border-blue-500 bg-blue-900/20 text-white'
                            : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800/70'
                        }`}
                      >
                        <div className="text-sm font-semibold mb-1">{length.name}</div>
                        <div className="text-xs">{length.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interface Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Interface</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'streamingResponses', label: 'Streaming responses' },
                      { key: 'autoSave', label: 'Auto-save conversations' },
                      { key: 'showTimestamps', label: 'Show timestamps' },
                      { key: 'compactMode', label: 'Compact mode' }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between">
                        <span className="text-white">{setting.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={chatSettings[setting.key as keyof ChatSettings] as boolean}
                            onChange={(e) => updateChatSettings({ [setting.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Features */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Advanced Features</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'syntaxHighlighting', label: 'Code syntax highlighting' },
                      { key: 'mathRendering', label: 'Math rendering' },
                      { key: 'soundEffects', label: 'Sound effects' }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between">
                        <span className="text-white">{setting.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={chatSettings[setting.key as keyof ChatSettings] as boolean}
                            onChange={(e) => updateChatSettings({ [setting.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <button
                    onClick={saveSettings}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-2xl blur-lg animate-pulse"></div>
                  <img 
                    src={selectedAgent?.avatar || "https://i.ibb.co/Z61x2BSq/avatar.png"} 
                    alt="Softline Logo" 
                    className="relative z-10 w-20 h-20 object-contain opacity-90 filter brightness-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" 
                  />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                Welcome to <span className="text-blue-400">{selectedAgent?.name || 'Softline AI'}</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                {selectedAgent?.description || 'Your AI assistant for crypto and DeFi'}
              </p>

              {/* Quick Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 text-sm text-left"
                  >
                    {prompt}
                  </button>
                ))}
                
                {/* Send Commands */}
                <>
                  <button 
                    onClick={() => handlePromptClick('send 0.1 sol (Sol wallet)')}
                    className="p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 text-sm text-left"
                  >
                    send 0.1 sol (Sol wallet)
                  </button>
                </>
              </div>

              {/* Input */}
              <div className="relative max-w-lg mx-auto">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Or ask me anything directly..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-full px-6 py-4 pr-12 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <>
            {/* Chat Header */}
            <div className="border-b border-gray-800/50 p-4 bg-black/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleBackToHome}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/30"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedAgent?.avatar || "https://i.ibb.co/Z61x2BSq/avatar.png"} 
                      alt={selectedAgent?.name} 
                      className="w-8 h-8 rounded-full object-contain" 
                    />
                    <div>
                      <h2 className="text-white font-semibold">{selectedAgent?.name}</h2>
                      <p className="text-xs text-gray-400">{selectedAgent?.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Token Counter */}
                  <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg px-2 md:px-3 py-1 md:py-2 flex items-center gap-1 md:gap-2">
                    <Coins className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                    <span className="text-yellow-300 text-xs md:text-sm font-semibold">{tokens.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => setShowAgentSelector(!showAgentSelector)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/30"
                  >
                    <Bot className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/30">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={selectedAgent?.avatar || "https://i.ibb.co/Z61x2BSq/avatar.png"} 
                        alt="AI" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`p-4 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800/50 text-white border border-gray-700/50'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                      
                      {message.metadata && (
                        <div className="mt-3 pt-3 border-t border-gray-600/30 text-xs text-gray-400">
                          <div className="flex items-center gap-4">
                            <span>Model: {message.metadata.model}</span>
                            <span>Tokens: {message.metadata.tokens}</span>
                            <span>Confidence: {(message.metadata.confidence! * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.sender === 'ai' && (
                        <div className="flex items-center gap-1">
                          <button className="hover:text-gray-300 transition-colors">
                            <Copy className="w-3 h-3" />
                          </button>
                          <button className="hover:text-gray-300 transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button className="hover:text-gray-300 transition-colors">
                            <RefreshCw className="w-3 h-3" />
                          </button>
                          <span className="ml-2">
                            • {message.metadata?.tokens} tokens
                            {chatSettings.showTimestamps && (
                              <span className="ml-2">• {message.metadata?.model}</span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://i.postimg.cc/wThS9PL4/dws.jpg" 
                        alt="User" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={selectedAgent?.avatar || "https://i.ibb.co/Z61x2BSq/avatar.png"} 
                      alt="AI" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className={`bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 ${
                    chatSettings.compactMode ? 'p-2' : 'p-4'
                  }`}>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-800/50 p-4 bg-black/30 backdrop-blur-sm">
              {/* Token warning */}
              {tokens < 100 && (
                <div className="mb-3 md:mb-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3 text-center">
                  <p className="text-yellow-300 text-xs md:text-sm">
                    ⚠️ У вас осталось мало токенов: {tokens}. Каждое сообщение стоит 10 токенов.
                  </p>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-full px-6 py-3 pr-12 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <button className="text-gray-400 hover:text-white transition-colors p-1">
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isLoading || tokens <= 0}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Cost info */}
              <div className="mt-2 text-center">
                <p className="text-gray-500 text-xs">
                  💰 Стоимость сообщения: 10 токенов
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Agent Selector Modal */}
      {showAgentSelector && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Select AI Agent</h3>
              <button 
                onClick={() => setShowAgentSelector(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-3">
              {aiAgents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setShowAgentSelector(false);
                  }}
                  className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                    selectedAgent?.id === agent.id
                      ? 'border-blue-500 bg-blue-600/20'
                      : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={agent.avatar} 
                      alt={agent.name} 
                      className="w-10 h-10 rounded-full object-contain" 
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{agent.name}</h4>
                      <p className="text-gray-400 text-sm">{agent.specialty}</p>
                    </div>
                    {selectedAgent?.id === agent.id && (
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transaction Console */}
      {showConsole && (
        <div className="fixed bottom-4 right-4 w-96 bg-black border border-gray-600 rounded-lg shadow-2xl z-50">
          <div className="flex items-center justify-between p-3 border-b border-gray-600 bg-gray-900">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-sm">Running TRADE_WITH_JUP</span>
            </div>
            <button
              onClick={() => setShowConsole(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-3 h-64 overflow-y-auto bg-black font-mono text-xs">
            {consoleOutput.map((log, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-300">{log}</span>
              </div>
            ))}
            {isProcessingTransaction && (
              <div className="flex items-center gap-2 text-blue-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Processing...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;