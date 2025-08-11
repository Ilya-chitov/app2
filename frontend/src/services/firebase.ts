import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { store } from '../store';
import { setUser, setLoading, setError } from '../store/slices/authSlice';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abc123',
};

let app: any = null;
let auth: any = null;

class FirebaseService {
  constructor() {
    // Only initialize Firebase in production or when proper config is available
    if (import.meta.env.PROD || this.hasValidConfig()) {
      try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        this.initAuthListener();
      } catch (error) {
        console.warn('Firebase initialization failed:', error);
        store.dispatch(setError('Firebase initialization failed'));
        store.dispatch(setLoading(false));
      }
    } else {
      console.log('Firebase not initialized - using demo mode');
      store.dispatch(setLoading(false));
    }
  }

  private hasValidConfig(): boolean {
    return !!(
      firebaseConfig.apiKey && 
      firebaseConfig.apiKey !== 'demo-key' &&
      firebaseConfig.projectId && 
      firebaseConfig.projectId !== 'demo-project'
    );
  }

  private initAuthListener() {
    if (!auth) return;
    
    store.dispatch(setLoading(true));
    
    auth.onAuthStateChanged((user: any) => {
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
    if (!auth) {
      console.log('Auth not available - demo mode');
      return;
    }
    
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
export { auth };