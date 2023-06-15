import React from 'react';
import Avatar from '@common/components/Avatar/Avatar';
import { StyledAuthorDescription, StyledContainer } from './styled';

interface IProps {
  image: string;
  name: string;
  description: string;
}

const HomeAuthor: React.FC<IProps> = ({ image, name, description }) => {
  return (
    <StyledContainer>
      <Avatar size={64} src={image} />
      <div>{name}</div>

      <StyledAuthorDescription>{description}</StyledAuthorDescription>
    </StyledContainer>
  );
};

export default HomeAuthor;
