import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Carousel } from 'antd';
import { homeBaseTextSize, homeBlockMaxWidth } from '@modules/Home/styledHelper';

export const CarouselDots = 'CarouselDots';

export const StyledCarousel = styled(Carousel)`
  width: min(100vw, ${homeBlockMaxWidth});

  .${CarouselDots} {
    bottom: -35px;

    li button {
      width: 14px;
      height: 14px;
      background-color: ${({ theme }) => theme.layout.colorSecondary} !important;
      border-radius: 50%;
    }
  }
`;

export const StyledQuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 475px;
  margin: 0 20px;
  padding: 40px;
  font-size: ${homeBaseTextSize};
  line-height: ${({ theme }) => theme.antd.lineHeight};
  background-color: ${({ theme }) => theme.layout.colorPrimaryBg};
  border-radius: ${({ theme }) => theme.layout.borderRadiusXL};
`;

export const StyledQuoteMark = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.layout.colorPrimaryBgSecondary};
  font-size: 55px;
`;
