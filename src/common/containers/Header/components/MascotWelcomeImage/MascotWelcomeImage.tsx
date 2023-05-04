import Image from '@common/components/Image/Image';
import styles from './MascotWelcomeImage.module.less';
import image from '@assets/mascot_welcome.svg';

const MascotWelcomeImage: React.FC = () => {
  return (
    <div className={styles.ImageContainer}>
      <Image width={300} src={image} alt="Kaizen Journey Mascot" preview={false} />
    </div>
  );
};

export default MascotWelcomeImage;
