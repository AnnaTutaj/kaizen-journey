import { Dispatch } from 'redux';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import { UserTypes } from './UserType';

const userLogoutAction = () => async (dispatch: Dispatch) => {
  dispatch(UserDispatch.logout());
};

export const UserDispatch = {
  logout: () => createActionHelper(UserTypes.USER_LOG_OUT)
};

export type UserDispatchUnion = ActionsUnion<typeof UserDispatch>;

export default {
  userLogoutAction
};
