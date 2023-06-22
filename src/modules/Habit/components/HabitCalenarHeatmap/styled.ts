import styled from 'styled-components';

const legendColorSize: number = 13;
const legendColorBorderSize: number = 3;
const legendColorTodaySize: number = legendColorSize + legendColorBorderSize;

export const StyledLegendColor = styled.div<{ $backgroundColor: string }>`
  width: ${legendColorSize}px;
  height: ${legendColorSize}px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const StyledLegendColorSkipped = styled.div`
  width: ${legendColorSize}px;
  height: ${legendColorSize}px;
  background-color: ${({ theme }) => theme.layout.colorCoral};
`;

export const StyledLegendColorToday = styled.div`
  width: ${legendColorTodaySize}px;
  height: ${legendColorTodaySize}px;
  border: ${legendColorBorderSize}px solid ${({ theme }) => theme.antd.colorPrimary};
`;

export const StyledLegendContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
