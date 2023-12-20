import { ILayout } from './layout';

interface NewToken {
  layout: ILayout;
}

declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends NewToken {}
}
