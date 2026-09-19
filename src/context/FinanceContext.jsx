import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateFinancialPDF } from '../utils/pdfExport';

const FinanceContext = createContext();

const STORAGE_KEYS = {
  TRANSACTIONS: 'student_tracker_transactions',
  CATEGORIES: 'student_tracker_categories',
  BUDGETS: 'student_tracker_budgets',
  SAVINGS: 'student_tracker_savings'
};

const defaultCategories = [
  { id: 'cat-1', name: 'Allowance', type: 'income', color: '#10B981', icon: 'Wallet' },
  { id: 'cat-2', name: 'Scholarship / Loan', type: 'income', color: '#059669', icon: 'Award' },
  { id: 'cat-3', name: 'Part-time Job', type: 'income', color: '#3B82F6', icon: 'Briefcase' },
  { id: 'cat-4', name: 'Tuition & Fees', type: 'expense', color: '#EF4444', icon: 'GraduationCap' },
  { id: 'cat-5', name: 'Hostel & Rent', type: 'expense', color: '#F59E0B', icon: 'Home' },
  { id: 'cat-6', name: 'Food & Dining', type: 'expense', color: '#8B5CF6', icon: 'Utensils' },
  { id: 'cat-7', name: 'Books & Supplies', type: 'expense', color: '#EC4899', icon: 'BookOpen' },
  { id: 'cat-8', name: 'Transport & Commute', type: 'expense', color: '#14B8A6', icon: 'Bus' },
  { id: 'cat-9', name: 'Entertainment & Leisure', type: 'expense', color: '#6366F1', icon: 'Film' }
];

const defaultTransactions = [
  {
    id: 'tx-1',
    date: new Date().toISOString().split('T')[0],
    title: 'PTPTN / Scholarship Disbursement',
    amount: 2500.00,
    type: 'income',
    categoryId: 'cat-2',
    isRecurring: false,
    note: 'Semester 1 allowance'
  },
  {
    id: 'tx-2',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    title: 'Monthly Family Allowance',
    amount: 850.00,
    type: 'income',
    categoryId: 'cat-1',
    isRecurring: true,
    note: 'Bank transfer'
  },
  {
    id: 'tx-3',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    title: 'Semester Tuition Fee Deposit',
    amount: 1200.00,
    type: 'expense',
    categoryId: 'cat-4',
    isRecurring: false,
    note: 'Paid via portal'
  },
  {
    id: 'tx-4',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    title: 'Campus Hostel Rent',
    amount: 350.00,
    type: 'expense',
    categoryId: 'cat-5',
    isRecurring: true,
    note: 'Monthly rental'
  },
  {
    id: 'tx-5',
    date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    title: 'Cafeteria & Grocery Meals',
    amount: 145.50,
    type: 'expense',
    categoryId: 'cat-6',
    isRecurring: false,
    note: 'Weekly food expense'
  },
  {
    id: 'tx-6',
    date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    title: 'Textbooks & Printing',
    amount: 85.00,
    type: 'expense',
    categoryId: 'cat-7',
    isRecurring: false,
    note: 'Course materials'
  },
  {
    id: 'tx-7',
    date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
    title: 'RapidKL Transport Pass Reload',
    amount: 50.00,
    type: 'expense',
    categoryId: 'cat-8',
    isRecurring: true,
    note: 'Monthly card reload'
  }
];

const defaultBudgets = [
  { id: 'b-1', categoryId: 'cat-6', monthlyLimit: 450.00 }, // Food
  { id: 'b-2', categoryId: 'cat-5', monthlyLimit: 400.00 }, // Hostel
  { id: 'b-3', categoryId: 'cat-8', monthlyLimit: 100.00 }, // Transport
  { id: 'b-4', categoryId: 'cat-9', monthlyLimit: 150.00 }  // Entertainment
];

const defaultSavings = [
  {
    id: 's-1',
    title: 'New Laptop for Programming',
    targetAmount: 3200.00,
    currentAmount: 1850.00,
    targetDate: '2026-12-31',
    category: 'Tech'
  },
  {
    id: 's-2',
    title: 'Emergency Campus Fund',
    targetAmount: 1000.00,
    currentAmount: 650.00,
    targetDate: '2026-11-15',
    category: 'Safety'
  }
];

