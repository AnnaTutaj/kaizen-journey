import { QueryDocumentSnapshot } from '@firebase/firestore';
import { db } from '@common/util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CategoryColorType } from '@common/containers/App/ColorPalette';

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
  color: CategoryColorType;
  tags: string[];
  imageURLs: string[];
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
  color?: CategoryColorType;
  tags?: string[];
  imageURLs?: string[];
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
    public color: CategoryColorType,
    public tags: string[],
    public imageURLs: string[]
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
      dto.color || 'default',
      dto.tags || [],
      dto.imageURLs || []
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
