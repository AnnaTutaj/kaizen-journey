import { IModule } from 'redux-dynamic-modules';
import { ILayoutOwnState } from './LayoutInterface';
import LayoutReducer from './LayoutReducer';

const LayoutModule: IModule<ILayoutOwnState> = {
  id: 'layoutModule',
  reducerMap: {
    layout: LayoutReducer
  } as any
};

export default LayoutModule;
