import { CategoryColorsDTO } from '@common/constants/CategoryColors';

export interface IGratitudeMyListFiltersModel {
  color?: CategoryColorsDTO;
  tags?: string[];
}

export interface IGratitudeMyListFiltersModelDTO {
  color?: CategoryColorsDTO;
  tags?: string[];
}

class GratitudeMyListFiltersModel {
  static serialize({ color, tags }: IGratitudeMyListFiltersModel): IGratitudeMyListFiltersModelDTO {
    return {
      color: color || undefined,
      tags: tags && tags.length ? tags : undefined
    };
  }
}

export default GratitudeMyListFiltersModel;
