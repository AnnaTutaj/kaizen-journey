import styled from 'styled-components';

export const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const StyledTextContainer = styled.div`
  text-align: center;
`;

export const StyledTextContainerFooter = styled(StyledTextContainer)`
  margin-top: 40px;
`;
