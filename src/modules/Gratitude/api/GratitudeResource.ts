import { IGratitudeModelDTO } from '../models/GratitudeModel';
import { db } from '@common/util/firebase';
import {
  doc,
  QueryDocumentSnapshot,
  getDoc,
  QueryConstraint,
  getDocs,
  query,
  collection,
  updateDoc,
  deleteDoc,
  addDoc
} from 'firebase/firestore';
import { IGratitudeFormModelDTO } from '../models/GratitudeFormModel';

const converter = {
  toFirestore: (data: IGratitudeModelDTO) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return { id: snap.id, ...snap.data() } as IGratitudeModelDTO;
  }
};

export const GratitudeResource = {
  fetchById: (id: string) => getDoc(doc(db, 'gratitude', id).withConverter(converter)),
  fetchCollection: (queryParams: QueryConstraint[]) =>
    getDocs(query(collection(db, 'gratitude').withConverter(converter), ...queryParams)),
  create: (values: IGratitudeFormModelDTO) => addDoc(collection(db, 'gratitude'), values),
  update: (id: string, values: Partial<IGratitudeFormModelDTO>) => updateDoc(doc(db, 'gratitude', id), values),
  delete: (id: string) => deleteDoc(doc(db, 'gratitude', id))
};

export default GratitudeResource;
