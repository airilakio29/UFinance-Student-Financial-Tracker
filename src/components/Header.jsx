import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, Calendar, ShieldCheck, Download } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export default function Header({ onOpenMobileMenu, title = "Dashboard" }) {
  const { user } = useAuth();
  const { exportToCSV } = useFinance();

  const todayStr = new Date().toLocaleDateString('en-MY', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      padding: '1.25rem 2rem',
      background: 'rgba(98, 72, 115, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onOpenMobileMenu}
          className="btn btn-secondary btn-icon header-mobile-menu"
          style={{ display: 'none' }}
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
            {title}
          </h2>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
            <span>Welcome back, <strong>{user.username}</strong> 👋</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Date Display Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: 'rgba(255, 255, 255, 0.12)',
          padding: '0.45rem 0.85rem',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          fontSize: '0.82rem',
          color: 'rgba(255, 255, 255, 0.8)',
          fontWeight: 500
        }}>
          <Calendar size={14} color="rgba(255, 255, 255, 0.8)" />
          <span>{todayStr}</span>
        </div>

        {/* Guest Mode Status Badge */}
        <div className={`badge ${user.isGuest ? 'badge-guest' : 'badge-income'}`}>
          <ShieldCheck size={13} />
          <span>{user.isGuest ? 'Guest Mode' : 'Online Sync'}</span>
        </div>

        {/* Quick CSV Export */}
        <button
          onClick={exportToCSV}
          className="btn btn-secondary btn-sm"
          title="Export CSV"
        >
          <Download size={15} />
          <span className="export-text">Export CSV</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .header-mobile-menu {
            display: flex !important;
          }
        }
        @media (max-width: 600px) {
          .export-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
