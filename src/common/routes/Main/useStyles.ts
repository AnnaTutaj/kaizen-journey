import { createStyles } from 'antd-style';

export default createStyles(({ css, token }, { hideContentPadding }: { hideContentPadding: boolean }) => {
  const hideContentStyle = css`
    padding: 0;

    @media (width <= 768px) {
      padding: 0;
    }
  `;

  return {
    content: css`
      color: ${token.colorText};
      min-height: calc(100vh - ${token.layout.headerHeight} - ${token.layout.footerHeight}px);
      margin-top: ${token.layout.headerHeight};
      padding: ${token.paddingMD}px 50px;
      background-color: ${token.colorBgLayout};

      @media (width <= 768px) {
        padding: ${token.paddingMD}px ${token.paddingSM}px;
      }

      ${hideContentPadding ? hideContentStyle : null}
    `
  };
});
