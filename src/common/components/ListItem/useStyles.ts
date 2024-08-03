import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { createStyles } from 'antd-style';

export default createStyles(
  (
    { css, token },
    { backgroundColor, colorHover }: { backgroundColor: CategoryColorType; colorHover: CategoryColorType }
  ) => {
    return {
      listItem: css`
        &&& {
          margin-bottom: 16px;
          padding: 10px 16px;
          color: ${token.colorWhite};
          background-color: ${token.layout.colorsCategory[backgroundColor]};
          border-radius: ${token.borderRadiusLG}px;
        }
      `,
      listItemRow: css`
        width: 100%;
      `,
      date: css`
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `,
      smallText: css`
        font-size: 10px;
        text-transform: uppercase;
      `,
      title: css`
        margin-top: 0;
        color: ${token.colorWhite} !important;
      `,
      descriptionParagraph: css`
        color: ${token.colorWhite};
        white-space: pre-line;
      `,
      dropDownCol: css`
        text-align: right;
      `,
      dropdown: css`
        margin-left: 8px;
      `,
      dropdownIconContainer: css`
        padding: 5px 10px;
        color: ${token.colorWhite};
        font-size: 18px;
        text-align: center;
        border-radius: ${token.borderRadiusSM}px;
        cursor: pointer;

        &:hover {
          background-color: ${token.layout.colorsCategoryHover[colorHover]};
        }
      `,
      visibilityIconContainer: css`
        padding: 6px 0 5px 16px;
      `,
      visibilityIcon: css`
        color: ${token.colorWhite};
        font-size: 16px;
      `,
      secondsTag: css`
        margin-top: ${token.marginSM}px;
      `
    };
  }
);
