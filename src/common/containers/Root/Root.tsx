import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@common/containers/App';
import AuthContextProvider from '@common/contexts/AuthContext';
import moduleStore from '@common/redux/moduleStore';

const Root: React.FC = () => {
  return (
    <Provider store={moduleStore}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  );
};

export default Root;
