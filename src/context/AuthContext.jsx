import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY_USER = 'student_tracker_user';
const STORAGE_KEY_AUTH = 'student_tracker_authenticated';

const defaultUser = {
  username: 'Alex Student',
  email: 'alex.campus@university.edu.my',
  university: 'University Technology Malaysia',
  isGuest: true,
  currency: 'RM'
};

const validUsers = [
  { username: 'Airil Asyraf', password: 'KrackedDevs', name: 'Airil Asyraf', email: 'alex.campus@university.edu.my', university: 'University Technology Malaysia' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user state', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, isAuthenticated.toString());
    } catch (e) {
      console.error('Failed to save auth state', e);
    }
  }, [isAuthenticated]);

  const login = (username, password) => {
    const found = validUsers.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({
        username: found.name,
        email: found.email,
        university: found.university,
        isGuest: false,
        currency: 'RM'
      });
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    setUser(defaultUser);
    setIsAuthenticated(false);
  };

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
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, toggleGuestMode, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);