import { CategoryColorsDTO, CategoryColorsLighten } from '@common/constants/CategoryColors';
import { CategoryColors } from '@common/constants/CategoryColors';
import { QueryDocumentSnapshot } from '@firebase/firestore';
import { db } from '@common/util/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface IGratitudeModel {
  id: string;
  title: string;
  description: string | undefined;
  date: {
    nanoseconds: number;
    seconds: number;
  };
  createdByUid: string;
  createdByPictureURL: string | undefined;
  createdBy: string | undefined;
  isPublic: boolean;
  color: { name: CategoryColorsDTO; value: CategoryColors };
  colorLighten: { name: CategoryColorsDTO; value: CategoryColorsLighten };
}

export interface IGratitudeModelDTO {
  id: string;
  title: string;
  description?: string;
  date: {
    nanoseconds: number;
    seconds: number;
  };
  createdByUid: string;
  createdByPictureURL?: string;
  createdBy?: string;
  isPublic: boolean;
  color?: CategoryColorsDTO;
}

class GratitudeModel implements IGratitudeModel {
  constructor(
    public id: string,
    public title: string,
    public description: string | undefined,
    public date: {
      nanoseconds: number;
      seconds: number;
    },
    public createdByUid: string,
    public createdByPictureURL: string | undefined,
    public createdBy: string | undefined,
    public isPublic: boolean,
    public color: { name: CategoryColorsDTO; value: CategoryColors },
    public colorLighten: { name: CategoryColorsDTO; value: CategoryColorsLighten }
  ) {}

  static build(dto: IGratitudeModelDTO): IGratitudeModel {
    return new GratitudeModel(
      dto.id,
      dto.title,
      dto.description || undefined,
      dto.date,
      dto.createdByUid,
      dto.createdByPictureURL || undefined,
      dto.createdBy || undefined,
      dto.isPublic,
      dto.color
        ? { name: dto.color, value: CategoryColors[dto.color] }
        : { name: 'default', value: CategoryColors.default },
      dto.color
        ? { name: dto.color, value: CategoryColorsLighten[dto.color] }
        : { name: 'default', value: CategoryColorsLighten.default }
    );
  }

  static converter = {
    toFirestore: (data: IGratitudeModelDTO) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      return { id: snap.id, ...snap.data() } as IGratitudeModelDTO;
    }
  };

  static fetchById = (id: string) => getDoc(doc(db, 'gratitude', id).withConverter(GratitudeModel.converter));
}

export default GratitudeModel;
