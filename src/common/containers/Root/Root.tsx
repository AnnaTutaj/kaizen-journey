import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@common/containers/App';

const Root: React.FC = () => {
  //todo add Provider + error handler
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default Root;
