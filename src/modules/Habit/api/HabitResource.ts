import { IHabitModelDTO } from '../models/HabitModel';
import { db } from '@common/util/firebase';
import {
  doc,
  QueryDocumentSnapshot,
  getDoc,
  QueryConstraint,
  getDocs,
  query,
  collection,
  deleteDoc,
  addDoc,
  updateDoc,
  setDoc
} from 'firebase/firestore';
import { IHabitFormModelDTO } from '../models/HabitFormModel';
import { IHabitOrderModelDTO } from '../models/HabitOrderModel';

const converter = {
  toFirestore: (data: IHabitModelDTO) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return { id: snap.id, ...snap.data() } as IHabitModelDTO;
  }
};

const converterOrder = {
  toFirestore: (data: IHabitOrderModelDTO) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return { ...snap.data() } as IHabitOrderModelDTO;
  }
};

export const HabitResource = {
  fetchById: (id: string) => getDoc(doc(db, 'habits', id).withConverter(converter)),
  fetchCollection: (queryParams: QueryConstraint[]) =>
    getDocs(query(collection(db, 'habits').withConverter(converter), ...queryParams)),
  create: (values: IHabitFormModelDTO) => addDoc(collection(db, 'habits'), values),
  update: (id: string, values: Partial<IHabitFormModelDTO>) => updateDoc(doc(db, 'habits', id), values),
  delete: (id: string) => deleteDoc(doc(db, 'habits', id)),
  fetchOrder: (userId: string) => getDoc(doc(db, 'habitsOrder', userId).withConverter(converterOrder)),
  setOrder: (userId: string, values: IHabitOrderModelDTO) => setDoc(doc(db, 'habitsOrder', userId), values)
};

export default HabitResource;