export function FinanceProvider({ children }) {
  // Load initial state from LocalStorage or use defaults
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch { return defaultCategories; }
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved) : defaultTransactions;
    } catch { return defaultTransactions; }
  });

  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      return saved ? JSON.parse(saved) : defaultBudgets;
    } catch { return defaultBudgets; }
  });

  const [savingsGoals, setSavingsGoals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVINGS);
      return saved ? JSON.parse(saved) : defaultSavings;
    } catch { return defaultSavings; }
  });

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVINGS, JSON.stringify(savingsGoals));
  }, [savingsGoals]);

  // Financial Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalBalance = totalIncome - totalExpense;

  const totalSavedInGoals = savingsGoals
    .reduce((sum, s) => sum + Number(s.currentAmount || 0), 0);

  // Category breakdown calculation for Pie Chart
  const categorySpendingBreakdown = categories
    .filter(cat => cat.type === 'expense')
    .map(cat => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.categoryId === cat.id)
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);
      return {
        id: cat.id,
        name: cat.name,
        color: cat.color,
        amount: spent
      };
    })
    .filter(item => item.amount > 0);

  // Transaction CRUD
  const addTransaction = (newTx) => {
    const created = {
      ...newTx,
      id: `tx-${Date.now()}`,
      amount: Number(newTx.amount)
    };
    setTransactions(prev => [created, ...prev]);
  };

  const updateTransaction = (id, updatedTx) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updatedTx, amount: Number(updatedTx.amount) } : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Category CRUD
  const addCategory = (newCat) => {
    const cat = {
      ...newCat,
      id: `cat-${Date.now()}`,
      color: newCat.color || '#52B788'
    };
    setCategories(prev => [...prev, cat]);
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Budget CRUD
  const upsertBudget = (categoryId, monthlyLimit) => {
    setBudgets(prev => {
      const existingIndex = prev.findIndex(b => b.categoryId === categoryId);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], monthlyLimit: Number(monthlyLimit) };
        return copy;
      }
      return [...prev, { id: `b-${Date.now()}`, categoryId, monthlyLimit: Number(monthlyLimit) }];
    });
  };

  const deleteBudget = (id) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  // Savings Goal CRUD
  const addSavingsGoal = (newGoal) => {
    const goal = {
      ...newGoal,
      id: `s-${Date.now()}`,
      targetAmount: Number(newGoal.targetAmount),
      currentAmount: Number(newGoal.currentAmount || 0)
    };
    setSavingsGoals(prev => [...prev, goal]);
  };

  const depositToSavingsGoal = (goalId, amount) => {
    const numAmount = Number(amount);
    setSavingsGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        return { ...g, currentAmount: g.currentAmount + numAmount };
      }
      return g;
    }));

    // Optionally create a transaction for the savings deposit
    const goal = savingsGoals.find(g => g.id === goalId);
    if (goal) {
      addTransaction({
        date: new Date().toISOString().split('T')[0],
        title: `Savings Deposit: ${goal.title}`,
        amount: numAmount,
        type: 'expense',
        categoryId: 'cat-6', // Default or savings allocation
        isRecurring: false,
        note: 'Deposit towards goal'
      });
    }
  };

  const deleteSavingsGoal = (id) => {
    setSavingsGoals(prev => prev.filter(g => g.id !== id));
  };

  // Data Export to PDF
  const exportToPDF = (user) => {
    generateFinancialPDF({
      transactions,
      categories,
      totalBalance,
      totalIncome,
      totalExpense,
      totalSavedInGoals,
      user
    });
  };

  // Data Export to CSV (Legacy fallback)
  const exportToCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Title', 'Amount (RM)', 'Category', 'Recurring', 'Note'];
    const rows = transactions.map(t => {
      const cat = categories.find(c => c.id === t.categoryId);
      return [
        t.id,
        t.date,
        t.type,
        `"${t.title.replace(/"/g, '""')}"`,
        t.amount.toFixed(2),
        `"${cat ? cat.name : 'Uncategorized'}"`,
        t.isRecurring ? 'Yes' : 'No',
        `"${(t.note || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `student_finance_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Backup & Restore LocalStorage JSON Data
  const exportJSONBackup = () => {
    const dataBundle = {
      version: 1,
      exportDate: new Date().toISOString(),
      categories,
      transactions,
      budgets,
      savingsGoals
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataBundle, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `student_finance_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importJSONBackup = (jsonData) => {
    try {
      if (jsonData.categories) setCategories(jsonData.categories);
      if (jsonData.transactions) setTransactions(jsonData.transactions);
      if (jsonData.budgets) setBudgets(jsonData.budgets);
      if (jsonData.savingsGoals) setSavingsGoals(jsonData.savingsGoals);
      return true;
    } catch (err) {
      console.error('Failed to import JSON data', err);
      return false;
    }
  };

  const resetToSampleData = () => {
    setCategories(defaultCategories);
    setTransactions(defaultTransactions);
    setBudgets(defaultBudgets);
    setSavingsGoals(defaultSavings);
  };

  return (
    <FinanceContext.Provider value={{
      categories,
      transactions,
      budgets,
      savingsGoals,
      totalBalance,
      totalIncome,
      totalExpense,
      totalSavedInGoals,
      categorySpendingBreakdown,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addCategory,
      deleteCategory,
      upsertBudget,
      deleteBudget,
      addSavingsGoal,
      depositToSavingsGoal,
      deleteSavingsGoal,
      exportToPDF,
      exportToCSV,
      exportJSONBackup,
      importJSONBackup,
      resetToSampleData
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
