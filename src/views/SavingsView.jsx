import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { PiggyBank, PlusCircle, Trash2, Calendar, CheckCircle2 } from 'lucide-react';

export default function SavingsView({ onOpenAddSavings, onOpenDepositSavings }) {
  const { savingsGoals, deleteSavingsGoal } = useFinance();

  return (
    <div>
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.25rem', fontWeight: 700 }}>
              Student Savings Goals
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Set aside money for laptops, reference textbooks, emergency funds, or graduation trips.
            </p>
          </div>

          <button onClick={onOpenAddSavings} className="btn btn-primary">
            <PlusCircle size={16} /> + Create New Goal
          </button>
        </div>
      </div>

      {savingsGoals.length === 0 ? (
        <div className="card" style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <PiggyBank size={40} color="#3B82F6" style={{ marginBottom: '1rem', opacity: 0.6 }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            No Active Savings Goals
          </h4>
          <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Start saving for your semester objectives today!
          </p>
          <button onClick={onOpenAddSavings} className="btn btn-primary">
            + Create Your First Goal
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {savingsGoals.map(goal => {
            const current = Number(goal.currentAmount || 0);
            const target = Number(goal.targetAmount || 1);
            const pct = Math.min(100, (current / target) * 100).toFixed(1);
            const isCompleted = current >= target;

            return (
              <div key={goal.id} className="card" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                    {goal.title}
                  </h4>

                  <button
                    onClick={() => deleteSavingsGoal(goal.id)}
                    className="btn btn-danger btn-icon"
                    style={{ width: '30px', height: '30px' }}
                    title="Delete Goal"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    <span>Saved: <strong style={{ color: 'var(--primary)' }}>RM {current.toFixed(2)}</strong></span>
                    <span>Target: <strong>RM {target.toFixed(2)}</strong></span>
                  </div>

                  <div className="progress-bar-bg" style={{ height: '12px' }}>
                    <div className="progress-bar-fill progress-safe" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={13} /> Target: {goal.targetDate || 'No date set'}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {pct}% Achieved
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  {isCompleted ? (
                    <div style={{ width: '100%', textAlign: 'center', padding: '0.5rem', background: 'var(--income-bg)', color: 'var(--income)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={16} /> Goal Completed! 🎉
                    </div>
                  ) : (
                    <button
                      onClick={() => onOpenDepositSavings(goal.id)}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '0.5rem' }}
                    >
                      + Deposit Funds (RM)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
