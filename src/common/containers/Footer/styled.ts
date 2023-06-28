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
    background-color: ${({ theme }) => theme.layout.colorHeaderBg};

    .ant-space-item {
      font-size: 14px;
    }

    .ant-layout-footer {
      padding: 0;
    }
  }
`;
