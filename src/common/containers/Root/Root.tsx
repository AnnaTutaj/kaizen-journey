import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '@common/containers/App';
import AuthContextProvider from '@common/contexts/AuthContext';

const Root: React.FC = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default Root;
