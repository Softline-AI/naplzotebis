import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertCircle, Plus, Bot, Settings, Play, Pause, Trash2, Edit, BarChart3, Brain, Shield, Clock, TrendingUp, Activity, DollarSign, Target, Users, Cpu, Database, LineChart, PieChart, Layers, Network, User, Calendar, Wallet, Power, X } from 'lucide-react';
import { usePrivyWallet } from '../contexts/PrivyWalletContext';

interface Agent {
  id: string;
  name: string;
  type: 'trading' | 'defi' | 'nft' | 'analytics' | 'custom';
  status: 'active' | 'paused' | 'stopped';
  performance: {
    profit: number;
    trades: number;
    winRate: number;
  };
  created: Date;
  lastActive: Date;
}

const AgentsPage = () => {
  const { authenticated, ready, login, user, connected, publicKey } = usePrivyWallet();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [creationStep, setCreationStep] = useState(0);
  const [newAgent, setNewAgent] = useState({
    name: '',
    type: 'trading' as 'trading' | 'defi' | 'nft' | 'analytics' | 'custom',
    description: '',
    budget: 100,
    riskLevel: 'medium' as 'low' | 'medium' | 'high',
    strategy: '',
    maxLoss: 10,
    targetProfit: 20,
    tradingPairs: [] as string[],
    autoRebalance: true,
    stopLoss: true
  });
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'DeFi Yield Hunter',
      type: 'defi',
      status: 'active',
      performance: { profit: 1247.50, trades: 156, winRate: 78.2 },
      created: new Date('2024-01-15'),
      lastActive: new Date()
    },
    {
      id: '2',
      name: 'SOL Trading Bot',
      type: 'trading',
      status: 'active',
      performance: { profit: 892.30, trades: 89, winRate: 65.4 },
      created: new Date('2024-01-20'),
      lastActive: new Date()
    },
    {
      id: '3',
      name: 'NFT Sniper',
      type: 'nft',
      status: 'paused',
      performance: { profit: -45.20, trades: 23, winRate: 43.5 },
      created: new Date('2024-02-01'),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  // Show loading while Privy initializes
  if (!ready) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-gray-400">Initializing connection...</p>
        </div>
      </div>
    );
  }

  // Show authentication required screen
  if (!authenticated) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-8">
            You need to sign in to access your AI agents.
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

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'trading': return <Activity className="w-5 h-5 text-white" />;
      case 'defi': return <Layers className="w-5 h-5 text-white" />;
      case 'nft': return <Database className="w-5 h-5 text-white" />;
      case 'analytics': return <PieChart className="w-5 h-5 text-white" />;
      default: return <Cpu className="w-5 h-5 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-white bg-gray-700';
      case 'paused': return 'text-white bg-gray-600';
      case 'stopped': return 'text-white bg-gray-500';
      default: return 'text-white bg-gray-700';
    }
  };

  const toggleAgentStatus = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' as 'active' | 'paused' | 'stopped' }
        : agent
    ));
  };

  const deleteAgent = (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      setAgents(prev => prev.filter(agent => agent.id !== agentId));
    }
  };

  const handleCreateAgent = async () => {
    if (!newAgent.name.trim()) {
      alert('Please enter agent name');
      return;
    }

    setIsCreating(true);
    setCreationStep(0);
    
    try {
      // Step 1: Validating configuration
      setCreationStep(1);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 2: Deploying smart contracts
      setCreationStep(2);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 3: Initializing AI model
      setCreationStep(3);
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Step 4: Setting up monitoring
      setCreationStep(4);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const createdAgent: Agent = {
        id: Date.now().toString(),
        name: newAgent.name,
        type: newAgent.type,
        status: 'active',
        performance: {
          profit: 0,
          trades: 0,
          winRate: 0
        },
        created: new Date(),
        lastActive: new Date()
      };
      
      setAgents(prev => [...prev, createdAgent]);
      setShowCreateModal(false);
      setCreationStep(0);
      
      // Reset form
      setNewAgent({
        name: '',
        type: 'trading',
        description: '',
        budget: 100,
        riskLevel: 'medium',
        strategy: '',
        maxLoss: 10,
        targetProfit: 20,
        tradingPairs: [],
        autoRebalance: true,
        stopLoss: true
      });
      
      // Show success message
      alert(`AI Agent "${createdAgent.name}" created successfully!`);
      
    } catch (error) {
      console.error('Failed to create agent:', error);
      alert('Failed to create agent. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const openAgentSettings = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
    setSelectedAgent(null);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-gray-800 bg-black p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                alt="Softline" 
                className="w-10 h-10 object-contain" 
              />
              <span className="font-brand text-lg text-white tracking-[0.15em] font-black">SOFTLINE</span>
            </div>
            
            <button 
              onClick={handleBackToHome}
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
          {/* User Profile Section */}
          <div className="bg-gray-900 rounded-lg p-4 md:p-8 border border-gray-800 mb-8 md:mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-6">
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-lg overflow-hidden border border-gray-700">
                  <img 
                    src="https://i.postimg.cc/wThS9PL4/dws.jpg" 
                    alt="User Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h1 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">
                    {user?.email?.address?.split('@')[0] || 'User'}
                  </h1>
                  <div className="space-y-1 text-xs md:text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{user?.email?.address || 'user@softline.io'}</span>
                    </div>
                    {connected && publicKey && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Wallet className="w-4 h-4" />
                        <span className="font-mono">
                          {publicKey.slice(0, 8)}...{publicKey.slice(-8)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Member since January 2024</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right hidden sm:block">
                <div className="bg-gray-800 px-2 md:px-4 py-1 md:py-2 rounded-lg border border-gray-700">
                  <span className="text-white font-semibold text-xs md:text-sm">PRO PLAN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
            <div className="bg-gray-900 rounded-lg p-3 md:p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                <span className="text-lg md:text-2xl font-bold text-white">{agents.length}</span>
              </div>
              <h3 className="text-gray-400 text-xs md:text-sm">Total Agents</h3>
            </div>

            <div className="bg-gray-900 rounded-lg p-3 md:p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-white" />
                <span className="text-lg md:text-2xl font-bold text-white">
                  ${agents.reduce((sum, agent) => sum + agent.performance.profit, 0).toFixed(2)}
                </span>
              </div>
              <h3 className="text-gray-400 text-xs md:text-sm">Total Profit</h3>
            </div>

            <div className="bg-gray-900 rounded-lg p-3 md:p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-white" />
                <span className="text-lg md:text-2xl font-bold text-white">
                  {agents.reduce((sum, agent) => sum + agent.performance.trades, 0)}
                </span>
              </div>
              <h3 className="text-gray-400 text-xs md:text-sm">Total Trades</h3>
            </div>

            <div className="bg-gray-900 rounded-lg p-3 md:p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <Power className="w-6 h-6 md:w-8 md:h-8 text-white" />
                <span className="text-lg md:text-2xl font-bold text-white">
                  {agents.filter(a => a.status === 'active').length}
                </span>
              </div>
              <h3 className="text-gray-400 text-xs md:text-sm">Active Agents</h3>
            </div>
          </div>

          {/* AI Agents Repository */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-white">AI Agents Repository</h2>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-white text-black font-semibold px-4 md:px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 hover:bg-gray-100 text-sm md:text-base"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Create Agent</span>
                <span className="sm:hidden">Create</span>
              </button>
            </div>

            {agents.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6 border border-gray-700">
                  <Bot className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">No Agents</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Create your first AI agent to start automating your strategies.
                </p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-white text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2 hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Agent
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {agents.map((agent) => (
                  <div key={agent.id} className="bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
                          <img 
                            src="https://i.ibb.co/Z61x2BSq/avatar.png" 
                            alt="Softline Agent" 
                            className="w-6 h-6 md:w-10 md:h-10 object-contain" 
                          />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white">{agent.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`px-2 md:px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(agent.status)}`}>
                              {agent.status.toUpperCase()}
                            </span>
                            <span className="text-gray-400 text-xs md:text-sm capitalize hidden sm:inline">
                              {agent.type === 'custom' ? newAgent.customType || 'Custom Agent' : 
                               agent.type === 'trading' ? 'Algorithmic Trading' :
                               agent.type === 'defi' ? 'Yield Farming' :
                               agent.type === 'nft' ? 'NFT Analysis' :
                               agent.type === 'analytics' ? 'Market Intelligence' : agent.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 md:gap-2">
                        <button 
                          onClick={() => toggleAgentStatus(agent.id)}
                          className="p-1.5 md:p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
                          title={agent.status === 'active' ? 'Pause Agent' : 'Start Agent'}
                        >
                          {agent.status === 'active' ? <Pause className="w-3 h-3 md:w-4 md:h-4" /> : <Play className="w-3 h-3 md:w-4 md:h-4" />}
                        </button>
                        <button 
                          onClick={() => openAgentSettings(agent)}
                          className="p-1.5 md:p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
                          title="Agent Settings"
                        >
                          <Settings className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        <button className="p-1.5 md:p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 hidden sm:block">
                          <Edit className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        <button 
                          onClick={() => deleteAgent(agent.id)}
                          className="p-1.5 md:p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
                        >
                          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                      <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          <span className="text-xs md:text-sm text-gray-400">PnL</span>
                        </div>
                        <div className={`text-sm md:text-lg font-bold ${agent.performance.profit >= 0 ? 'text-white' : 'text-gray-400'}`}>
                          {agent.performance.profit >= 0 ? '+' : ''}${agent.performance.profit.toFixed(2)}
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          <span className="text-xs md:text-sm text-gray-400">Trades</span>
                        </div>
                        <div className="text-sm md:text-lg font-bold text-white">
                          {agent.performance.trades}
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          <span className="text-xs md:text-sm text-gray-400">Win Rate</span>
                        </div>
                        <div className="text-sm md:text-lg font-bold text-white">
                          {agent.performance.winRate}%
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          <span className="text-xs md:text-sm text-gray-400">Last Active</span>
                        </div>
                        <div className="text-xs md:text-sm text-white font-mono">
                          {agent.lastActive.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create Agent CTA */}
          {agents.length > 0 && (
            <div className="text-center mt-16">
              <div className="bg-gray-900 rounded-lg p-12 border border-gray-800">
                <h2 className="text-3xl font-bold text-white mb-4">Scale Your Operations</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  Create more AI agents to diversify your strategies and maximize returns.
                </p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-white text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2 hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5" />
                  Create New Agent
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Agent Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-lg w-full border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Create AI Agent</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!isCreating ? (
            <div className="space-y-6">
              {/* Agent Name */}
              <div>
                <label className="block text-white font-semibold mb-2">Agent Name</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter agent name..."
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Agent Type */}
              <div>
                <label className="block text-white font-semibold mb-2">Agent Type</label>
                <select
                  value={newAgent.type}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="trading">Trading Bot</option>
                  <option value="defi">DeFi Yield Hunter</option>
                  <option value="nft">NFT Sniper</option>
                  <option value="analytics">Market Analyzer</option>
                  <option value="custom">Custom Agent</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <textarea
                  value={newAgent.description}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your agent's purpose..."
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-white font-semibold mb-2">Initial Budget (SOL)</label>
                <input
                  type="number"
                  value={newAgent.budget}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, budget: Number(e.target.value) }))}
                  min="1"
                  max="1000"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Strategy */}
              <div>
                <label className="block text-white font-semibold mb-2">Trading Strategy</label>
                <select
                  value={newAgent.strategy}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, strategy: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Strategy</option>
                  <option value="scalping">Scalping</option>
                  <option value="swing">Swing Trading</option>
                  <option value="arbitrage">Arbitrage</option>
                  <option value="grid">Grid Trading</option>
                  <option value="dca">Dollar Cost Averaging</option>
                </select>
              </div>

              {/* Advanced Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Max Loss (%)</label>
                  <input
                    type="number"
                    value={newAgent.maxLoss}
                    onChange={(e) => setNewAgent(prev => ({ ...prev, maxLoss: Number(e.target.value) }))}
                    min="1"
                    max="50"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Target Profit (%)</label>
                  <input
                    type="number"
                    value={newAgent.targetProfit}
                    onChange={(e) => setNewAgent(prev => ({ ...prev, targetProfit: Number(e.target.value) }))}
                    min="5"
                    max="100"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div>
                <label className="block text-white font-semibold mb-2">Risk Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map((risk) => (
                    <button
                      key={risk}
                      onClick={() => setNewAgent(prev => ({ ...prev, riskLevel: risk as any }))}
                      className={`py-2 px-4 rounded-lg font-medium transition-all ${
                        newAgent.riskLevel === risk
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {risk.charAt(0).toUpperCase() + risk.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-white font-semibold mb-2">Features</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newAgent.autoRebalance}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, autoRebalance: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-white">Auto Rebalancing</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={newAgent.stopLoss}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, stopLoss: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-white">Stop Loss Protection</span>
                  </label>
                </div>
              </div>
            </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h4 className="text-xl font-bold text-white mb-4">Creating AI Agent</h4>
                <div className="space-y-2">
                  {[
                    'Validating configuration',
                    'Deploying smart contracts',
                    'Initializing AI model',
                    'Setting up monitoring'
                  ].map((step, index) => (
                    <div key={index} className={`flex items-center gap-3 ${
                      creationStep > index ? 'text-green-400' : 
                      creationStep === index + 1 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {creationStep > index ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : creationStep === index + 1 ? (
                        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
                      )}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Button */}
            {!isCreating && (
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAgent}
                disabled={isCreating || !newAgent.name.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Agent
                  </>
                )}
              </button>
            </div>
            )}
          </div>
        </div>
      )}

      {/* Agent Settings Modal */}
      {showSettingsModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Agent Settings: {selectedAgent.name}</h3>
              <button 
                onClick={closeSettingsModal}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Performance Metrics */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">${selectedAgent.performance.profit.toFixed(2)}</div>
                    <div className="text-gray-400 text-sm">Total Profit</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">{selectedAgent.performance.trades}</div>
                    <div className="text-gray-400 text-sm">Total Trades</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">{selectedAgent.performance.winRate}%</div>
                    <div className="text-gray-400 text-sm">Win Rate</div>
                  </div>
                </div>
              </div>

              {/* Trading Settings */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Trading Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Max Position Size</label>
                    <input
                      type="number"
                      defaultValue="1000"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Stop Loss (%)</label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Take Profit (%)</label>
                    <input
                      type="number"
                      defaultValue="15"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Trading Frequency</label>
                    <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white">
                      <option>High (1-5 min)</option>
                      <option>Medium (5-30 min)</option>
                      <option>Low (30+ min)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Risk Management */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Risk Management</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Auto Stop Trading on Loss</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Portfolio Rebalancing</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Trading Pairs */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Trading Pairs</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['SOL/USDC', 'ETH/USDC', 'BTC/USDC', 'AVAX/USDC', 'MATIC/USDC', 'DOT/USDC'].map((pair) => (
                    <label key={pair} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={['SOL/USDC', 'ETH/USDC'].includes(pair)}
                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded"
                      />
                      <span className="text-white text-sm">{pair}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={closeSettingsModal}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Settings saved successfully!');
                  closeSettingsModal();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentsPage;