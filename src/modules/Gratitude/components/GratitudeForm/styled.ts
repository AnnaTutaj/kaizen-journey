import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIconImageRemove = styled(FontAwesomeIcon)`
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.antd.colorErrorText};
  }
`;
