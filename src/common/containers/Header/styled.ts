import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Drawer, Layout } from 'antd';
import styled from 'styled-components';

export const StyledLayoutHeader = styled(Layout.Header)`
  &&& {
    position: fixed;
    z-index: 3;
    width: 100%;
    height: ${({ theme }) => theme.layout.headerHeight};
    padding: 0 50px;
    line-height: ${({ theme }) => theme.layout.headerHeight};
    background-color: ${({ theme }) => theme.layout.colorHeaderBg};

    @media (width <= 767.98px) {
      padding: 0 16px;
    }
  }
`;

export const StyledLogoImage = styled.img``;
export const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
  float: left;
  height: ${({ theme }) => theme.layout.headerHeight};
  margin-right: 20px;
  cursor: pointer;

  ${StyledLogoImage} {
    height: 40px;
  }
`;

export const StyledHamburgerMenuIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  float: right;
  height: 100%;
  margin-left: 20px;
  cursor: pointer;
`;

export const StyledHamburgerMenuIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.layout.colorDarkGray};
  font-size: 34px;
`;

export const StyledAvatarContainer = styled.div`
  float: right;
`;

export const StyledDarkModeSwitchContainer = styled.div`
  float: right;
  margin: 0 20px;
`;

export const StyledMenuDrawer = styled(Drawer)`
  &&& {
    .ant-drawer-body {
      padding-top: 15px;
      background-color: ${({ theme }) => theme.layout.colorHeaderBg};
    }

    .ant-menu-item {
      height: 80px;
      line-height: 80px;
    }
  }
`;

export const StyledMenuDrawerCloseIconContainer = styled.div`
  float: right;
  cursor: pointer;
`;

export const StyledMenuDrawerCloseIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.layout.colorDarkGray};
  font-size: 40px;
  vertical-align: -10px;
`;
