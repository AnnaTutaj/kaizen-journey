import { Layout } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

export const StyledContent = styled(Content)<{ $hideContentPadding: boolean }>`
  color: ${({ theme }) => theme.antd.colorText};
  min-height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight} - ${theme.layout.footerHeight})`};
  margin-top: ${({ theme }) => theme.layout.headerHeight};
  padding: ${({ theme, $hideContentPadding }) =>
    $hideContentPadding ? 0 : `${theme.layout.contentPaddingVertical} 50px`};
  background-color: ${(props) => props.theme.antd.colorBgLayout};

  @media (width <= 768px) {
    padding: ${({ theme, $hideContentPadding }) =>
      $hideContentPadding ? 0 : `${theme.layout.contentPaddingVertical} 16px`};
  }
`;
