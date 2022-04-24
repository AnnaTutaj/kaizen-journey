import { CategoryColorsDTO } from '@common/constants/CategoryColors';
import { IGratitudeModel } from './GratitudeModel';
import moment, { Moment } from 'moment';

export interface IGratitudeFormModel {
  title: string;
  description: string;
  date: Moment;
  isPublic: boolean;
  color: CategoryColorsDTO;
  tags: string[];
}

export interface IGratitudeFormModelDTO {
  title: string;
  description: string;
  date: Date;
  isPublic: boolean;
  createdByUid: string;
  createdBy: string;
  createdByPictureURL: string;
  color: CategoryColorsDTO;
  tags: string[];
}

class GratitudeFormModel {
  static  serializeToCreate({
    createdByUid,
    createdBy,
    createdByPictureURL,
    title,
    description,
    date,
    isPublic,
    color,
    tags
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
      isPublic: isPublic || false,
      color: color || 'default',
      tags: tags || []
    };
  }

  static serializeToUpdate({
    title,
    description,
    date,
    isPublic,
    color,
    tags
  }: IGratitudeFormModel): Partial<IGratitudeFormModelDTO> {
    return {
      title: title,
      description: description || '',
      date: date.toDate(),
      isPublic: isPublic || false,
      color: color || 'default',
      tags: tags || []
    };
  }

  static build(data: IGratitudeModel): IGratitudeFormModel {
    return {
      title: data.title,
      description: data.description || '',
      date: moment(data.date.seconds * 1000),
      isPublic: data.isPublic ?? false,
      color: data.color ? data.color.name : 'default',
      tags: data.tags ? data.tags : []
    };
  }
}

export default GratitudeFormModel;
