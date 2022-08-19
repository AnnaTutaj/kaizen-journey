import { Menu as AntDMenu, MenuProps } from 'antd';

import styles from './Menu.module.less';

export interface IMenuProps extends MenuProps {}

const Menu: React.FC<Pick<IMenuProps, 'selectedKeys' | 'items'>> = ({ selectedKeys, items }) => {
  return (
    <AntDMenu
      disabledOverflow
      mode={'horizontal'}
      className={styles.MenuContainer}
      selectedKeys={selectedKeys}
      items={items}
    />
  );
};

export default Menu;
