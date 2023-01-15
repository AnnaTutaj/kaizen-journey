import { ConfigProvider, theme } from 'antd';
import './LightTheme.less';
import { themeToken } from './themeToken';

interface ILightTheme {
  children: React.ReactElement;
}

export const LightTheme: React.FC<ILightTheme> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: themeToken,
        algorithm: theme.defaultAlgorithm
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default LightTheme;
