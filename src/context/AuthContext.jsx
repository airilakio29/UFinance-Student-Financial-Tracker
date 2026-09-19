import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY_USER = 'student_tracker_user';

const defaultUser = {
  username: 'Alex Student',
  email: 'alex.campus@university.edu.my',
  university: 'University Technology Malaysia',
  isGuest: true,
  currency: 'RM'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user state', e);
    }
  }, [user]);

  const toggleGuestMode = () => {
    setUser(prev => ({
      ...prev,
      isGuest: !prev.isGuest
    }));
  };

  const updateUserProfile = (newDetails) => {
    setUser(prev => ({ ...prev, ...newDetails }));
  };

  return (
    <AuthContext.Provider value={{ user, toggleGuestMode, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
