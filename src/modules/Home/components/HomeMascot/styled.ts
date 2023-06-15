import styled from 'styled-components';
import { homeBlockMaxWidth } from '../styledHelper';

export const StyledImage = styled.img`
  width: min(100vw, ${homeBlockMaxWidth});
  object-fit: cover;
`;
