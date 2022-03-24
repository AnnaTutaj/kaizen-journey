import { QueryDocumentSnapshot } from '@firebase/firestore';

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
    public createdBy: string | undefined
  ) {}

  static build(dto: IGratitudeModelDTO): IGratitudeModel {
    return new GratitudeModel(
      dto.id,
      dto.title,
      dto.description || undefined,
      dto.date,
      dto.createdByUid,
      dto.createdByPictureURL || undefined,
      dto.createdBy || undefined
    );
  }

  static converter = {
    toFirestore: (data: GratitudeModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      return { id: snap.id, ...snap.data() } as IGratitudeModelDTO;
    }
  };
}

export default GratitudeModel;
