import { Button as AntDButton } from 'antd';
import { ButtonProps } from 'antd/es/button';

export interface IButtonProps extends ButtonProps {}

const Button: React.FC<IButtonProps> = ({ children, ...props }) => <AntDButton {...props}>{children}</AntDButton>;

export default Button;
