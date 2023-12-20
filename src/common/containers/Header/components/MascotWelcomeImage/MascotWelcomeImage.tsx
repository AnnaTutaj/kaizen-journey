import Image from '@common/components/Image/Image';
import image from '@assets/mascot_welcome.svg';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  imageContainer: css`
    display: flex;
    justify-content: center;
  `
}));

interface IProps {
  height?: number;
}

const MascotWelcomeImage: React.FC<IProps> = ({ height }) => {
  const { styles } = useStyles();

  return (
    <div className={styles.imageContainer}>
      <Image height={height || 180} src={image} alt="Kaizen Journey Mascot" preview={false} />
    </div>
  );
};

export default MascotWelcomeImage;
