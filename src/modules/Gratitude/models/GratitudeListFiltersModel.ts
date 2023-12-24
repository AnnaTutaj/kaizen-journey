import { Dayjs } from 'dayjs';
import { CategoryColorType } from '@common/containers/App/ColorPalette';

export interface IGratitudeListFiltersModel {
  color?: CategoryColorType;
  tags?: string[];
  isPublic?: boolean;
  dateFrom?: Dayjs;
  dateTo?: Dayjs;
}

export interface IGratitudeListFiltersModelDTO {
  color?: CategoryColorType;
  tags?: string[];
  isPublic?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

class GratitudeListFiltersModel {
  static serialize({
    color,
    tags,
    isPublic,
    dateFrom,
    dateTo
  }: IGratitudeListFiltersModel): IGratitudeListFiltersModelDTO {
    return {
      color: color || undefined,
      tags: tags && tags.length ? tags : undefined,
      isPublic: isPublic !== undefined ? isPublic : undefined,
      dateFrom: dateFrom ? dateFrom.startOf('day').toDate() : undefined,
      dateTo: dateTo ? dateTo.endOf('day').toDate() : undefined
    };
  }
}

export default GratitudeListFiltersModel;
