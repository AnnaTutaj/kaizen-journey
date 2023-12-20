import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx, token }) => {
  const streakColumnsMaxWidth = '400px';
  const hoverIconSize = 12;
  const hoverBiggerIconSize = hoverIconSize + 2;

  const dateHoverIcon = cx(css`
    font-size: ${hoverIconSize}px;
    display: none;
  `);

  const skipped = cx(css`
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        ${dateHoverIcon} {
          font-size: ${hoverBiggerIconSize}px;
        }
      }
    }
  `);

  const dateInfoIcon = cx(css`
    font-size: 22px;
  `);

  const dateHoverText = cx(css`
    display: none;
    text-transform: lowercase;
  `);

  const mobileFontSizeStyle = css`
    font-size: ${token.fontSizeSM}px;
  `;

  const clickableIconContainerStyle = css`
    text-align: center;
    border-radius: ${token.borderRadiusSM}px;
    cursor: pointer;

    &:hover {
      background-color: ${token.layout.colorHeaderBgSecondary};
    }
  `;

  return {
    dateHoverIcon,
    dateInfoIcon,
    skipped,
    dateHoverText,
    header: css`
      margin-bottom: 10px;
    `,
    habitTable: css`
      .ant-table-cell-row-hover {
        background-color: ${token.layout.colorHeaderBgTertiary};
      }

      .ant-table-thead > tr > th {
        font-weight: 500;
      }
    `,
    dateCol: css`
      min-width: 55px !important;
      height: 60px !important;
      padding: 0 !important;
    `,
    streakCol: css`
      padding: 0 !important;
    `,
    nameCol: css`
      max-width: 400px;
      padding: 8px 4px 8px 10px !important;
      @media (width <= 768px) {
        max-width: 140px;
      }
    `,
    date: css`
      text-align: center;
    `,
    dateIsToday: css`
      margin: 0 10px;
      padding: 8px 34px;
      color: ${token.colorWhite};
      background-color: ${token.colorPrimary};
      border-radius: 50%;
      scroll-margin-right: ${streakColumnsMaxWidth};
    `,
    dateSelectContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;

      &:hover {
        @media (hover: hover) and (pointer: fine) {
          background-color: unset !important;
          border: dashed 1px;

          .${dateInfoIcon} {
            display: none;
          }

          .${dateHoverIcon}, .${dateHoverText} {
            display: block;
          }
        }
      }
    `,
    dateHeaderContainer: css`
      display: flex;
      justify-content: center;
      margin: 4px 0;
    `,
    dropdownCol: css`
      text-align: right;
    `,

    smallText: css`
      font-size: 12px;
      text-transform: uppercase;
    `,
    monthDay: css`
      font-size: 22px;
    `,
    streakValue: css`
      padding: 0 10px;

      @media (width <= 768px) {
        ${mobileFontSizeStyle}
      }
    `,
    streakHeader: css`
      margin-left: auto;
      padding: 10px 5px;
      text-align: center;
      text-transform: lowercase;
      text-orientation: mixed;
      writing-mode: vertical-rl;
    `,
    habitName: css`
      @media (width <= 768px) {
        ${mobileFontSizeStyle}
      }
    `,
    settingsIconContainer: css`
      ${clickableIconContainerStyle}
      padding: 4px 8px;
    `,
    ellipsisIconContainer: css`
      ${clickableIconContainerStyle}
      margin-top: -4px;
      padding: 2px 8px;
    `,
    habitIcon: css`
      color: ${token.colorTextTertiary};
      font-size: 15px;
    `,
    habitVisibilityIcon: css`
      color: ${token.colorTextTertiary};
      font-size: 15px;
      margin-right: 6px;

      @media (width <= 768px) {
        font-size: 13px;
      }
    `,
    settingsIcon: css`
      font-size: 15px;
      color: ${token.colorTextTertiary};
    `,
    popoverTitle: css`
      margin: 8px 0;
    `,
    tooltipDescription: css`
      margin-top: 10px;
      white-space: pre-line;
    `
  };
});
