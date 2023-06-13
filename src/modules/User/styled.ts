import { Row } from 'antd';
import styled from 'styled-components';

export const StyledUserNameContainer = styled.div`
  overflow: hidden;
  font-weight: 600;
  font-size: 20px;
  text-overflow: ellipsis;
`;

export const StyledUserDataRow = styled(Row)`
  padding: 16px;
`;
export const StyledHeaderRow = styled(Row)<{ $isMobile: boolean }>`
  margin-bottom: ${({ $isMobile }) => ($isMobile ? 20 : 8)}px;
`;
