import { IModule } from 'redux-dynamic-modules';
import { IUserGratitudeListOwnState } from './UserGratitudeListInterface';
import UserGratitudeListReducer from './UserGratitudeListReducer';

const UserGratitudeListModule: IModule<IUserGratitudeListOwnState> = {
  id: 'userGratitudeListModule',
  reducerMap: {
    userGratitudeList: UserGratitudeListReducer
  }
};

export default UserGratitudeListModule;
