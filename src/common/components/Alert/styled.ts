import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const StyledCloseIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.layout.colorDarkGray};
  font-size: 20px;
`;
