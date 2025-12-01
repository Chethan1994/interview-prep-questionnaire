
import { UserProfile, Submission } from '../types';

// Simulating a database using LocalStorage for demonstration purposes.
// In a real app, you would replace these calls with Firebase Firestore or MongoDB fetch calls.

const DB_KEYS = {
  USERS: 'techcareeros_users',
  SESSIONS: 'techcareeros_sessions',
  ANALYTICS: 'techcareeros_events',
  SUBMISSIONS: 'techcareeros_submissions'
};

export const saveUser = (user: UserProfile) => {
  try {
    const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '{}');
    users[user.id] = { ...user, lastLogin: Date.now() };
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    
    // Track sign in event
    trackEvent('user_login', { userId: user.id });
  } catch (e) {
    console.error("DB Error:", e);
  }
};

export const trackEvent = (eventName: string, data: any) => {
  try {
    const events = JSON.parse(localStorage.getItem(DB_KEYS.ANALYTICS) || '[]');
    events.push({
      event: eventName,
      data,
      timestamp: Date.now()
    });
    localStorage.setItem(DB_KEYS.ANALYTICS, JSON.stringify(events));
  } catch (e) {
    console.error("Analytics Error:", e);
  }
};

export const saveSubmission = (submission: Submission) => {
  try {
    const submissions = JSON.parse(localStorage.getItem(DB_KEYS.SUBMISSIONS) || '[]');
    submissions.push(submission);
    localStorage.setItem(DB_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    return true;
  } catch (e) {
    console.error("Submission Error:", e);
    return false;
  }
};

export const getSubmissions = (): Submission[] => {
  try {
    return JSON.parse(localStorage.getItem(DB_KEYS.SUBMISSIONS) || '[]');
  } catch (e) {
    return [];
  }
};
