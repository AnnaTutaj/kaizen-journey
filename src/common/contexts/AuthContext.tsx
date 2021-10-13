import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@common/util/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  confirmPasswordReset,
  getAdditionalUserInfo,
  AdditionalUserInfo
} from 'firebase/auth';
import { User as FirebaseUser } from 'firebase/auth';
import { UserCredential as FirebaseUserCredential } from 'firebase/auth';
import { serverTimestamp, doc, setDoc, getDoc } from 'firebase/firestore';

export interface IUserProfile {
  uid: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
}
export interface IAuthContext {
  userAuth: FirebaseUser | null;
  userProfile: IUserProfile | null;
  isUserLoading: boolean;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
  login?: (email: string, password: string) => Promise<FirebaseUserCredential>;
  register: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  userAuth: null,
  userProfile: null,
  isUserLoading: false,
  signInWithGoogle: () => {},
  signInWithFacebook: () => {},
  register: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: any) {
  const [userAuth, setUserAuth] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      setIsUserLoading(true);
      setUserAuth(user ? user : null);

      if (user?.uid) {
        const snap = await getDoc(doc(db, 'users', user.uid));

        if (snap.exists()) {
          const userSnap = snap.data();

          setUserProfile({
            uid: user.uid,
            createdAt: userSnap.createdAt,
            pictureURL: userSnap.pictureURL,
            username: userSnap.username
          });
        } else {
          setUserAuth(null);
        }
      }
      setIsUserLoading(false);
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

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    const details: AdditionalUserInfo | null = getAdditionalUserInfo(userCredential);
    if (details?.isNewUser) {
      const newUser = {
        username: userCredential.user.displayName,
        pictureURL: userCredential.user.photoURL,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, `users/${userCredential.user.uid}`), { ...newUser });
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    const details: AdditionalUserInfo | null = getAdditionalUserInfo(userCredential);
    if (details?.isNewUser) {
      const newUser = {
        username: userCredential.user.displayName,
        pictureURL: userCredential.user.photoURL,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, `users/${userCredential.user.uid}`), { ...newUser });
    }
  };

  const value = {
    userAuth,
    userProfile,
    isUserLoading,
    signInWithGoogle,
    signInWithFacebook,
    login,
    register,
    logout
    // forgotPassword,
    // resetPassword
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
