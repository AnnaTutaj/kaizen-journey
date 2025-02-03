import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { IHabitModel } from './HabitModel';
import { FieldValue } from 'firebase/firestore';

export interface IHabitFormModel {
  name: string;
  description: string;
  isPublic: boolean;
  color: CategoryColorType;
  tags: string[];
}

export interface IHabitFormModelDTO {
  name: string;
  description: string;
  isArchived: boolean;
  isPublic: boolean;
  createdByUid: string;
  color: CategoryColorType;
  datesChecked: string[] | FieldValue;
  datesSkipped: string[] | FieldValue;
  tags: string[];
}

class HabitFormModel {
  static serializeToCreate({
    createdByUid,
    name,
    description,
    isPublic,
    color,
    tags
  }: IHabitFormModel & {
    createdByUid: string;
  }): IHabitFormModelDTO {
    return {
      createdByUid,
      name: name,
      description: description || '',
      isArchived: false,
      isPublic: isPublic || false,
      color: color || 'default',
      datesChecked: [],
      datesSkipped: [],
      tags: tags || []
    };
  }

  static serializeToUpdate({ name, description, color, isPublic, tags }: IHabitFormModel): Partial<IHabitFormModelDTO> {
    return {
      name: name,
      description: description || '',
      isPublic: isPublic || false,
      color: color || 'default',
      tags: tags || []
    };
  }

  static build(data: IHabitModel): IHabitFormModel {
    return {
      name: data.name,
      description: data.description || '',
      isPublic: data.isPublic ?? false,
      color: data.color ? data.color : 'default',
      tags: data.tags ? data.tags : []
    };
  }
}

export default HabitFormModel;
