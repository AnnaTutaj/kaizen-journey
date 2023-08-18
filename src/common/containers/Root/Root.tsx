import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@common/containers/App';
import moduleStore from '@common/redux/moduleStore';
import DarkModeProvider from '@common/contexts/DarkMode/DarkModeProvider';
import UserProfileProvider from '@common/contexts/UserProfile/UserProfileProvider';

const Root: React.FC = () => {
  return (
    <Provider store={moduleStore}>
      <DarkModeProvider>
        <UserProfileProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProfileProvider>
      </DarkModeProvider>
    </Provider>
  );
};

export default Root;
