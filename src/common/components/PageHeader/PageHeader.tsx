import { createStyles } from 'antd-style';
import { JSX } from 'react';

const useStyles = createStyles(({ css }, props: IPageHeaderStyleProps) => ({
  container: css`
    display: flex;
    flex-wrap: ${props.flexWrap || 'wrap-reverse'};
    gap: 20px;
    justify-content: ${props.justifyContent || 'space-between'};
    margin-bottom: ${props.smallMargin ? 8 : 20}px;
  `
}));

interface IPageHeaderStyleProps {
  smallMargin?: boolean;
  justifyContent?: string;
  flexWrap?: string;
}

export interface IPageHeaderProps extends IPageHeaderStyleProps {
  children: JSX.Element;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ smallMargin, justifyContent, flexWrap, children }) => {
  const { styles } = useStyles({ smallMargin, justifyContent, flexWrap });

  return <div className={styles.container}>{children}</div>;
};

export default PageHeader;
