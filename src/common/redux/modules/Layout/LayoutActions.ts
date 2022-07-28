import { Dispatch } from 'redux';
import { ActionsUnion, createAction as createActionHelper } from '@common/helpers/ActionHelper';
import { LayoutTypes } from './LayoutTypes';
import { ITranslationConfig } from '@common/lang/config/types';

const setHidePaddingAction = (hideContentPadding: boolean) => (dispatch: Dispatch) => {
  dispatch(LayoutDispatch.setHidePadding(hideContentPadding));
};

const setSiteLanguageAction = (siteLanguage: ITranslationConfig['locale']) => (dispatch: Dispatch) => {
  dispatch(LayoutDispatch.setSiteLanguageAction(siteLanguage));
};

export const LayoutDispatch = {
  setHidePadding: (hideContentPadding: boolean) =>
    createActionHelper(LayoutTypes.LAYOUT_HIDE_CONTENT_PADDING, { hideContentPadding }),
  setSiteLanguageAction: (siteLanguage: ITranslationConfig['locale']) =>
    createActionHelper(LayoutTypes.LAYOUT_SET_SITE_LANGUAGE, { siteLanguage })
};

export type LayoutDispatchUnion = ActionsUnion<typeof LayoutDispatch>;

export default {
  setHidePaddingAction,
  setSiteLanguageAction
};
