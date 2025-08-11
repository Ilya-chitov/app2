import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { store } from '../store';
import { setUser, setLoading, setError } from '../store/slices/authSlice';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

class FirebaseService {
  constructor() {
    this.initAuthListener();
  }

  private initAuthListener() {
    store.dispatch(setLoading(true));
    
    auth.onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }));
      } else {
        store.dispatch(setUser(null));
      }
      store.dispatch(setLoading(false));
    });
  }

  async signOut() {
    try {
      await auth.signOut();
    } catch (error) {
      store.dispatch(setError(error instanceof Error ? error.message : 'Sign out failed'));
    }
  }

  // TODO: Add sign in methods (email/password, Google, etc.)
  // TODO: Add user profile management
  // TODO: Add password reset functionality
}

export const firebaseService = new FirebaseService();