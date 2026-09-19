import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY_USER = 'student_tracker_user';
const STORAGE_KEY_AUTH = 'student_tracker_authenticated';
const STORAGE_KEY_AUTH = 'student_tracker_auth_state';

// 5 Pre-configured Student User Entities
export const PREDEFINED_USERS = [
  {
    id: 'user-1',
    username: 'Alex',
    password: '123456789',
    email: 'alex.student@utm.edu.my',
    university: 'Universiti Teknologi Malaysia (UTM)',
    avatar: '🎓',
    isGuest: false,
    currency: 'RM'
  },
  {
    id: 'user-2',
    username: 'Sarah',
    password: 'sarah2026',
    email: 'sarah.tan@um.edu.my',
    university: 'Universiti Malaya (UM)',
    avatar: '👩‍🎓',
    isGuest: false,
    currency: 'RM'
  },
  {
    id: 'user-3',
    username: 'Daniel',
    password: 'daniel123',
    email: 'daniel.lee@ukm.edu.my',
    university: 'Universiti Kebangsaan Malaysia (UKM)',
    avatar: '👨‍💻',
    isGuest: false,
    currency: 'RM'
  },
  {
    id: 'user-4',
    username: 'Priya',
    password: 'priya999',
    email: 'priya.n@usm.edu.my',
    university: 'Universiti Sains Malaysia (USM)',
    avatar: '🌟',
    isGuest: false,
    currency: 'RM'
  },
  {
    id: 'user-5',
    username: 'Marcus',
    password: 'marcuspass',
    email: 'marcus.w@upm.edu.my',
    university: 'Universiti Putra Malaysia (UPM)',
    avatar: '🚀',
    isGuest: false,
    currency: 'RM'
  }
];

export const GUEST_USER = {
  id: 'guest-0',
  username: 'Guest Student',
  password: '',
  email: 'guest@university.edu.my',
  university: 'Campus Guest Account',
  avatar: '👤',
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
      return saved ? JSON.parse(saved) : PREDEFINED_USERS[0]; // Default to Alex
    } catch {
      return PREDEFINED_USERS[0];
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const savedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
      return savedAuth !== null ? JSON.parse(savedAuth) : true;
    } catch {
      return true;
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
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(isAuthenticated));
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
  // Sign In Validation with True/False evaluation statement
  const login = (inputUsernameOrEmail, inputPassword) => {
    const cleanInput = (inputUsernameOrEmail || '').trim().toLowerCase();

    // TRUE/FALSE evaluation statement:
    // Matches if username or email equals input AND password matches exact stored value
    const matchedUser = PREDEFINED_USERS.find(u => 
      (u.username.toLowerCase() === cleanInput || u.email.toLowerCase() === cleanInput) &&
      u.password === inputPassword
    );

    const isLoginValid = Boolean(matchedUser);

    if (isLoginValid) {
      // Evaluation is TRUE
      setUser(matchedUser);
      setIsAuthenticated(true);
      return { success: true, user: matchedUser };
    } else {
      // Evaluation is FALSE
      return { 
        success: false, 
        error: 'Invalid sign in details. Please check your username/email and password.' 
      };
    }
  };

  const loginAsGuest = () => {
    setUser(GUEST_USER);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(GUEST_USER);
    setIsAuthenticated(false);
  };

  const toggleGuestMode = () => {
    if (user.isGuest) {
      setUser(PREDEFINED_USERS[0]);
      setIsAuthenticated(true);
    } else {
      setUser(GUEST_USER);
      setIsAuthenticated(true);
    }
  };

  const updateUserProfile = (newDetails) => {
    setUser(prev => ({ ...prev, ...newDetails }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, toggleGuestMode, updateUserProfile }}>
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      PREDEFINED_USERS,
      login,
      loginAsGuest,
      logout,
      toggleGuestMode,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);