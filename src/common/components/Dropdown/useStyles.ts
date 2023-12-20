import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  dropdownSubMenuOverlay: css`
    .ant-dropdown-menu {
      padding: 8px 12px;
    }
  `,
  dropdownMenuItem: css`
    min-width: 180px;
    margin: 0 8px;
    padding: 8px !important;
    border-radius: ${token.borderRadiusSM};
  `,
  dropdownOverlay: css`
    .ant-dropdown-menu {
      padding: 8px;
    }

    .ant-dropdown-menu-item-group-list {
      margin: 0 !important;

      .ant-dropdown-menu-submenu {
        margin: 0;
        padding: 0 !important;

        .ant-dropdown-menu-submenu-title {
          padding: 8px;
        }
      }
    }
  `,
  dropdownMenuItemIcon: css`
    margin-left: 10px;
  `,
  dropdownMenuItemSpaceError: css`
    color: ${token.colorErrorText};
  `
}));

export default useStyles;