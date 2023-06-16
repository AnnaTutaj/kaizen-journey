import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { faBoxArchive, faPen, faRotateLeft, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { DropdownButtonProps } from 'antd/lib/dropdown';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import {
  DropdownMenuItem,
  DropdownOverlay,
  DropdownSubMenuOverlay,
  GlobalStyle,
  StyledDropdown,
  StyledDropdownMenuItemIcon,
  StyledDropdownMenuItemSpace
} from './styled';
interface IDropdownMenuItemProps {
  key: DropdownMenuKey.update | DropdownMenuKey.delete | string;
  item?: {
    icon?: IconDefinition;
    text: string;
  };
  onClick?: () => void;
  visible?: () => boolean;
  items?: IDropdownMenuItemProps[];
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
      className: DropdownMenuItem,
      onClick: () => menuItem.onClick?.(),
      label: (
        <StyledDropdownMenuItemSpace size={16} $colorError={menuItem.key === DropdownMenuKey.delete}>
          {data.icon ? <StyledDropdownMenuItemIcon icon={data.icon} /> : null}
          {data.text}
        </StyledDropdownMenuItemSpace>
      ),
      children: menuItem?.items
        ? menuItem.items.map((item) => {
            return renderMenuItem(item);
          })
        : undefined,
      popupClassName: DropdownSubMenuOverlay
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
    <>
      <GlobalStyle />
      <StyledDropdown
        menu={{ items }}
        overlayClassName={DropdownOverlay}
        placement="bottomLeft"
        trigger={['click']}
        {...props}
      />
    </>
  );
};

export default Dropdown;
