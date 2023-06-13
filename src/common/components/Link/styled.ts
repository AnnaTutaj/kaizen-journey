import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledColorTextLink = styled(Link)`
  color: ${({ theme }) => theme.antd.colorText};

  &:hover {
    color: ${({ theme }) => theme.antd.colorPrimary};
  }
`;
