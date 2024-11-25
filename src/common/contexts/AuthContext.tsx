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
  AdditionalUserInfo,
  sendPasswordResetEmail
} from 'firebase/auth';
import { User as FirebaseUser } from 'firebase/auth';
import { UserCredential as FirebaseUserCredential } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import UserActions from '@common/redux/UserActions';
import { useSelector } from 'react-redux';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import useErrorMessage from '@common/hooks/useErrorMessage';
import { IUserProfile, initUserProfile, useUserProfile } from './UserProfile/UserProfileContext';
import { Language } from '@common/constants/Language';
import UserResource from '@common/api/UserResource';

export interface IAuthContext {
  userAuth: FirebaseUser | null;
  isUserLoading: boolean;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
  login?: (email: string, password: string) => Promise<FirebaseUserCredential>;
  register: (email: string, password: string) => void;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
  updateProfileSettings: (values: Partial<IUserProfile>) => Promise<void>;
  updateProfileTheme: (values: Pick<IUserProfile, 'theme'>) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  userAuth: null,
  isUserLoading: false,
  signInWithGoogle: () => {},
  signInWithFacebook: () => {},
  register: () => {},
  resetPassword: async () => {},
  logout: () => {},
  updateProfileSettings: async () => {},
  updateProfileTheme: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: any) {
  const dispatch = useDispatch();
  const { showError } = useErrorMessage();
  const { setUserProfile } = useUserProfile();

  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);
  const [userAuth, setUserAuth] = useState<FirebaseUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      setIsUserLoading(true);
      setUserAuth(user ? user : null);

      if (user?.uid) {
        const snap = await UserResource.fetchById(user.uid);

        if (snap.exists()) {
          const userSnap = snap.data();

          setUserProfile({
            uid: user.uid,
            createdAt: userSnap.createdAt || '',
            pictureURL: userSnap.pictureURL || '',
            username: userSnap.username || '',
            language: userSnap?.language || Language.en,
            tags: userSnap.tags || [],
            categories: userSnap.categories || [],
            theme: userSnap.theme || {}
          });
        } else {
          setUserProfile({ ...initUserProfile });
          setUserAuth(null);
        }
      } else {
        setUserProfile({ ...initUserProfile });
      }
      setIsUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [setUserProfile]);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const getProfile = async () => {
    if (!userAuth) {
      return;
    }

    setIsUserLoading(true);

    const snap = await UserResource.fetchById(userAuth.uid);

    if (snap.exists()) {
      const userSnap = snap.data();
      setUserProfile({
        uid: userSnap.id,
        createdAt: userSnap.createdAt || '',
        pictureURL: userSnap.pictureURL || '',
        username: userSnap.username || '',
        language: userSnap?.language || Language.en,
        tags: userSnap.tags || [],
        categories: userSnap.categories || [],
        theme: userSnap.theme || {}
      });
    }
    setIsUserLoading(false);
  };

  const updateProfileSettings = async (values: Partial<IUserProfile>) => {
    if (userAuth) {
      await UserResource.update(userAuth.uid, {
        username: values.username,
        language: values.language,
        tags: values.tags,
        categories: values.categories
      });
      getProfile();
    }
  };

  const updateProfileTheme = async (values: Pick<IUserProfile, 'theme'>) => {
    if (userAuth) {
      await UserResource.update(userAuth.uid, {
        theme: values.theme
      });
      getProfile();
    }
  };

  const logout = () => {
    UserActions.userLogoutAction()(dispatch);
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
        language: siteLanguage,
        createdAt: serverTimestamp()
      };

      await UserResource.setDoc(userCredential.user.uid, { ...newUser });
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);

      const details: AdditionalUserInfo | null = getAdditionalUserInfo(userCredential);
      if (details?.isNewUser) {
        const newUser = {
          username: userCredential.user.displayName,
          pictureURL: userCredential.user.photoURL,
          language: siteLanguage,
          createdAt: serverTimestamp()
        };

        //todo: spr gdzie jest polaczene z db i tam przeniesc do resource
        await UserResource.setDoc(userCredential.user.uid, { ...newUser });
      }
    } catch (error) {
      showError(error);
    }
  };

  const value: IAuthContext = {
    userAuth,
    isUserLoading,
    signInWithGoogle,
    signInWithFacebook,
    login,
    register,
    resetPassword,
    logout,
    updateProfileSettings,
    updateProfileTheme
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
