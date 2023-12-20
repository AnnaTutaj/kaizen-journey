import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
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
  test: css`
    width: 100px;
    height: 100px;
    background-color: ${token.colorPrimaryTextActive};
  `,

  formItemValue: css`
    width: 100%;
    text-align: right;
  `,

  colorContainer: css`
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
    padding: 20px;
    background-color: ${token.colorFillSecondary};
    border-radius: ${token.borderRadiusLG}px;
  `
}));
