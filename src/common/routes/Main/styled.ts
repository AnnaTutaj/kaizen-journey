import { Layout } from 'antd';
import styled, { css } from 'styled-components';

const { Content } = Layout;

export const StyledContent = styled(Content)<{ $hideContentPadding: boolean }>`
  color: ${({ theme }) => theme.antd.colorText};
  min-height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight} - ${theme.layout.footerHeight})`};
  margin-top: ${({ theme }) => theme.layout.headerHeight};
  padding: ${({ theme }) => theme.antd.paddingMD}px 50px;
  background-color: ${(props) => props.theme.antd.colorBgLayout};

  @media (width <= 768px) {
    padding: ${({ theme }) => `${theme.antd.paddingMD}px ${theme.antd.paddingSM}px`};
  }

  ${({ $hideContentPadding }) =>
    $hideContentPadding &&
    css`
      padding: 0;

      @media (width <= 768px) {
        padding: 0;
      }
    `}
`;
