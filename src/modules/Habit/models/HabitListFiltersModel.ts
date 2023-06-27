import { CategoryColorType } from '@common/containers/App/ColorPalette';

export interface IHabitListFiltersModel {
  color?: CategoryColorType;
  isArchived?: boolean;
  isPublic?: boolean;
}

export interface IHabitListFiltersModelDTO {
  color?: CategoryColorType;
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
