import { QueryDocumentSnapshot } from '@firebase/firestore';
import { db } from '@common/util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CategoryColors } from '@common/constants/CategoryColors';
import { CategoryColorsDTO, CategoryColorsLighten } from '@common/constants/CategoryColors';
import { getSpecifiedStreaks, IStreak } from '@common/helpers/StreakHelper';

export interface IHabitModel {
  id: string;
  name: string;
  description: string | undefined;
  datesChecked: string[];
  datesSkipped: string[];
  createdByUid: string;
  isArchived: boolean;
  color: { name: CategoryColorsDTO; value: CategoryColors };
  colorLighten: { name: CategoryColorsDTO; value: CategoryColorsLighten };
  currentStreak: IStreak;
  longestStreak: IStreak;
}

export interface IHabitModelDTO {
  id: string;
  name: string;
  description?: string;
  datesChecked: string[];
  datesSkipped: string[];
  createdByUid: string;
  isArchived: boolean;
  color?: CategoryColorsDTO;
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
    public color: { name: CategoryColorsDTO; value: CategoryColors },
    public colorLighten: { name: CategoryColorsDTO; value: CategoryColorsLighten },
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
      dto.color
        ? { name: dto.color, value: CategoryColors[dto.color] }
        : { name: 'default', value: CategoryColors.default },
      dto.color
        ? { name: dto.color, value: CategoryColorsLighten[dto.color] }
        : { name: 'default', value: CategoryColorsLighten.default },
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
