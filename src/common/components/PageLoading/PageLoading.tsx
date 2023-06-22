import React from 'react';
import Spinner from '../Spinner';
import { StyledPageLoaderContainer } from './styled';

const PageLoading: React.FC = () => {
  return (
    <StyledPageLoaderContainer>
      <Spinner />
    </StyledPageLoaderContainer>
  );
};

export default PageLoading;
