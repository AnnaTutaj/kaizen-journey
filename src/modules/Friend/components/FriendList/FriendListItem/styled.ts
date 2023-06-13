import styled from 'styled-components';
import { Col, List, Row } from 'antd';

export const StyledListItem = styled(List.Item)`
  &&& {
    margin-bottom: 16px;
    padding: 10px 16px;
    background-color: ${({ theme }) => theme.layout.colorHeaderBg};
    border-radius: ${({ theme }) => theme.antd.borderRadiusLG}px;
  }
`;

export const StyledListItemRow = styled(Row)`
  width: 100%;
`;

export const StyledTextCol = styled(Col)`
  overflow: hidden;
`;
