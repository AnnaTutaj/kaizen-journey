import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@common/util/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  getAdditionalUserInfo,
  AdditionalUserInfo
} from 'firebase/auth';
import { User as FirebaseUser } from 'firebase/auth';
import { UserCredential as FirebaseUserCredential } from 'firebase/auth';
import { serverTimestamp, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export enum Language {
  pl = 'pl',
  en = 'en'
}

export interface IUserProfile {
  uid: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  pictureURL: string;
  username: string;
  language: Language | undefined;
  tags: string[];
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
  updateProfile: (values: Partial<IUserProfile>) => void;
}

export const AuthContext = createContext<IAuthContext>({
  userAuth: null,
  userProfile: null,
  isUserLoading: false,
  signInWithGoogle: () => {},
  signInWithFacebook: () => {},
  register: () => {},
  logout: () => {},
  updateProfile: (values: Partial<IUserProfile>) => {}
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
            username: userSnap.username,
            language: userSnap?.language || Language.en,
            tags: userSnap.tags || []
          });
        } else {
          setUserProfile(null);
          setUserAuth(null);
        }
      } else {
        setUserProfile(null);
      }
      setIsUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfile = async (values: Partial<IUserProfile>) => {
    if (userAuth) {
      const userRef = doc(db, 'users', userAuth.uid);

      await updateDoc(userRef, {
        username: values.username,
        language: values.language,
        tags: values.tags
      });

      setIsUserLoading(true);

      const snap = await getDoc(doc(db, 'users', userAuth.uid));

      if (snap.exists()) {
        const userSnap = snap.data();

        setUserProfile({
          uid: userAuth.uid,
          createdAt: userSnap.createdAt,
          pictureURL: userSnap.pictureURL,
          username: userSnap.username,
          language: userSnap?.language || Language.en,
          tags: userSnap.tags || []
        });
      }
      setIsUserLoading(false);
    }
  };

  //   function forgotPassword(email) {
  //     return sendPasswordResetEmail(auth, email, {
  //       url: `http://localhost:3000/login`
  //     });
  //   }

  //   function resetPassword(oobCode, newPassword) {
  //     return confirmPasswordReset(auth, oobCode, newPassword);
  //   }

  const logout = () => {
    return signOut(auth);
  };

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
    logout,
    updateProfile
    // forgotPassword,
    // resetPassword
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
