import { Image as AntdImage, ImageProps } from 'antd';
import Spinner from '../Spinner';

const Image: React.FC<ImageProps> = ({ src, ...props }) => {
  return <AntdImage {...props} src={src} placeholder={<Spinner size="middle" />} />;
};

export default Image;
