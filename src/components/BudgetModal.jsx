import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X } from 'lucide-react';

export default function BudgetModal({ isOpen, onClose }) {
  const { categories, budgets, upsertBudget } = useFinance();
  const [categoryId, setCategoryId] = useState('');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const expenseCategories = categories.filter(c => c.type === 'expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryId) {
      setError('Please select an expense category');
      return;
    }
    if (!limit || Number(limit) <= 0) {
      setError('Please enter a budget limit greater than RM 0');
      return;
    }

    upsertBudget(categoryId, Number(limit));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Set Monthly Budget Limit
          </h3>
          <button onClick={onClose} className="btn btn-secondary btn-icon">
            <X size={18} />
          </button>
        </div>

        {error && (
          <div style={{ background: 'var(--expense-bg)', color: 'var(--expense)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Expense Category</label>
            <select
              className="form-control"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
            >
              <option value="">Select Category...</option>
              {expenseCategories.map(cat => {
                const existing = budgets.find(b => b.categoryId === cat.id);
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} {existing ? `(Current: RM ${existing.monthlyLimit})` : ''}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Monthly Limit (RM)</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--primary)' }}>
                RM
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="400.00"
                className="form-control"
                style={{ paddingLeft: '3.2rem' }}
                value={limit}
                onChange={e => setLimit(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Save Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
