import Image from '@common/components/Image/Image';
import image from '@assets/mascot_welcome.svg';
import { StyledImageContainer } from './styled';

interface IProps {
  height?: number;
}

const MascotWelcomeImage: React.FC<IProps> = ({ height }) => {
  return (
    <StyledImageContainer>
      <Image height={height || 180} src={image} alt="Kaizen Journey Mascot" preview={false} />
    </StyledImageContainer>
  );
};

export default MascotWelcomeImage;
