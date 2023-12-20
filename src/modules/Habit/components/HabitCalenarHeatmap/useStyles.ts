import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { createStyles } from 'antd-style';

export default createStyles(({ css, token }, { habitColor }: { habitColor: CategoryColorType }) => {
  const getCategoryColors = () => {
    let styles = ``;

    for (const [key, value] of Object.entries(token.layout.colorsCategory)) {
      styles += `
                  .react-calendar-heatmap .color-${key} {
                    fill: ${value};
                  }
                `;
    }

    styles += `.react-calendar-heatmap .color-skipped {
                fill: ${token.layout.colorCoral};
              }`;
    return styles;
  };

  const categoryColors = getCategoryColors();
  const legendColorSize: number = 13;
  const legendColorBorderSize: number = 3;
  const legendColorTodaySize: number = legendColorSize + legendColorBorderSize;

  return {
    container: css`
      .react-calendar-heatmap text {
        font-size: 10px;
        fill: ${token.colorTextTertiary};
      }

      .react-calendar-heatmap rect:hover {
        stroke: ${token.colorTextQuaternary};
        stroke-width: 1px;
      }

      .react-calendar-heatmap .color-empty {
        fill: ${token.colorFill};
      }

      .react-calendar-heatmap .mark-today {
        stroke: ${token.colorPrimary};
        stroke-width: 2px;

        &:hover {
          stroke: ${token.colorPrimaryBorder};
          stroke-width: 2px;
        }
      }
      ${categoryColors}
    `,
    legendColor: css`
      width: ${legendColorSize}px;
      height: ${legendColorSize}px;
      background-color: ${token.layout.colorsCategory[habitColor]};
    `,
    legendColorSkipped: css`
      width: ${legendColorSize}px;
      height: ${legendColorSize}px;
      background-color: ${token.layout.colorCoral};
    `,
    legendColorToday: css`
      width: ${legendColorTodaySize}px;
      height: ${legendColorTodaySize}px;
      border: ${legendColorBorderSize}px solid ${token.colorPrimary};
    `,
    legendContainer: css`
      display: flex;
      justify-content: flex-end;
    `
  };
});
