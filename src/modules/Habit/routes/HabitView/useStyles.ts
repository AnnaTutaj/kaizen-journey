import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
  headerIcon: css`
    color: ${token.colorTextTertiary};
  `,
  habitCalenarHeatmapContainer: css`
    width: 100%;
    max-width: 1400px;
    margin-bottom: 20px;
  `,
  habitViewContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  summaryContainerSpace: css`
    margin-bottom: 10px;
  `,
  habitDescription: css`
    max-width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: pre-line;
    text-overflow: ellipsis;
    color: ${token.colorTextTertiary};
  `
}));
