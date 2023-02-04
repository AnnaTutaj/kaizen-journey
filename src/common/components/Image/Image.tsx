import { Image as AntdImage, ImageProps } from 'antd';

const Image: React.FC<ImageProps> = ({ src, ...props }) => {
  return <AntdImage {...props} src={src} />;
};

export default Image;
