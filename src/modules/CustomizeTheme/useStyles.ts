import { createStyles } from 'antd-style';

export default createStyles(({ css, token, responsive }) => ({
  hexColorInput: css`
    background-color: ${token.colorBgContainer};
    border-color: ${token.colorBorder};
    border-radius: ${token.borderRadiusSM}px;
    height: ${token.controlHeightSM}px;
    outline: ${token.controlOutline};
    outline-width: ${token.controlOutlineWidth}px;
    border-style: ${token.lineType};
    border-width: ${token.lineWidth}px;
    padding: ${token.controlPaddingHorizontalSM}px;

    &:focus,
    &:hover {
      border-color: ${token.colorPrimaryHover};
    }
  `,
  formItemLabel: css`
    display: flex;
    align-items: center;
    gap: ${token.marginXS}px;
    height: 54px;
  `,
  reset: css`
    font-size: ${token.fontSizeSM}px;
    pointer-events: none;
    opacity: 0;
  `,
  showReset: css`
    opacity: 1;
    pointer-events: auto;
  `,
  formItemValueToRight: css`
    width: 100%;
    text-align: right;
  `,
  colorContainer: css`
    width: 145px;
    padding: 10px;
    background-color: ${token.colorFillTertiary};
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadiusSM}px;
    cursor: pointer;
  `,
  colorBox: css`
    width: 48px;
    height: 32px;
    border-radius: ${token.borderRadiusSM}px;
  `,
  formContainer: css`
    padding: ${token.padding}px;
    background-color: ${token.colorFillSecondary};
    border-radius: ${token.borderRadiusLG}px;

    ${responsive.sm} {
      padding: ${token.padding}px ${token.paddingXS}px;
    }
  `,
  formWrapper: css`
    .ant-form-item-label {
      height: 54px;

      .ant-form-item-no-colon {
        height: 54px !important;
      }
    }
  `
}));
