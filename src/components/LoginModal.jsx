import React, { useState } from 'react';
import { useAuth, PREDEFINED_USERS } from '../context/AuthContext';
import { LogIn, Key, User, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const { login, loginAsGuest, user: currentUser, isAuthenticated } = useAuth();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // True/False evaluation check
    const result = login(usernameInput, passwordInput);

    if (result.success) {
      setSuccessMessage(`Welcome back, ${result.user.username}!`);
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 700);
    } else {
      setErrorMessage(result.error || 'Invalid credentials. Please check your username and password.');
    }
  };

  const handleSelectDemoUser = (demoUser) => {
    setUsernameInput(demoUser.username);
    setPasswordInput(demoUser.password);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleGuestClick = () => {
    loginAsGuest();
    setSuccessMessage('Logged in as Guest Student');
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 600);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '480px', width: '90%', borderRadius: 'var(--radius-lg)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.12)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              <LogIn size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Student Sign In
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Access your personalized Ringgit Malaysia finance tracker
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="btn btn-secondary btn-icon" 
            style={{ width: '32px', height: '32px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick Demo User Selector */}
        <div style={{
          background: 'var(--bg-card-subtle)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.6rem' }}>
            <Sparkles size={14} color="var(--primary)" />
            <span>SELECT PRE-CONFIGURED DEMO ACCOUNT (5 ENTITIES):</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {PREDEFINED_USERS.map(u => {
              const isSelected = usernameInput === u.username;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleSelectDemoUser(u)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border-light)',
                    background: isSelected ? 'rgba(16, 185, 129, 0.15)' : '#FFF',
                    fontSize: '0.78rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'all 0.15s ease'
                  }}
                  title={`User: ${u.username} | Pass: ${u.password}`}
                >
                  <span>{u.avatar}</span>
                  <span>{u.username}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div style={{
            padding: '0.75rem 0.9rem',
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            color: '#991B1B',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <AlertCircle size={16} color="#DC2626" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div style={{
            padding: '0.75rem 0.9rem',
            background: '#D1FAE5',
            border: '1px solid #6EE7B7',
            color: '#065F46',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <CheckCircle2 size={16} color="#059669" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Username or Email
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                required
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="e.g. Alex or alex.student@utm.edu.my"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Key size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Enter password (e.g. 123456789)"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
              />
            </div>
          </div>

          {/* Hint Footer */}
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-card-subtle)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
            <strong>💡 Validation Credentials:</strong><br />
            1. <code>User: Alex</code> | <code>Pass: 123456789</code><br />
            2. <code>User: Sarah</code> | <code>Pass: sarah2026</code><br />
            3. <code>User: Daniel</code> | <code>Pass: daniel123</code><br />
            4. <code>User: Priya</code> | <code>Pass: priya999</code><br />
            5. <code>User: Marcus</code> | <code>Pass: marcuspass</code>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={handleGuestClick}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              <ShieldCheck size={16} /> Guest Mode
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1.5 }}
            >
              <LogIn size={16} /> Sign In
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
