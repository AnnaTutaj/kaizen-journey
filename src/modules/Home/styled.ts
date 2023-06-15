import { Space } from 'antd';
import styled from 'styled-components';
const gradientColors =
  '#f28d77, #eb8078, #e27379, #d7677b, #cb5c7e, #bd5380, #ad4b82, #9c4484, #893f85, #743b85, #5c3884, #413582';
const homeHeaderGradient = `radial-gradient(circle at 80% 10%, ${gradientColors})`;
const homeEndingGradient = `radial-gradient(circle at 10% 80%, ${gradientColors})`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
  min-height: 450px;
  padding: 30px;
  color: ${({ theme }) => theme.antd.colorWhite};
  text-align: center;
  background: ${homeHeaderGradient};
`;

export const StyledEndingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight} - ${theme.layout.footerHeight}}`};
  min-height: 200px;
  padding: 30px;
  color: ${({ theme }) => theme.antd.colorWhite};
  text-align: center;
  background: ${homeEndingGradient};
`;

export const StyledHeaderTitle = styled.div`
  font-weight: 900;
  font-size: clamp(40px, min(10vw, 10vh), 90px);
  letter-spacing: 0.1em;
`;

export const StyledHeaderSubtitle = styled.div`
  margin-bottom: 40px;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
`;

export const StyledContentContainer = styled.div`
  scroll-margin-top: ${({ theme }) => theme.layout.headerHeight};
`;

export const SectionEndingTitle = styled.div`
  margin-bottom: 20px;
  font-size: 1.7em;
`;

export const StyledLogoImage = styled.img`
  height: 200px;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

export const StyledHeaderKaizenJourneySpace = styled(Space)`
  margin-bottom: 20px;
`;
