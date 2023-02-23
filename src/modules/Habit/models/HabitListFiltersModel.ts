import { CategoryColorsDTO } from '@common/constants/CategoryColors';

export interface IHabitListFiltersModel {
  color?: CategoryColorsDTO;
  isArchived?: boolean;
  isPublic?: boolean;
}

export interface IHabitListFiltersModelDTO {
  color?: CategoryColorsDTO;
  isArchived?: boolean;
  isPublic?: boolean;
}

class HabitListFiltersModel {
  static serialize({ color, isArchived, isPublic }: IHabitListFiltersModel): IHabitListFiltersModelDTO {
    return {
      color: color || undefined,
      isArchived: isArchived !== undefined ? isArchived : undefined,
      isPublic: isPublic !== undefined ? isPublic : undefined
    };
  }
}

export default HabitListFiltersModel;
