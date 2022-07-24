import { Dispatch } from 'redux';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import { LayoutTypes } from './LayoutTypes';

const setHidePaddingAction = (hideContentPadding: boolean) => (dispatch: Dispatch) => {
  dispatch(LayoutDispatch.setHidePadding(hideContentPadding));
};

export const LayoutDispatch = {
  setHidePadding: (hideContentPadding: boolean) =>
    createActionHelper(LayoutTypes.LAYOUT_HIDE_CONTENT_PADDING, { hideContentPadding })
};

export type LayoutDispatchUnion = ActionsUnion<typeof LayoutDispatch>;

export default {
  setHidePaddingAction
};
