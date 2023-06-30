import { homePaddingHorizontal } from '../styledHelper';
import styled, { css } from 'styled-components';

export const StyledContainer = styled.div<{ $coloredBg: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px ${homePaddingHorizontal};
  ${({ $coloredBg }) =>
    $coloredBg &&
    css`
      background-color: ${({ theme }) => theme.antd.colorPrimaryBgHover};
    `};
`;

export const StyledTitle = styled.h2<{ $description: boolean }>`
  margin-bottom: ${({ $description }) => ($description ? 16 : 64)}px;
  font-weight: 600;
  font-size: 1.8rem;
  letter-spacing: 0.2em;
  text-align: center;

  @media (width >= 992px) {
    font-size: 2rem;
  }
`;

export const StyledDescription = styled.div`
  margin-bottom: 64px;
  color: ${({ theme }) => theme.antd.colorTextTertiary};
  font-size: 1.1rem;
  letter-spacing: 0.2em;
  text-align: center;
`;
