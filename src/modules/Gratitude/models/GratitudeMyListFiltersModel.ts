import { CategoryColorsDTO } from '@common/constants/CategoryColors';

export interface IGratitudeMyListFiltersModel {
  color?: CategoryColorsDTO;
  tags?: string[];
  isPublic?: boolean;
}

export interface IGratitudeMyListFiltersModelDTO {
  color?: CategoryColorsDTO;
  tags?: string[];
  isPublic?: boolean;
}

class GratitudeMyListFiltersModel {
  static serialize({ color, tags, isPublic }: IGratitudeMyListFiltersModel): IGratitudeMyListFiltersModelDTO {
    return {
      color: color || undefined,
      tags: tags && tags.length ? tags : undefined,
      isPublic: isPublic !== undefined ? isPublic : undefined
    };
  }
}

export default GratitudeMyListFiltersModel;
