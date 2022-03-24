import { QueryDocumentSnapshot } from '@firebase/firestore';
import { Moment } from 'moment';

export interface IGratitudeFormModel {
  title: string;
  description: string;
  date: Moment;
  isPublic: boolean;
}

export interface IGratitudeFormModelDTO {
  title: string;
  description: string;
  date: Date;
  isPublic: boolean;
  createdByUid: string;
  createdBy: string;
  createdByPictureURL: string;
}

class GratitudeFormModel {
  static serialize({
    createdByUid,
    createdBy,
    createdByPictureURL,
    title,
    description,
    date,
    isPublic
  }: IGratitudeFormModel & {
    createdByUid: string;
    createdBy: string;
    createdByPictureURL: string;
  }): IGratitudeFormModelDTO {
    return {
      createdByUid,
      createdBy: createdBy || '',
      createdByPictureURL: createdByPictureURL || '',
      title: title,
      description: description || '',
      date: date.toDate(),
      isPublic: isPublic || false
    };
  }
}

export default GratitudeFormModel;
