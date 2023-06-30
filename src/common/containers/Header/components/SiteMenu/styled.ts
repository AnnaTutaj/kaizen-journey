import { Menu } from 'antd';
import styled, { css } from 'styled-components';

const mobileStyle = css`
  margin-top: 50px;

  .ant-menu-item {
    text-align: center;
  }

  .ant-menu-title-content {
    font-size: 30px;
    text-transform: uppercase;
  }
`;

export const StyledMenu = styled(Menu)<{ $isMobile?: boolean }>`
  &&& {
    background-color: ${({ theme }) => theme.layout.colorHeaderBg};
    border-right: none;
    border-bottom: none;

    &.ant-menu-horizontal {
      border-bottom: none;
    }

    .ant-menu-item {
      border-radius: ${({ theme }) => theme.antd.borderRadiusLG}px;
    }

    .ant-menu-item:hover {
      background-color: ${({ theme }) => theme.antd.colorPrimaryBgHover};
    }
  }

  ${({ $isMobile }) => $isMobile && mobileStyle}
`;
