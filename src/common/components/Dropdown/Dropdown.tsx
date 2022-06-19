import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown as AntDDropdown, Menu, Space } from 'antd';
import { useIntl } from 'react-intl';
import styles from './Dropdown.module.less';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { DropdownButtonProps } from 'antd/lib/dropdown';

export interface IDropdownMenuItemProps {
  key: DropdownMenuKey.update | DropdownMenuKey.delete | string;
  item?: {
    icon: IconDefinition;
    text: string;
  };
  onClick: () => void;
}

export interface IDropdownMenuProps extends Omit<DropdownButtonProps, 'overlay'> {
  menuItems: IDropdownMenuItemProps[];
}

const Dropdown: React.FC<IDropdownMenuProps> = ({ menuItems, ...props }): JSX.Element | null => {
  const intl = useIntl();

  const getDataByKey = (item: IDropdownMenuItemProps): { icon: IconDefinition; text: string } | null => {
    switch (item.key) {
      case DropdownMenuKey.update:
        return { icon: faPen, text: intl.formatMessage({ id: 'common.edit' }) };

      case DropdownMenuKey.delete:
        return { icon: faTrash, text: intl.formatMessage({ id: 'common.delete' }) };
    }
    return null;
  };

  const menu = (
    <Menu>
      {menuItems.map((menuItem) => {
        const data = menuItem.item ? menuItem.item : getDataByKey(menuItem);
        if (!data) {
          return null;
        }

        return (
          <Menu.Item key={menuItem.key} className={styles.DropdownMenuItem} onClick={() => menuItem.onClick()}>
            <Space size={16}>
              <FontAwesomeIcon icon={data.icon} className={styles.DropdownMenuItemIcon} />
              {data.text}
            </Space>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return <AntDDropdown overlay={menu} placement="bottomLeft" trigger={['click']} {...props} />;
};

export default Dropdown;
