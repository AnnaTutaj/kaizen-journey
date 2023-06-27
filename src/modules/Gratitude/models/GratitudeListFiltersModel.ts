import { CategoryColorType } from '@common/containers/App/ColorPalette';

export interface IGratitudeListFiltersModel {
  color?: CategoryColorType;
  tags?: string[];
  isPublic?: boolean;
}

export interface IGratitudeListFiltersModelDTO {
  color?: CategoryColorType;
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
