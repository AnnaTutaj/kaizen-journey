import { ConfigProvider, theme } from 'antd';
import './DarkTheme.less';
import { themeToken } from './themeToken';

interface IDarkTheme {
  children: React.ReactElement;
}

export const DarkTheme: React.FC<IDarkTheme> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: themeToken,
        algorithm: theme.darkAlgorithm
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default DarkTheme;
