import { Avatar as AntDAvatar, AvatarProps } from 'antd';
import { useMemo } from 'react';

export interface IAvatarProps extends AvatarProps {
  src: string;
}

const Avatar: React.FC<IAvatarProps> = ({ size, src, ...props }) => {
  const resizedUrl = useMemo(() => {
    if (size && size > 40 && src.length) {
      if (src.includes('graph.facebook.com')) {
        return src + `?height=${size}`;
      }

      if (src.includes('googleusercontent.com')) {
        return src.replace('s96-c', `s${size}-c`);
      }

      return src;
    }
  }, [size, src]);

  return <AntDAvatar {...props} size={size} src={resizedUrl} />;
};

export default Avatar;
