
import { UserProfile } from '../types';

// Mock implementation for demo purposes since we don't have a backend or valid Client ID.
// In a real production app, you would integrate Google Identity Services properly.

let authCallback: ((user: UserProfile | null) => void) | null = null;
const STORAGE_KEY = 'techcareeros_user';

export const onAuthStateChange = (callback: (user: UserProfile | null) => void) => {
  authCallback = callback;
  
  // Check local storage for existing session
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      callback(JSON.parse(storedUser));
    } else {
      callback(null);
    }
  } catch (e) {
    callback(null);
  }
  
  return () => { authCallback = null; };
};

export const signInWithGoogle = async () => {
   // SIMULATED LOGIN
   // Since the Google Client ID is a placeholder, real auth would fail.
   // We simulate a successful Google Login response.
   
   const mockUser: UserProfile = {
     id: 'user-' + Math.random().toString(36).substr(2, 9),
     name: 'Demo User',
     email: 'admin@techcareeros.com', // Grants admin access for testing
     picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
   };
   
   localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
   
   if (authCallback) {
     authCallback(mockUser);
   }
   
   return mockUser;
};

export const signOut = async () => {
  localStorage.removeItem(STORAGE_KEY);
  if (authCallback) {
    authCallback(null);
  }
};
