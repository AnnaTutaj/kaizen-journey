import { Language } from '@common/contexts/AuthContext';
import { produce } from 'immer';
import { LayoutDispatchUnion } from './LayoutActions';
import { ILayoutState } from './LayoutInterface';
import { LayoutTypes } from './LayoutTypes';

const initialState: ILayoutState = {
  hideContentPadding: false,
  siteLanguage: Language.en
};

const LayoutReducer = (state = initialState, action: LayoutDispatchUnion): ILayoutState =>
  produce(state, (draft) => {
    switch (action.type) {
      case LayoutTypes.LAYOUT_HIDE_CONTENT_PADDING: {
        draft.hideContentPadding = action.payload.hideContentPadding;

        break;
      }

      case LayoutTypes.LAYOUT_SET_SITE_LANGUAGE: {
        draft.siteLanguage = action.payload.siteLanguage;

        break;
      }
    }
  });

export default LayoutReducer;
