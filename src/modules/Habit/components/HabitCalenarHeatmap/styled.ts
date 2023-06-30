import { CategoryColorType } from '@common/containers/App/ColorPalette';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const legendColorSize: number = 13;
const legendColorBorderSize: number = 3;
const legendColorTodaySize: number = legendColorSize + legendColorBorderSize;

export const StyledLegendColor = styled.div<{ $backgroundColor: CategoryColorType }>`
  width: ${legendColorSize}px;
  height: ${legendColorSize}px;
  background-color: ${({ theme, $backgroundColor }) => theme.layout.colorsCategory[$backgroundColor]};
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

export const CalendarHeatmapGlobalStyle = createGlobalStyle`
.react-calendar-heatmap text {
  font-size: 10px;
  fill: ${({ theme }) => theme.antd.colorTextTertiary};
}

.react-calendar-heatmap rect:hover {
  stroke: ${({ theme }) => theme.antd.colorTextQuaternary};
  stroke-width: 1px;
}

.react-calendar-heatmap .color-empty {
  fill: ${({ theme }) => theme.antd.colorFill};
}

.react-calendar-heatmap .mark-today {
  stroke: ${({ theme }) => theme.antd.colorPrimary};
  stroke-width: 2px;

  &:hover {
    stroke: ${({ theme }) => theme.antd.colorPrimaryBorder};
    stroke-width: 2px;
  }
}


${({ theme }) => {
  let styles = ``;

  for (const [key, value] of Object.entries(theme.layout.colorsCategory)) {
    styles += `
      .react-calendar-heatmap .color-${key} {
        fill: ${value};
      }
    `;
  }

  styles += `.react-calendar-heatmap .color-skipped {
    fill: ${theme.layout.colorCoral};
  }`;
  return styles;
}}
`;
