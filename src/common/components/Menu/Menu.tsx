import { Menu as AntdMenu, MenuProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  menu: css`
    &.ant-menu {
      margin: 0 -20px 20px;
      background-color: transparent;

      @media (width <= 768px) {
        margin: 0 -13px 20px;
      }
    }

    &.ant-menu-horizontal {
      line-height: 40px;
      border-bottom: none;
    }

    .ant-menu-item {
      margin-right: 4px;
      border-radius: ${token.borderRadiusLG}px !important;
    }

    .ant-menu-item:hover {
      background-color: ${token.colorPrimaryBgHover} !important;
    }
  `
}));

export interface IMenuItemType {
  key: string;
  label: React.ReactElement;
  children?: IMenuItemType[];
}

export type MenuItemsProps = IMenuItemType[];

export interface IMenuProps extends MenuProps {
  items: MenuItemsProps;
}

const Menu: React.FC<Pick<IMenuProps, 'selectedKeys' | 'items'>> = ({ selectedKeys, items }) => {
  const { styles } = useStyles();
  return (
    <AntdMenu className={styles.menu} disabledOverflow mode={'horizontal'} selectedKeys={selectedKeys} items={items} />
  );
};

export default Menu;
