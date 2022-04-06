import { IGratitudeModel } from './GratitudeModel';
import moment, { Moment } from 'moment';

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
  static serializeToCreate({
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

  static serializeToUpdate({ title, description, date, isPublic }: IGratitudeFormModel): Partial<IGratitudeFormModelDTO> {
    return {
      title: title,
      description: description || '',
      date: date.toDate(),
      isPublic: isPublic || false
    };
  }

  static build(dto: IGratitudeModel): IGratitudeFormModel {
    return {
      title: dto.title,
      description: dto.description || '',
      date: moment(dto.date.seconds * 1000),
      isPublic: dto.isPublic ?? false
    };
  }
}

export default GratitudeFormModel;
