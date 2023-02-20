import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { faBoxArchive, faPen, faRotateLeft, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown as AntDDropdown, Space } from 'antd';
import { useIntl } from 'react-intl';
import styles from './Dropdown.module.less';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { DropdownButtonProps } from 'antd/lib/dropdown';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import cn from 'classnames';
interface IDropdownMenuItemProps {
  key: DropdownMenuKey.update | DropdownMenuKey.delete | string;
  item?: {
    icon: IconDefinition;
    text: string;
  };
  onClick?: () => void;
  visible?: () => boolean;
  children?: ItemType[];
}

interface IDropdownMenuGroupItemProps {
  key: string;
  title: string | JSX.Element;
  items: IDropdownMenuItemProps[];
  visible?: () => boolean;
}

export type DropdownMenuItemProps = (IDropdownMenuItemProps | IDropdownMenuGroupItemProps)[];

export interface IDropdownMenuProps extends Omit<DropdownButtonProps, 'overlay'> {
  menuItems: DropdownMenuItemProps;
}

const Dropdown: React.FC<IDropdownMenuProps> = ({ menuItems, ...props }): JSX.Element | null => {
  const intl = useIntl();

  const getDataByKey = (item: IDropdownMenuItemProps): { icon: IconDefinition; text: string } | null => {
    switch (item.key) {
      case DropdownMenuKey.preview:
        return { icon: faSearch, text: intl.formatMessage({ id: 'common.preview' }) };

      case DropdownMenuKey.update:
        return { icon: faPen, text: intl.formatMessage({ id: 'common.edit' }) };

      case DropdownMenuKey.delete:
        return { icon: faTrash, text: intl.formatMessage({ id: 'common.delete' }) };

      case DropdownMenuKey.archive:
        return { icon: faBoxArchive, text: intl.formatMessage({ id: 'common.archive' }) };

      case DropdownMenuKey.restore:
        return { icon: faRotateLeft, text: intl.formatMessage({ id: 'common.restore' }) };
    }
    return null;
  };

  const renderMenuItem = (menuItem: IDropdownMenuItemProps): ItemType => {
    if (menuItem.key === DropdownMenuKey.divider) {
      return {
        type: 'divider'
      };
    }

    const data = menuItem.item ? menuItem.item : getDataByKey(menuItem);

    if (!data) {
      return null;
    }

    return {
      key: menuItem.key,
      className: styles.DropdownMenuItem,
      onClick: () => menuItem.onClick?.(),
      label: (
        <Space size={16} className={cn({ [styles.DropdownMenuItemDelete]: menuItem.key === DropdownMenuKey.delete })}>
          <FontAwesomeIcon icon={data.icon} className={styles.DropdownMenuItemIcon} />
          {data.text}
        </Space>
      ),
      children: menuItem.children
    };
  };

  const isMenuGroup = (object: IDropdownMenuItemProps | IDropdownMenuGroupItemProps): boolean => {
    return 'title' in object;
  };

  const filteredMenuItems = menuItems.filter((menuItem) => menuItem.visible === undefined || menuItem.visible());

  const items = filteredMenuItems.map((menuItem) => {
    if (isMenuGroup(menuItem)) {
      const menuGroupItem: IDropdownMenuGroupItemProps = menuItem as IDropdownMenuGroupItemProps;

      return {
        key: menuGroupItem.key,
        type: 'group',
        label: menuGroupItem.title,
        children: menuGroupItem.items.map((item) => {
          return renderMenuItem(item as IDropdownMenuItemProps);
        })
      };
    } else {
      return renderMenuItem(menuItem as IDropdownMenuItemProps);
    }
  });

  return (
    <AntDDropdown
      menu={{ items }}
      overlayClassName={styles.DropdownOverlay}
      placement="bottomLeft"
      trigger={['click']}
      {...props}
    />
  );
};

export default Dropdown;
