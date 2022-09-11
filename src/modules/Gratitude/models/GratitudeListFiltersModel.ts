import { CategoryColorsDTO } from '@common/constants/CategoryColors';

export interface IGratitudeListFiltersModel {
  color?: CategoryColorsDTO;
  tags?: string[];
  isPublic?: boolean;
}

export interface IGratitudeListFiltersModelDTO {
  color?: CategoryColorsDTO;
  tags?: string[];
  isPublic?: boolean;
}

class GratitudeListFiltersModel {
  static serialize({ color, tags, isPublic }: IGratitudeListFiltersModel): IGratitudeListFiltersModelDTO {
    return {
      color: color || undefined,
      tags: tags && tags.length ? tags : undefined,
      isPublic: isPublic !== undefined ? isPublic : undefined
    };
  }
}

export default GratitudeListFiltersModel;
