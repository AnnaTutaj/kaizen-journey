import { MenuProps } from 'antd';
import { StyledMenu } from './styled';

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
  return <StyledMenu disabledOverflow mode={'horizontal'} selectedKeys={selectedKeys} items={items} />;
};

export default Menu;
