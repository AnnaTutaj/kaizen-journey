import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@common/util/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset
} from 'firebase/auth';
import { User as FirebaseUser } from 'firebase/auth';
import { UserCredential as FirebaseUserCredential } from 'firebase/auth';

export interface IAuthContext {
  currentUser: FirebaseUser | null;
  signInWithGoogle: () => void;
  login?: (email: string, password: string) => Promise<FirebaseUserCredential>;
  register: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  signInWithGoogle: () => {},
  register: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //   function forgotPassword(email) {
  //     return sendPasswordResetEmail(auth, email, {
  //       url: `http://localhost:3000/login`
  //     });
  //   }

  //   function resetPassword(oobCode, newPassword) {
  //     return confirmPasswordReset(auth, oobCode, newPassword);
  //   }

  function logout() {
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    register,
    logout
    // forgotPassword,
    // resetPassword
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
