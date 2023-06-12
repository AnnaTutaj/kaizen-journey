import { GlobalToken } from 'antd';
import 'styled-components';
import { ILayout } from './layout';

declare module 'styled-components' {
  export interface DefaultTheme {
    antd: GlobalToken;
    layout: ILayout;
  }
}
