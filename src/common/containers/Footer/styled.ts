import { Layout } from 'antd';
import styled from 'styled-components';

export const StyledFooter = styled(Layout.Footer)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${({ theme }) => theme.layout.footerHeight};
    text-align: center;
    background-color: var(--header-bg-color);

    a {
      color: ${({ theme }) => theme.antd.colorText};

      &:hover {
        color: ${({ theme }) => theme.antd.colorPrimary};
      }
    }

    .ant-space-item {
      font-size: 14px;
    }
  }
`;

export const StyledCreditsSpan = styled.span`
  /* color: ${({ theme }) => theme.layout.colorDarkGray}!important; */
  color: ${({ theme }) => theme.antd.colorText}!important;
`;
