import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
  menu: css`
    &&& {
      background-color: ${token.layout.colorHeaderBg};
      border-right: none;
      border-bottom: none;

      &.ant-menu-horizontal {
        border-bottom: none;
      }

      .ant-menu-item {
        border-radius: ${token.borderRadiusLG}px;
      }

      .ant-menu-item:hover {
        background-color: ${token.colorPrimaryBgHover};
      }
    }
  `,
  mobileMenu: css`
    .ant-menu-item {
      text-align: center;
    }

    .ant-menu-title-content {
      font-size: ${token.fontSizeLG}px;
    }
  `
}));
