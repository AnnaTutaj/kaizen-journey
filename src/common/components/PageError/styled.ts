import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const StyledPageErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.antd.colorBgLayout};
`;

export const StyledPageErrorIcon = styled(FontAwesomeIcon)`
  font-size: 60px;
`;
