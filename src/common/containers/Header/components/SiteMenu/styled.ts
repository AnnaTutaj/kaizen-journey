import { Menu } from 'antd';
import styled, { css } from 'styled-components';

const mobileStyle = css`
  .ant-menu-item {
    text-align: center;
  }

  .ant-menu-title-content {
    font-size: ${({ theme }) => theme.antd.fontSizeLG}px;
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
