import { useState } from 'react';
import Image from '../Image/Image';
import { Image as AntDImage } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  imagePreview: css`
    min-width: 25px;
    max-width: 250px;
    max-height: calc(100vh - ${token.layout.headerHeight} - 10px);
    object-fit: cover;
  `
}));

export interface IImageProps {
  srcs: string[];
}

const ImagePreview: React.FC<IImageProps> = ({ srcs }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { styles } = useStyles();

  if (!srcs.length) {
    return null;
  }

  return (
    <>
      <Image
        rootClassName={styles.imagePreview}
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
