import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@common/containers/App';
import { configStore } from '@common/util/configStore';
import AuthContextProvider from '@common/contexts/AuthContext'

const Root: React.FC = () => {
  const store = configStore();
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  );
};

export default Root;
