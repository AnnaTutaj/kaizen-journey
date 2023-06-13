import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space } from 'antd';
import styled from 'styled-components';

export const StyledHeaderIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.antd.colorTextTertiary};
`;

export const StyledHabitCalenarHeatmapContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin-bottom: 20px;
`;
export const StyledHabitViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledSummaryContainerSpace = styled(Space)`
  margin-bottom: 10px;
`;

export const StyledHabitDescription = styled.div`
  max-width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: pre-line;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.antd.colorTextTertiary};
`;
