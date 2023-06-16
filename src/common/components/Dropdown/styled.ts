import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Space } from 'antd';
import styled, { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const DropdownMenuItem = 'DropdownMenuItem';
export const DropdownSubMenuOverlay = 'DropdownSubMenuOverlay';
export const DropdownOverlay = 'DropdownOverlay';

export const GlobalStyle = createGlobalStyle`
  .${DropdownSubMenuOverlay} {
    .ant-dropdown-menu {
      padding: 8px 12px;
    }
  }

  .${DropdownMenuItem} {
    min-width: 180px;
    margin: 0 8px;
    padding: 8px !important;
    border-radius: ${({ theme }) => theme.antd.borderRadiusSM};
  }

  .${DropdownOverlay} {
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
  }
`;

export const StyledDropdown = styled(Dropdown)``;

export const StyledDropdownMenuItemIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
`;

export const StyledDropdownMenuItemSpace = styled(Space)<{ $colorError: boolean }>`
  ${({ $colorError }) =>
    $colorError &&
    css`
      color: ${({ theme }) => theme.antd.colorErrorText};
    `}
`;
