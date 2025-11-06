import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { mainnet, polygon, base, arbitrum, optimism } from 'viem/chains';
import { PrivyWalletProvider } from './contexts/PrivyWalletContext';
import Header from './components/Header';
import Hero from './components/Hero';
import AIAgentsSection from './components/AIAgentsSection';
import BeyondSection from './components/BeyondSection';
import BenefitsSection from './components/BenefitsSection';
import StartBuildingSection from './components/StartBuildingSection';
import JoinFutureSection from './components/JoinFutureSection';
import Footer from './components/Footer';
import AgentsPage from './components/AgentsPage';
import LaunchPage from './components/LaunchPage';
import DocsPage from './components/DocsPage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import ChatbotPage from './components/ChatbotPage';
import CAPage from './components/CAPage';

// Правильная конфигурация Privy
const privyConfig = {
  appId: 'cme8ur9cu01qnl80bj57eeprk', // Ваш реальный App ID
  config: {
    loginMethods: ['email', 'wallet', 'sms'] as const,
    appearance: {
      theme: 'dark' as const,
      accentColor: '#3B82F6',
      logo: 'https://i.ibb.co/Z61x2BSq/avatar.png',
      showWalletLoginFirst: false,
      walletList: ['phantom', 'metamask', 'coinbase_wallet', 'wallet_connect'] as const,
    },
    embeddedWallets: {
      createOnLogin: 'users-without-wallets' as const,
      requireUserPasswordOnCreate: false,
    },
    mfa: {
      noPromptOnMfaRequired: false,
    },
    supportedChains: [
      mainnet,
      polygon,
      base,
    ],
  },
};

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'launch':
        return <LaunchPage />;
      case 'agents':
        return <AgentsPage />;
      case 'docs':
        return <DocsPage />;
      case 'about':
        return <AboutPage />;
      case 'pricing':
        return <PricingPage />;
      case 'chatbot':
        return <ChatbotPage />;
      case 'ca':
        return <CAPage />;
      default:
        return (
          <>
            <Header />
            <Hero />
            <AIAgentsSection />
            <BeyondSection />
            <BenefitsSection />
            <StartBuildingSection />
            <JoinFutureSection />
            <Footer />
          </>
        );
    }
  };

  return (
    <PrivyProvider 
      appId={privyConfig.appId} 
      config={privyConfig.config}
    >
      <PrivyWalletProvider>
        <div className="bg-black text-white min-h-screen">
          {renderPage()}
        </div>
      </PrivyWalletProvider>
    </PrivyProvider>
  );
}

export default App;