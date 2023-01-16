import { Button as AntDButton, Space } from 'antd';
import { ButtonProps } from 'antd/es/button';
import cn from 'classnames';
import styles from './Button.module.less';

export interface IButtonProps extends ButtonProps {
  text?: string;
  icon?: JSX.Element;
  transparentBackground?: boolean;
}

const Button: React.FC<IButtonProps> = ({ text, icon, children, transparentBackground, ...props }) => (
  <AntDButton {...props} className={cn({ [styles.TransparentBackground]: transparentBackground })}>
    {icon || text ? (
      <Space size={8}>
        {icon ? icon : null}
        {text ? text : null}
      </Space>
    ) : (
      children
    )}
  </AntDButton>
);

export default Button;
