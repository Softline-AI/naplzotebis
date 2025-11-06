import React, { useState } from 'react';
import { usePrivyWallet } from '../contexts/PrivyWalletContext';

const StartBuildingSection = () => {
  const [activeTab, setActiveTab] = useState('typescript');
  const [activePanel, setActivePanel] = useState('sdk');
  const [activeMcpTab, setActiveMcpTab] = useState('basic');

  const codeExamples = {
    typescript: `import { Softline, Wallet, Agent } from '@softline.io/sdk';

interface MessageEvent {
  content: string;
  sender: string;
  timestamp: Date;
}

async function start(): Promise<void> {
    // Initialize Softline with your API key
    const softline = new Softline('API_KEY');
    
    // Connect wallet from private key
    const wallet = await Wallet.fromPrivateKey('PRIVATE_KEY');
    
    // Connect to AI agent
    const agent = await softline.connectToAgent('softchat', { wallet });
    console.log('Connected to agent:', agent.id);
    
    // Define message handler
    agent.on('message', (event: MessageEvent) => {
        console.log('Received message:', event.content);
    });
    
    // Send message to agent
    agent.emit('sendMessage', { 
        content: 'Hello, Softline AI!' 
    });
}

start().catch(console.error);`,
    javascript: `import { Softline, Wallet, Agent } from '@softline.io/sdk';

async function start() {
    // Initialize Softline with your API key
    const softline = new Softline('API_KEY');
    
    // Connect wallet from private key
    const wallet = await Wallet.fromPrivateKey('PRIVATE_KEY');
    
    // Connect to AI agent
    const agent = await softline.connectToAgent('softchat', { wallet });
    console.log('Connected to agent:', agent.id);
    
    // Define message handler
    agent.on('message', (message) => {
        console.log('Received message:', message.content);
    });
    
    // Send message to agent
    agent.emit('sendMessage', { 
        content: 'Hello, Softline AI!' 
    });
}

start().catch(console.error);`,
    python: `from softline_sdk import Softline, Wallet, Agent
import asyncio

async def start():
    # Initialize Softline with your API key
    softline = Softline('API_KEY')
    
    # Connect wallet from private key
    wallet = await Wallet.from_private_key('PRIVATE_KEY')
    
    # Connect to AI agent
    agent = await softline.connect_to_agent('softchat', wallet=wallet)
    print(f'Connected to agent: {agent.id}')
    
    # Define message handler
    @agent.on('message')
    def handle_message(message):
        print('Received message:', message['content'])
    
    # Send message to agent
    await agent.emit('sendMessage', {
        'content': 'Hello, Softline AI!'
    })

if __name__ == '__main__':
    asyncio.run(start())`
  };

  const mcpCodeExamples = {
    basic: `export class MyMCP extends SoftlineMcp<Bindings, State, Props> {
  async init() {
    this.paidTool(
      "generate_emoji",
      { prompt: z.string().describe("prompt") },
      ({ prompt }) => {
        return {
          content: [{
            type: "text",
            text: generateImage(prompt)
          }],
        };
      },
      {
        priceId: "{{PRICE_ID}}",
        successUrl: "{{SUCCESS_URL}}",
        paymentReason: "10 cents per generation",
      }
    );
  }
}`,
    advanced: `export class AdvancedMCP extends SoftlineMcp<Bindings, State, Props> {
  private aiModel: OpenAI;
  private database: Database;

  async init() {
    this.aiModel = new OpenAI({ apiKey: this.env.OPENAI_API_KEY });
    this.database = new Database(this.env.DATABASE_URL);

    // Multi-step AI workflow with payment
    this.paidTool(
      "analyze_and_generate",
      {
        data: z.string().describe("Input data to analyze"),
        format: z.enum(["json", "csv", "xml"]).describe("Output format"),
        complexity: z.enum(["basic", "advanced", "expert"]).describe("Analysis depth")
      },
      async ({ data, format, complexity }) => {
        // Step 1: Analyze data
        const analysis = await this.aiModel.chat.completions.create({
          model: "gpt-4",
          messages: [{
            role: "system",
            content: \`Analyze the following data with \${complexity} complexity\`
          }, {
            role: "user",
            content: data
          }]
        });

        // Step 2: Store results
        const resultId = await this.database.store({
          analysis: analysis.choices[0].message.content,
          format,
          timestamp: new Date()
        });

        // Step 3: Format output
        const formattedResult = await this.formatOutput(
          analysis.choices[0].message.content,
          format
        );

        return {
          content: [{
            type: "text",
            text: formattedResult
          }],
          metadata: {
            resultId,
            complexity,
            processingTime: Date.now()
          }
        };
      },
      {
        priceId: "price_advanced_analysis",
        successUrl: "https://myapp.com/success",
        paymentReason: "Advanced AI analysis and formatting",
        pricing: {
          basic: 0.25,
          advanced: 0.50,
          expert: 1.00
        }
      }
    );

    // Real-time data streaming tool
    this.streamingTool(
      "live_market_data",
      {
        symbol: z.string().describe("Trading symbol"),
        interval: z.enum(["1m", "5m", "15m", "1h"]).describe("Update interval")
      },
      async function* ({ symbol, interval }) {
        const ws = new WebSocket(\`wss://api.binance.com/ws/\${symbol.toLowerCase()}@ticker\`);
        
        for await (const message of ws) {
          const data = JSON.parse(message);
          yield {
            type: "market_update",
            symbol: data.s,
            price: parseFloat(data.c),
            change: parseFloat(data.P),
            volume: parseFloat(data.v),
            timestamp: Date.now()
          };
        }
      }
    );
  }

  private async formatOutput(content: string, format: string): Promise<string> {
    switch (format) {
      case "json":
        return JSON.stringify({ analysis: content }, null, 2);
      case "csv":
        return \`"Analysis"\n"\${content.replace(/"/g, '""')}"\`;
      case "xml":
        return \`<?xml version="1.0"?><analysis><![CDATA[\${content}]]></analysis>\`;
      default:
        return content;
    }
  }
}`,
    integration: `// Integration with Softline AI Agents
import { SoftlineAgent, AgentCapabilities } from '@softline/agent-sdk';

export class SoftlineIntegratedMCP extends SoftlineMcp<Bindings, State, Props> {
  private agent: SoftlineAgent;

  async init() {
    // Initialize Softline AI Agent
    this.agent = new SoftlineAgent({
      apiKey: this.env.SOFTLINE_API_KEY,
      capabilities: [
        AgentCapabilities.NATURAL_LANGUAGE_PROCESSING,
        AgentCapabilities.BLOCKCHAIN_INTERACTION,
        AgentCapabilities.MARKET_ANALYSIS
      ]
    });

    // AI-powered smart contract interaction
    this.paidTool(
      "smart_contract_call",
      {
        contract: z.string().describe("Contract address"),
        method: z.string().describe("Method to call"),
        params: z.array(z.any()).describe("Method parameters"),
        network: z.enum(["solana", "ethereum", "polygon"]).describe("Blockchain network")
      },
      async ({ contract, method, params, network }) => {
        // Use AI agent to validate and optimize the transaction
        const validation = await this.agent.validateTransaction({
          contract,
          method,
          params,
          network
        });

        if (!validation.isValid) {
          throw new Error(\`Transaction validation failed: \${validation.reason}\`);
        }

        // Execute the smart contract call
        const result = await this.agent.executeSmartContract({
          contract,
          method,
          params,
          network,
          gasOptimization: true
        });

        // AI-powered result analysis
        const analysis = await this.agent.analyzeTransactionResult(result);

        return {
          content: [{
            type: "text",
            text: \`Transaction executed successfully!

📊 **Result Analysis:**
\${analysis.summary}

🔗 **Transaction Hash:** \${result.txHash}
⛽ **Gas Used:** \${result.gasUsed}
💰 **Cost:** \${result.cost} \${network.toUpperCase()}

🤖 **AI Insights:**
\${analysis.insights.join('\\n')}\`
          }],
          metadata: {
            txHash: result.txHash,
            gasUsed: result.gasUsed,
            network,
            aiConfidence: analysis.confidence
          }
        };
      },
      {
        priceId: "price_smart_contract_execution",
        successUrl: "https://softline.io/success",
        paymentReason: "AI-powered smart contract execution with analysis"
      }
    );

    // Multi-agent collaboration tool
    this.collaborativeTool(
      "multi_agent_analysis",
      {
        task: z.string().describe("Analysis task description"),
        agents: z.array(z.enum(["trader", "analyst", "researcher"])).describe("Agent types to involve"),
        depth: z.enum(["quick", "thorough", "comprehensive"]).describe("Analysis depth")
      },
      async ({ task, agents, depth }) => {
        const results = await Promise.all(
          agents.map(agentType => 
            this.agent.collaborateWith(agentType, {
              task,
              depth,
              context: this.getContextForAgent(agentType)
            })
          )
        );

        // Synthesize results from multiple agents
        const synthesis = await this.agent.synthesizeResults(results);

        return {
          content: [{
            type: "text",
            text: synthesis.report
          }],
          agentContributions: results.map((result, index) => ({
            agent: agents[index],
            contribution: result.summary,
            confidence: result.confidence
          }))
        };
      }
    );
  }

  private getContextForAgent(agentType: string): any {
    // Provide specialized context for each agent type
    switch (agentType) {
      case "trader":
        return { marketData: true, riskMetrics: true };
      case "analyst":
        return { historicalData: true, patterns: true };
      case "researcher":
        return { fundamentalData: true, news: true };
      default:
        return {};
    }
  }
}`
  };

  return (
    <section id="start-building" className="bg-black py-24 px-4 md:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="badge mb-8">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Developer Experience</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            Start Building with <span className="text-white">Softline</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-medium">
            Get started with your first AI agent in 5 minutes!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative space-y-6">
            {/* Panel Selector */}
            <div className="flex gap-2">
              <button 
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  activePanel === 'sdk' 
                    ? 'text-white bg-zinc-700' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
                onClick={() => setActivePanel('sdk')}
              >
                Softline SDK
              </button>
              <button 
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  activePanel === 'mcp' 
                    ? 'text-white bg-zinc-700' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
                onClick={() => setActivePanel('mcp')}
              >
                Softline MCP
              </button>
            </div>

            {/* SDK Panel */}
            {activePanel === 'sdk' && (
              <div className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-700">
                <div className="flex items-center gap-2 px-6 py-4 bg-zinc-800/50 border-b border-zinc-700">
                  {['typescript', 'javascript', 'python'].map((lang) => (
                    <button 
                      key={lang}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                        activeTab === lang 
                          ? 'text-white bg-zinc-700' 
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                      }`}
                      onClick={() => setActiveTab(lang)}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="p-6">
                  <pre className="text-sm leading-relaxed overflow-x-auto font-mono">
                    <code className="text-zinc-300 whitespace-pre">
                      {codeExamples[activeTab as keyof typeof codeExamples]}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {/* MCP Panel */}
            {activePanel === 'mcp' && (
              <div className="space-y-4">
                {/* MCP Tab Selector */}
                <div className="flex gap-2">
                  {[
                    { id: 'basic', label: 'Basic MCP', desc: 'Simple paid tool example' },
                    { id: 'advanced', label: 'Advanced MCP', desc: 'Multi-step AI workflow' },
                    { id: 'integration', label: 'Softline Integration', desc: 'AI agent collaboration' }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all border ${
                        activeMcpTab === tab.id 
                          ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 border-purple-400/50' 
                          : 'text-purple-300 hover:text-white hover:bg-purple-800/30 border-purple-500/30'
                      }`}
                      onClick={() => setActiveMcpTab(tab.id)}
                    >
                      <div className="text-left">
                        <div>{tab.label}</div>
                        <div className="text-xs opacity-70">{tab.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* MCP Code Panel */}
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl overflow-hidden border border-purple-500/30">
                  <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-800/30 to-blue-800/30 border-b border-purple-500/30">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-purple-300 text-sm font-semibold">
                      Softline MCP - {activeMcpTab.charAt(0).toUpperCase() + activeMcpTab.slice(1)}
                    </span>
                  </div>
                  <div className="text-xs text-purple-400 font-mono">
                    {activeMcpTab === 'basic' ? 'MyMCP.ts' : 
                     activeMcpTab === 'advanced' ? 'AdvancedMCP.ts' : 
                     'SoftlineIntegratedMCP.ts'}
                  </div>
                  </div>
                  <div className="p-6 max-h-[600px] overflow-y-auto">
                    <pre className="text-sm leading-relaxed font-mono">
                      <code className="text-zinc-300 whitespace-pre">
                        {mcpCodeExamples[activeMcpTab as keyof typeof mcpCodeExamples]}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-white mb-8">
              {activePanel === 'sdk' ? 'Simple, Powerful, AI-Ready' : 'MCP Protocol Integration'}
            </h3>
            {activePanel === 'sdk' ? (
              <ul className="space-y-4 mb-10">
                {[
                  'Easy to get started',
                  'Comprehensive documentation',
                  'Multi-language support',
                  'Enterprise-grade security',
                  'Scalable infrastructure'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="space-y-4 mb-10">
                {[
                 activeMcpTab === 'basic' ? 'Simple paid tool creation' :
                 activeMcpTab === 'advanced' ? 'Multi-step AI workflows' : 'AI agent collaboration',
                 activeMcpTab === 'basic' ? 'Easy monetization setup' :
                 activeMcpTab === 'advanced' ? 'Real-time data streaming' : 'Smart contract integration',
                 activeMcpTab === 'basic' ? 'Built-in payment handling' :
                 activeMcpTab === 'advanced' ? 'Database integration' : 'Cross-chain compatibility',
                 activeMcpTab === 'basic' ? 'Model Context Protocol' :
                 activeMcpTab === 'advanced' ? 'Advanced AI analysis' : 'Multi-agent synthesis',
                 activeMcpTab === 'basic' ? 'Flexible pricing models' :
                 activeMcpTab === 'advanced' ? 'Format conversion tools' : 'Blockchain automation'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-purple-500/30 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
                <div className="mb-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
               <p className="text-purple-200 text-sm">
                 <strong>💡 {activeMcpTab === 'basic' ? 'Basic MCP:' : activeMcpTab === 'advanced' ? 'Advanced MCP:' : 'Softline Integration:'}</strong> 
                 {activeMcpTab === 'basic' ? ' Perfect for simple paid tools and quick monetization.' :
                  activeMcpTab === 'advanced' ? ' Complex workflows with AI, databases, and real-time data.' :
                  ' Full integration with Softline AI agents and blockchain networks.'}
               </p>
             </div>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  window.location.href = '/#agents';
                }}
                className="btn-primary"
              >
                Get Started
              </button>
              <a 
                href="/#docs"
                className="btn-secondary inline-flex items-center justify-center"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartBuildingSection;