import { Action } from 'redux';

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P): any {
  return { type, payload };
}

interface ActionsCreatorsMapObject {
  [actionCreator: string]: (...args: any[]) => any;
}

export type ActionsUnion<A extends ActionsCreatorsMapObject> = ReturnType<A[keyof A]>;
