import { QueryDocumentSnapshot } from '@firebase/firestore';
import { db } from '@common/util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getSpecifiedStreaks, IStreak } from '@common/helpers/StreakHelper';
import { CategoryColorType } from '@common/containers/App/ColorPalette';

export interface IHabitModel {
  id: string;
  name: string;
  description: string | undefined;
  datesChecked: string[];
  datesSkipped: string[];
  createdByUid: string;
  isArchived: boolean;
  color: CategoryColorType;
  currentStreak: IStreak;
  longestStreak: IStreak;
  isPublic: boolean;
}

export interface IHabitModelDTO {
  id: string;
  name: string;
  description?: string;
  datesChecked: string[];
  datesSkipped: string[];
  createdByUid: string;
  isArchived: boolean;
  isPublic: boolean;
  color?: CategoryColorType;
}

class HabitModel implements IHabitModel {
  constructor(
    public id: string,
    public name: string,
    public description: string | undefined,
    public datesChecked: string[],
    public datesSkipped: string[],
    public createdByUid: string,
    public isArchived: boolean,
    public isPublic: boolean,
    public color: CategoryColorType,
    public currentStreak: IStreak,
    public longestStreak: IStreak
  ) {}

  static build(dto: IHabitModelDTO): IHabitModel {
    const { longestStreak, currentStreak } = getSpecifiedStreaks(dto.datesChecked, dto.datesSkipped);

    return new HabitModel(
      dto.id,
      dto.name,
      dto.description || undefined,
      dto.datesChecked,
      dto.datesSkipped,
      dto.createdByUid,
      dto.isArchived,
      dto.isPublic,
      dto.color || 'default',
      currentStreak,
      longestStreak
    );
  }

  static converter = {
    toFirestore: (data: IHabitModelDTO) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      return { id: snap.id, ...snap.data() } as IHabitModelDTO;
    }
  };

  static fetchById = (id: string) => getDoc(doc(db, 'habits', id).withConverter(HabitModel.converter));
}

export default HabitModel;
