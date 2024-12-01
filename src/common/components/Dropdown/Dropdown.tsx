import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { faBoxArchive, faPen, faRotateLeft, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { DropdownButtonProps } from 'antd/lib/dropdown';
import { ItemType } from 'antd/es/menu/interface';
import useStyles from './useStyles';
import { Dropdown as AntDropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IDropdownMenuItemProps {
  key: DropdownMenuKey.update | DropdownMenuKey.delete | string | number;
  item?: {
    icon?: IconDefinition;
    text: string;
  };
  onClick?: () => void;
  visible?: () => boolean;
  items?: IDropdownMenuItemProps[];
}

interface IDropdownMenuGroupItemProps {
  key: string | number;
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
  const { styles, cx } = useStyles();

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
      className: styles.dropdownMenuItem,
      onClick: () => menuItem.onClick?.(),
      label: (
        <Space
          size={12}
          className={cx({ [styles.dropdownMenuItemSpaceError]: menuItem.key === DropdownMenuKey.delete })}
        >
          {data.icon ? <FontAwesomeIcon className={styles.dropdownMenuItemIcon} icon={data.icon} /> : null}
          {data.text}
        </Space>
      ),
      children: menuItem?.items
        ? menuItem.items.map((item) => {
            return renderMenuItem(item);
          })
        : undefined,
      popupClassName: styles.dropdownSubMenuOverlay
    };
  };

  const isMenuGroup = (object: IDropdownMenuItemProps | IDropdownMenuGroupItemProps): boolean => {
    return 'title' in object;
  };

  const filteredMenuItems = menuItems.filter((menuItem) => menuItem.visible === undefined || menuItem.visible());

  const items = filteredMenuItems.map((menuItem): ItemType => {
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
    <AntDropdown
      menu={{ items }}
      overlayClassName={styles.dropdownOverlay}
      placement="bottomLeft"
      trigger={['click']}
      {...props}
    />
  );
};

export default Dropdown;
