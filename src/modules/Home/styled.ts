import styled, { css } from 'styled-components';

export const HomeGradientTextStyle = css`
  background: linear-gradient(45deg, ${({ theme }) => theme.layout.colorsGradient});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
export const StyledHomeContainerTwoSections = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
`;
