import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { IGratitudeModel } from './GratitudeModel';
import dayjs, { Dayjs } from 'dayjs';
import { secondsToHoursAndMinutes, hoursAndMinutesToSeconds } from '@common/helpers/TimeHelper';

export const maxTitleLength = 100;
export const maxDescriptionLength = 2500;

export interface IGratitudeFormModel {
  title: string;
  description: string;
  date: Dayjs;
  isPublic: boolean;
  color: CategoryColorType;
  tags: string[];
  imageURLs: string[];
  hours?: number | undefined;
  minutes?: number | undefined;
}

export interface IGratitudeFormModelDTO {
  title: string;
  description: string;
  date: Date;
  isPublic: boolean;
  createdByUid: string;
  createdBy: string;
  createdByPictureURL: string;
  color: CategoryColorType;
  tags: string[];
  imageURLs: string[];
  seconds: number;
}

class GratitudeFormModel {
  static serializeToCreate({
    createdByUid,
    createdBy,
    createdByPictureURL,
    title,
    description,
    date,
    isPublic,
    color,
    tags,
    imageURLs,
    hours,
    minutes
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
      tags: tags || [],
      imageURLs: imageURLs || [],
      seconds: hoursAndMinutesToSeconds(hours || 0, minutes || 0)
    };
  }

  static serializeToUpdate({
    title,
    description,
    date,
    isPublic,
    color,
    tags,
    imageURLs,
    hours,
    minutes
  }: IGratitudeFormModel): Partial<IGratitudeFormModelDTO> {
    return {
      title: title,
      description: description || '',
      date: date.toDate(),
      isPublic: isPublic || false,
      color: color || 'default',
      tags: tags || [],
      imageURLs: imageURLs || [],
      seconds: hoursAndMinutesToSeconds(hours || 0, minutes || 0)
    };
  }

  static build(data: IGratitudeModel): IGratitudeFormModel {
    const { hours, minutes } = secondsToHoursAndMinutes(data.seconds);
    return {
      title: data.title,
      description: data.description || '',
      date: dayjs(data.date.seconds * 1000),
      isPublic: data.isPublic ?? false,
      color: data.color ? data.color : 'default',
      tags: data.tags ? data.tags : [],
      imageURLs: data.imageURLs ? data.imageURLs : [],
      hours: hours,
      minutes: minutes
    };
  }
}

export default GratitudeFormModel;
