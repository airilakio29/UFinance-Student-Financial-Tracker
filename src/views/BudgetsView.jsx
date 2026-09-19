import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Target, PlusCircle, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BudgetsView({ onOpenAddBudget }) {
  const { budgets, categories, transactions, deleteBudget } = useFinance();

  return (
    <div>
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.25rem', fontWeight: 700 }}>
              Monthly Category Budgets
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Set spending caps per category to prevent overspending on hostel rent, food, or entertainment.
            </p>
          </div>

          <button onClick={onOpenAddBudget} className="btn btn-primary">
            <PlusCircle size={16} /> + Set New Budget
          </button>
        </div>
      </div>

      {budgets.length === 0 ? (
        <div className="card" style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Target size={40} color="var(--primary)" style={{ marginBottom: '1rem', opacity: 0.6 }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            No Budget Limits Created Yet
          </h4>
          <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Keeping a budget helps ensure you stay within your monthly allowance.
          </p>
          <button onClick={onOpenAddBudget} className="btn btn-primary">
            + Set Your First Category Budget
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {budgets.map(budget => {
            const category = categories.find(c => c.id === budget.categoryId);
            const spent = transactions
              .filter(t => t.type === 'expense' && t.categoryId === budget.categoryId)
              .reduce((sum, t) => sum + Number(t.amount || 0), 0);

            const limit = Number(budget.monthlyLimit);
            const pct = Math.min(100, (spent / limit) * 100).toFixed(1);
            const isOver = spent > limit;
            const isNear = spent >= limit * 0.8 && !isOver;

            return (
              <div key={budget.id} className="card" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: category ? category.color : 'var(--primary)'
                    }} />
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                      {category ? category.name : 'Category'}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteBudget(budget.id)}
                    className="btn btn-danger btn-icon"
                    style={{ width: '30px', height: '30px' }}
                    title="Remove Budget"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    <span>Spent: <strong>RM {spent.toFixed(2)}</strong></span>
                    <span>Cap: <strong>RM {limit.toFixed(2)}</strong></span>
                  </div>

                  <div className="progress-bar-bg" style={{ height: '12px' }}>
                    <div 
                      className={`progress-bar-fill ${isOver ? 'progress-danger' : isNear ? 'progress-warning' : 'progress-safe'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: isOver ? 'var(--expense)' : isNear ? 'var(--warning)' : 'var(--primary)' }}>
                    {pct}% used
                  </span>

                  {isOver ? (
                    <span className="badge badge-expense" style={{ fontSize: '0.75rem' }}>
                      <AlertCircle size={12} /> Over budget by RM {(spent - limit).toFixed(2)}
                    </span>
                  ) : isNear ? (
                    <span className="badge" style={{ background: 'var(--warning-bg)', color: '#B45309', fontSize: '0.75rem' }}>
                      <AlertCircle size={12} /> 80%+ limit reached
                    </span>
                  ) : (
                    <span className="badge badge-income" style={{ fontSize: '0.75rem' }}>
                      <CheckCircle2 size={12} /> On track
                    </span>
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
