export interface IHabitOrderModel {
  order: string[];
}

export interface IHabitOrderModelDTO {
  order: string[];
}

class HabitOrderModel implements IHabitOrderModel {
  constructor(public order: string[]) {}

  static build(dto: IHabitOrderModelDTO): IHabitOrderModel {
    return new HabitOrderModel(dto.order);
  }
}

export default HabitOrderModel;
