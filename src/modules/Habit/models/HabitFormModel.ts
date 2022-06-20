import { CategoryColorsDTO } from '@common/constants/CategoryColors';
import { IHabitModel } from './HabitModel';

export interface IHabitFormModel {
  name: string;
  description: string;
  color: CategoryColorsDTO;
}

export interface IHabitFormModelDTO {
  name: string;
  description: string;
  isArchived: boolean;
  createdByUid: string;
  color: CategoryColorsDTO;
  datesChecked: string[];
  datesSkipped: string[];
}

class HabitFormModel {
  static serializeToCreate({
    createdByUid,
    name,
    description,
    color
  }: IHabitFormModel & {
    createdByUid: string;
  }): IHabitFormModelDTO {
    return {
      createdByUid,
      name: name,
      description: description || '',
      isArchived: false,
      color: color || 'default',
      datesChecked: [],
      datesSkipped: []
    };
  }

  static serializeToUpdate({ name, description, color }: IHabitFormModel): Partial<IHabitFormModelDTO> {
    return {
      name: name,
      description: description || '',
      color: color || 'default'
    };
  }

  static build(data: IHabitModel): IHabitFormModel {
    return {
      name: data.name,
      description: data.description || '',
      color: data.color ? data.color.name : 'default'
    };
  }
}

export default HabitFormModel;
