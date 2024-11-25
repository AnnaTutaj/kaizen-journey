import { IUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { IUserModelDTO } from '@common/models/UserModel';
import { db } from '@common/util/firebase';
import { doc, FieldValue, getDoc, QueryDocumentSnapshot, setDoc, updateDoc } from 'firebase/firestore';

const converter = {
  toFirestore: (data: IUserModelDTO) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return { id: snap.id, ...snap.data() } as IUserModelDTO;
  }
};

export const UserResource = {
  update: (id: string, values: Partial<IUserProfile>) => updateDoc(doc(db, 'users', id), values),
  fetchById: (id: string) => getDoc(doc(db, 'users', id).withConverter(converter)),
  setDoc: (
    id: string,
    data: {
      username: string | null;
      language: 'pl' | 'en';
      pictureURL?: string | null;
      createdAt: FieldValue;
    }
  ) => setDoc(doc(db, `users/${id}`), data)
};

export default UserResource;
