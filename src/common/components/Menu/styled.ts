import styled from 'styled-components';
import { Menu } from 'antd';

export const StyledMenu = styled(Menu)`
  &&& {
    &.ant-menu {
      margin: 0 -20px 20px;
      background-color: transparent;

      @media (width <= 768px) {
        margin: 0 -13px 20px;
      }
    }

    &.ant-menu-horizontal {
      line-height: 40px;
      border-bottom: none;
    }

    .ant-menu-item {
      margin-right: 4px;
      border-radius: ${({ theme }) => theme.antd.borderRadiusLG}px;
    }

    .ant-menu-item:hover {
      background-color: ${({ theme }) => theme.antd.colorPrimaryBgHover};
    }
  }
`;
