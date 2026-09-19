import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, Calendar, ShieldCheck, FileText, LogIn } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export default function Header({ onOpenMobileMenu, onOpenLoginModal, title = "Dashboard" }) {
  const { user } = useAuth();
  const { exportToPDF } = useFinance();

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

        {/* Guest / User Status Badge */}
        <div className={`badge ${user.isGuest ? 'badge-guest' : 'badge-income'}`}>
          <ShieldCheck size={13} />
          <span>{user.isGuest ? 'Guest Mode' : 'Signed In'}</span>
        </div>

        {/* Sign In / Switch Account Button */}
        <button
          onClick={onOpenLoginModal}
          className="btn btn-primary btn-sm"
          title="Sign In / Switch Account"
        >
          <LogIn size={15} />
          <span className="export-text">{user.isGuest ? 'Sign In' : 'Switch User'}</span>
        </button>

        {/* Quick PDF Export */}
        <button
          onClick={() => exportToPDF(user)}
          className="btn btn-secondary btn-sm"
          title="Export PDF"
        >
          <FileText size={15} />
          <span className="export-text">Export PDF</span>
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
