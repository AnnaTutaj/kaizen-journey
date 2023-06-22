import { useState } from 'react';
import Image from '../Image/Image';
import { Image as AntDImage } from 'antd';
import { GlobalStyle, ImagePreviewCn } from './styled';

export interface IImageProps {
  srcs: string[];
}

const ImagePreview: React.FC<IImageProps> = ({ srcs }) => {
  const [visible, setVisible] = useState<boolean>(false);

  if (!srcs.length) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <Image
        rootClassName={ImagePreviewCn}
        preview={{ visible: false }}
        src={srcs[0]}
        onClick={() => setVisible(true)}
      />

      <div style={{ display: 'none' }}>
        <AntDImage.PreviewGroup preview={{ visible, onVisibleChange: (value) => setVisible(value) }}>
          {srcs.map((src, index) => (
            <Image key={index} src={src} />
          ))}
        </AntDImage.PreviewGroup>
      </div>
    </>
  );
};

export default ImagePreview;
