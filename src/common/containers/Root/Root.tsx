import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@common/containers/App';
import moduleStore from '@common/redux/moduleStore';
import ThemeProvider from '@common/contexts/Theme/ThemeProvider';

const Root: React.FC = () => {
  return (
    <Provider store={moduleStore}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
