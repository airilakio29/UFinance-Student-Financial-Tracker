import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X } from 'lucide-react';

export default function SavingsModal({ isOpen, onClose, mode = 'create', goalId = null }) {
  const { savingsGoals, addSavingsGoal, depositToSavingsGoal } = useFinance();

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [initialSaved, setInitialSaved] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const selectedGoal = goalId ? savingsGoals.find(g => g.id === goalId) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'deposit') {
      if (!depositAmount || Number(depositAmount) <= 0) {
        setError('Please enter a valid deposit amount');
        return;
      }
      depositToSavingsGoal(goalId, Number(depositAmount));
      onClose();
      return;
    }

    // Create mode validation
    if (!title.trim()) {
      setError('Please enter a goal title (e.g. New Laptop)');
      return;
    }
    if (!targetAmount || Number(targetAmount) <= 0) {
      setError('Please enter a target amount in RM');
      return;
    }

    addSavingsGoal({
      title: title.trim(),
      targetAmount: Number(targetAmount),
      currentAmount: Number(initialSaved || 0),
      targetDate: targetDate || new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0]
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {mode === 'deposit' ? `Deposit to ${selectedGoal ? selectedGoal.title : 'Savings'}` : 'Create New Savings Goal'}
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
          {mode === 'deposit' ? (
            <div className="form-group">
              <label className="form-label">Deposit Amount (RM)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--primary)' }}>
                  RM
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="50.00"
                  className="form-control"
                  style={{ paddingLeft: '3.2rem' }}
                  value={depositAmount}
                  onChange={e => setDepositAmount(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">Goal Title</label>
                <input
                  type="text"
                  placeholder="e.g. New Laptop for Semester, Emergency Fund"
                  className="form-control"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Amount (RM)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--primary)' }}>
                    RM
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="3000.00"
                    className="form-control"
                    style={{ paddingLeft: '3.2rem' }}
                    value={targetAmount}
                    onChange={e => setTargetAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Initial Saved Amount (Optional RM)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="form-control"
                  value={initialSaved}
                  onChange={e => setInitialSaved(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                />
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {mode === 'deposit' ? 'Confirm Deposit' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
