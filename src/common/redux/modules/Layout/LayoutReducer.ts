import { produce } from 'immer';
import { LayoutDispatchUnion } from './LayoutActions';
import { ILayoutState } from './LayoutInterface';
import { LayoutTypes } from './LayoutTypes';

const initialState: ILayoutState = {
  hideContentPadding: false
};

const LayoutReducer = (state = initialState, action: LayoutDispatchUnion): ILayoutState =>
  produce(state, (draft) => {
    switch (action.type) {
      case LayoutTypes.LAYOUT_HIDE_CONTENT_PADDING: {
        draft.hideContentPadding = action.payload.hideContentPadding;

        break;
      }
    }
  });

export default LayoutReducer;
