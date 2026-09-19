import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ReceiptText, 
  Target, 
  PiggyBank, 
  Settings, 
  PlusCircle, 
  GraduationCap, 
  LogIn, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenAddTransaction, onOpenLoginModal, isMobileOpen, setIsMobileOpen }) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'budgets', label: 'Budgets', icon: Target },
    { id: 'savings', label: 'Savings Goals', icon: PiggyBank },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99
          }}
        />
      )}

      <aside style={{
        width: '260px',
        background: 'var(--bg-sidebar)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: '1.5rem 1.25rem',
        flexShrink: 0,
        zIndex: 100,
        transition: 'transform var(--transition-smooth)',
        position: 'relative'
      }} className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        
        <div>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                color: 'var(--primary)'
              }}>
                <GraduationCap size={26} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                  StudentPay
                </h1>
                <span style={{ fontSize: '0.72rem', color: '#A7F3D0', fontWeight: 500 }}>
                  Ringgit Financial Tracker
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsMobileOpen(false)} 
              className="mobile-close-btn"
              style={{ background: 'transparent', border: 'none', color: '#FFF', display: 'none', cursor: 'pointer' }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => {
              onOpenAddTransaction();
              if (isMobileOpen) setIsMobileOpen(false);
            }}
            className="btn"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, var(--sage-accent), var(--primary))',
              color: '#FFFFFF',
              marginBottom: '1.75rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
            }}
          >
            <PlusCircle size={18} />
            <span>+ Add Transaction</span>
          </button>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobileOpen) setIsMobileOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'var(--bg-sidebar-active)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#A7F3D0',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Icon size={20} color={isActive ? '#34D399' : '#A7F3D0'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer User Profile & Sign In */}
        <div style={{
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          marginTop: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            padding: '0.75rem',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: user.isGuest ? '#F59E0B' : 'var(--primary)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                fontWeight: 700,
                fontSize: '1rem'
              }}>
                {user.avatar || user.username.charAt(0)}
              </div>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '110px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.username}
                </div>
                <div style={{ fontSize: '0.7rem', color: user.isGuest ? '#FCD34D' : '#6EE7B7', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.isGuest ? 'Guest Mode' : user.university || 'Student'}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenLoginModal}
              title="Sign In / Switch Account"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#A7F3D0',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                padding: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}
            >
              <LogIn size={18} />
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .sidebar {
            position: fixed !important;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            box-shadow: 4px 0 20px rgba(0,0,0,0.3);
          }
          .sidebar.mobile-open {
            transform: translateX(0);
          }
          .mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
