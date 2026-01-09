import { Drawer as AntdDrawer, Divider, DrawerProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createStyles } from 'antd-style';
import cn from 'classnames';
import { JSX, useMemo } from 'react';

export interface IDrawerProps extends DrawerProps {
  header?: JSX.Element;
  title?: string;
  close: () => void;
}

const Drawer: React.FC<IDrawerProps> = ({ title, header, open, close, children, className, ...props }) => {
  const { styles } = useStyles();

  const renderHeader = useMemo(() => {
    if (title) {
      return (
        <div className={styles.header}>
          <div>{title}</div>
          <div className={styles.closeIconContainer} onClick={close}>
            <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
          </div>
        </div>
      );
    }

    return (
      <>
        <div className={styles.closeIconContainer} onClick={close}>
          <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
        </div>
        {header}
      </>
    );
  }, []);

  return (
    <AntdDrawer className={cn(styles.menuDrawer, className)} placement="right" closable={false} open={open} {...props}>
      {renderHeader}
      <Divider className={styles.divider} />
      {children}
    </AntdDrawer>
  );
};

const useStyles = createStyles(({ css, token }) => ({
  menuDrawer: css`
    .ant-drawer-body {
      padding-top: 15px;
      background-color: ${token.layout.colorHeaderBg};
    }
  `,
  closeIconContainer: css`
    float: right;
    cursor: pointer;
  `,
  closeIcon: css`
    color: ${token.layout.colorDarkGray};
    font-size: 40px;
  `,
  header: css`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  `,
  divider: css`
    margin: ${token.marginXS}px 0 ${token.margin}px;
  `
}));

export default Drawer;
