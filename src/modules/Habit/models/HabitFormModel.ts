import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { IHabitModel } from './HabitModel';

export interface IHabitFormModel {
  name: string;
  description: string;
  isPublic: boolean;
  color: CategoryColorType;
}

export interface IHabitFormModelDTO {
  name: string;
  description: string;
  isArchived: boolean;
  isPublic: boolean;
  createdByUid: string;
  color: CategoryColorType;
  datesChecked: string[];
  datesSkipped: string[];
}

class HabitFormModel {
  static serializeToCreate({
    createdByUid,
    name,
    description,
    isPublic,
    color
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
      datesSkipped: []
    };
  }

  static serializeToUpdate({ name, description, color, isPublic }: IHabitFormModel): Partial<IHabitFormModelDTO> {
    return {
      name: name,
      description: description || '',
      isPublic: isPublic || false,
      color: color || 'default'
    };
  }

  static build(data: IHabitModel): IHabitFormModel {
    return {
      name: data.name,
      description: data.description || '',
      isPublic: data.isPublic ?? false,
      color: data.color ? data.color : 'default'
    };
  }
}

export default HabitFormModel;
