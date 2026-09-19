import React, { useRef, useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { useAuth } from '../context/AuthContext';
import { 
  PlusCircle, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  ShieldCheck, 
  Tag, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function SettingsView({ onOpenAddCategory }) {
  const { 
    categories, 
    deleteCategory, 
    exportJSONBackup, 
    importJSONBackup, 
    resetToSampleData 
  } = useFinance();
  const { user, toggleGuestMode } = useAuth();

  const fileInputRef = useRef(null);
  const [msg, setMsg] = useState({ text: '', isError: false });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const success = importJSONBackup(json);
        if (success) {
          setMsg({ text: 'Backup data restored successfully!', isError: false });
        } else {
          setMsg({ text: 'Invalid backup file format.', isError: true });
        }
      } catch {
        setMsg({ text: 'Failed to read JSON backup file.', isError: true });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Settings & Local Data Management
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Manage your custom categories, export LocalStorage JSON backups, or switch between Guest Mode and User Mode.
        </p>
      </div>

      {msg.text && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: msg.isError ? 'var(--expense-bg)' : 'var(--income-bg)',
          color: msg.isError ? 'var(--expense)' : 'var(--income)',
          fontWeight: 600,
          fontSize: '0.88rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {msg.isError ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          {msg.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Category Management */}
        <div className="card">
          <div className="card-title">
            <span>Category Manager</span>
            <button onClick={onOpenAddCategory} className="btn btn-primary btn-sm">
              <PlusCircle size={14} /> Add Category
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '350px', overflowY: 'auto' }}>
            {categories.map(cat => (
              <div 
                key={cat.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-card-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: cat.color
                  }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cat.name}</span>
                  <span className={`badge ${cat.type === 'income' ? 'badge-income' : 'badge-expense'}`} style={{ fontSize: '0.7rem' }}>
                    {cat.type}
                  </span>
                </div>

                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="btn btn-danger btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  title="Delete category"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Backup & Restore */}
        <div className="card">
          <div className="card-title">
            <span>LocalStorage Backup & Restore</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Your data is stored securely inside your browser local storage. You can export a JSON file to keep an offline backup or transfer to another device.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <button onClick={exportJSONBackup} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
              <Download size={18} color="var(--primary)" />
              <span>Export Full JSON Backup</span>
            </button>

            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />

            <button onClick={() => fileInputRef.current?.click()} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
              <Upload size={18} color="var(--sage-accent)" />
              <span>Restore JSON Backup File</span>
            </button>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => {
                  if (window.confirm('Reset all financial tracker data to default sample transactions?')) {
                    resetToSampleData();
                    setMsg({ text: 'Data reset to default sample values.', isError: false });
                  }
                }}
                className="btn btn-danger"
                style={{ width: '100%' }}
              >
                <RotateCcw size={16} /> Reset to Sample Student Data
              </button>
            </div>
          </div>
        </div>

        {/* Account & Guest Mode Toggle */}
        <div className="card">
          <div className="card-title">
            <span>Account & Access Mode</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: user.isGuest ? '#F59E0B' : 'var(--primary)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              fontWeight: 700,
              fontSize: '1.2rem'
            }}>
              {user.username.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{user.username}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{user.email}</div>
              <div style={{ fontSize: '0.78rem', color: user.isGuest ? '#B45309' : 'var(--primary)', fontWeight: 600, marginTop: '0.15rem' }}>
                {user.isGuest ? 'Guest Mode (No password required)' : 'Authenticated Student Profile'}
              </div>
            </div>
          </div>

          <button onClick={toggleGuestMode} className="btn btn-secondary" style={{ width: '100%' }}>
            <ShieldCheck size={16} />
            <span>Switch to {user.isGuest ? 'Authenticated Mode' : 'Guest Mode'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
