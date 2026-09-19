import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';

import GlitterBackground from './components/GlitterBackground';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import DashboardView from './views/DashboardView';
import TransactionsView from './views/TransactionsView';
import BudgetsView from './views/BudgetsView';
import SavingsView from './views/SavingsView';
import SettingsView from './views/SettingsView';

import TransactionModal from './components/TransactionModal';
import BudgetModal from './components/BudgetModal';
import SavingsModal from './components/SavingsModal';
import CategoryModal from './components/CategoryModal';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
  const [savingsModalMode, setSavingsModalMode] = useState('create');
  const [selectedSavingsGoalId, setSelectedSavingsGoalId] = useState(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleOpenAddTransaction = () => {
    setEditingTransaction(null);
    setIsTransactionModalOpen(true);
  };

  const handleEditTransaction = (tx) => {
    setEditingTransaction(tx);
    setIsTransactionModalOpen(true);
  };

  const handleOpenAddBudget = () => {
    setIsBudgetModalOpen(true);
  };

  const handleOpenAddSavings = () => {
    setSavingsModalMode('create');
    setSelectedSavingsGoalId(null);
    setIsSavingsModalOpen(true);
  };

  const handleOpenDepositSavings = (goalId) => {
    setSavingsModalMode('deposit');
    setSelectedSavingsGoalId(goalId);
    setIsSavingsModalOpen(true);
  };

  const handleOpenAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            onOpenAddTransaction={handleOpenAddTransaction}
            onOpenAddBudget={handleOpenAddBudget}
            onOpenAddSavings={handleOpenAddSavings}
          />
        );
      case 'transactions':
        return (
          <TransactionsView
            onOpenAddTransaction={handleOpenAddTransaction}
            onEditTransaction={handleEditTransaction}
          />
        );
      case 'budgets':
        return <BudgetsView onOpenAddBudget={handleOpenAddBudget} />;
      case 'savings':
        return (
          <SavingsView
            onOpenAddSavings={handleOpenAddSavings}
            onOpenDepositSavings={handleOpenDepositSavings}
          />
        );
      case 'settings':
        return <SettingsView onOpenAddCategory={handleOpenAddCategory} />;
      default:
        return (
          <DashboardView
            onOpenAddTransaction={handleOpenAddTransaction}
            onOpenAddBudget={handleOpenAddBudget}
            onOpenAddSavings={handleOpenAddSavings}
          />
        );
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Financial Dashboard';
      case 'transactions': return 'Transaction Records';
      case 'budgets': return 'Category Budgets';
      case 'savings': return 'Student Savings Goals';
      case 'settings': return 'App Settings & Backup';
      default: return 'Financial Dashboard';
    }
  };

  return (
    <div className="app-container">
      <GlitterBackground />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddTransaction={handleOpenAddTransaction}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="main-wrapper">
        <Header
          title={getPageTitle()}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
        />

        <main className="content-area">
          {renderActiveView()}
        </main>
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        initialData={editingTransaction}
      />

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />

      <SavingsModal
        isOpen={isSavingsModalOpen}
        onClose={() => setIsSavingsModalOpen(false)}
        mode={savingsModalMode}
        goalId={selectedSavingsGoalId}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <AppAuthenticator />
      </FinanceProvider>
    </AuthProvider>
  );
}

function AppAuthenticator() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <AppContent />;
}
