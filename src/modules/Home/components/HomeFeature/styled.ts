import { HomeGradientTextStyle } from '@modules/Home/styled';
import { IFeature } from './HomeFeature';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { homeBlockMaxWidth } from '@modules/Home/styledHelper';
import { Col, Row } from 'antd';
import { lighten } from 'polished';
import styled, { css, keyframes } from 'styled-components';

export const StyledFeatureRow = styled(Row)`
  &.ant-row {
    margin: 0;
  }
`;

export const StyledFeatureCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledFeatureContainer = styled.div`
  max-width: ${homeBlockMaxWidth};
  height: 100%;
  margin-bottom: 32px;
  padding: 80px 25px;
  text-align: center;
  background-color: ${({ theme }) => theme.antd.colorBgLayout};
  border-radius: ${({ theme }) => theme.layout.borderRadiusXL};
  box-shadow: ${({ theme }) => `0 1px 1px ${theme.layout.colorBoxShadow}, 0 2px 2px ${theme.layout.colorBoxShadow},
    0 4px 4px ${theme.layout.colorBoxShadow}, 0 8px 8px ${theme.layout.colorBoxShadow},
    0 16px 16px ${theme.layout.colorBoxShadow}, 0 32px 32px ${theme.layout.colorBoxShadow}`};
`;

const jelly = keyframes`
  0% {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    transform-origin: center center;
    animation-timing-function: ease-out;
  }

  10% {
    transform: scale(0.81);
    animation-timing-function: ease-in;
  }

  17% {
    transform: scale(0.9);
    animation-timing-function: ease-out;
  }

  33% {
    transform: scale(0.77);
    animation-timing-function: ease-in;
  }

  45% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
`;

const wobble = keyframes`
  0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }

  15% {
    transform: translateX(-30px) rotate(-6deg);
  }

  30% {
    transform: translateX(15px) rotate(6deg);
  }

  45% {
    transform: translateX(-15px) rotate(-3.6deg);
  }

  60% {
    transform: translateX(9px) rotate(2.4deg);
  }

  75% {
    transform: translateX(-6px) rotate(-1.2deg);
  }
`;

const handleType = ($type: IFeature['type']) => {
  switch ($type) {
    case 'habit':
      return css`
        animation: ${jelly} 2s ease 0s infinite;
      `;
    case 'gratitude':
      return css`
        animation: ${pulse} 2s ease 0s infinite;
      `;
    case 'friends':
      return css`
        animation: ${wobble} 2s ease 0s infinite;
      `;
  }
};

export const StyledFeatureIcon = styled(FontAwesomeIcon)<{ $type: IFeature['type'] }>`
  margin-bottom: 20px;
  color: ${({ theme }) => lighten(0.1, theme.antd.colorPrimary)};
  font-size: 45px;
  ${({ $type }) => handleType($type)};
`;

export const StyledFeatureTitle = styled.h2`
  margin-bottom: 30px;
  color: ${({ theme }) => lighten(0.1, theme.antd.colorPrimary)};
  font-weight: 600;
  font-size: 22px;
`;

export const StyledFeatureDescription = styled.div`
  font-size: 18px;
  text-align: left;

  strong {
    ${HomeGradientTextStyle};
  }
`;
