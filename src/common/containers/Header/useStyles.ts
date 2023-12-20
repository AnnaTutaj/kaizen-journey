import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => {
  return {
    layoutHeader: css`
      position: fixed;
      z-index: 3;
      width: 100%;
      height: ${token.layout.headerHeight};
      padding: 0 50px;
      line-height: ${token.layout.headerHeight};
      background-color: ${token.layout.colorHeaderBg};

      @media (width <= 767.98px) {
        padding: 0 16px;
      }
    `,

    logoContainer: css`
      display: flex;
      align-items: center;
      float: left;
      height: ${token.layout.headerHeight};
      margin-right: 20px;
      cursor: pointer;
    `,
    logoImage: css`
      height: 40px;
    `,
    hamburgerMenuIconContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      float: right;
      height: 100%;
      margin-left: 20px;
      cursor: pointer;
    `,
    hamburgerMenuIcon: css`
      color: ${token.layout.colorDarkGray};
      font-size: 34px;
    `,
    avatarContainer: css`
      float: right;
    `,
    darkModeSwitchContainer: css`
      float: right;
      margin: 0 20px;
    `,
    menuDrawer: css`
      .ant-drawer-body {
        padding-top: 15px;
        background-color: ${token.layout.colorHeaderBg};
      }

      .ant-menu-item {
        height: 50px;
        line-height: 50px;
      }
    `,
    menuDrawerCloseIconContainer: css`
      float: right;
      cursor: pointer;
    `,
    menuDrawerCloseIcon: css`
      color: ${token.layout.colorDarkGray};
      font-size: 40px;
      vertical-align: -10px;
    `
  };
});
