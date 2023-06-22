import { Button as AntDButton, Space } from 'antd';
import { ButtonProps } from 'antd/es/button';

export interface IButtonProps extends ButtonProps {
  text?: string;
  icon?: JSX.Element;
  transparentBackground?: boolean;
}

const Button: React.FC<IButtonProps> = ({ text, icon, children, ...props }) => (
  <AntDButton {...props}>
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
