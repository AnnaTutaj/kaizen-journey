import { createStyles } from 'antd-style';

export default createStyles(({ css }, { isMobile }: { isMobile: boolean }) => ({
  userNameContainer: css`
    overflow: hidden;
    font-weight: 600;
    font-size: 20px;
    text-overflow: ellipsis;
  `,
  userDataRow: css`
    padding: 16px;
  `,
  headerRow: css`
    margin-bottom: ${isMobile ? 20 : 8}px;
  `
}));
