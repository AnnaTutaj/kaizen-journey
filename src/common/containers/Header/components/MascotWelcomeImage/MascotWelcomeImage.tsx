import Image from '@common/components/Image/Image';
import image from '@assets/mascot_welcome.svg';
import { StyledImageContainer } from './styled';

interface IProps {
  width?: number;
}

const MascotWelcomeImage: React.FC<IProps> = ({ width }) => {
  return (
    <StyledImageContainer>
      <Image width={width || 300} src={image} alt="Kaizen Journey Mascot" preview={false} />
    </StyledImageContainer>
  );
};

export default MascotWelcomeImage;
