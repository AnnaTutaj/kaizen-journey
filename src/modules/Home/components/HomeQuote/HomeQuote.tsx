import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import HomeAuthor from '../HomeAuthor/HomeAuthor';
import authorImage_0 from '@assets/authors/Robert_Maurer.jpg';
import authorImage_1 from '@assets/authors/Alan_Watts.jpg';
import authorImage_2 from '@assets/authors/Helen_Keller.jpg';
import authorImage_3 from '@assets/authors/Brian_Tracy.jpg';
import authorImage_4 from '@assets/authors/Mandy_Hale.jpg';
import authorImage_5 from '@assets/authors/Robert_Collier.jpg';
import { CarouselDots, StyledCarousel, StyledQuoteContainer, StyledQuoteMark } from './styled';

const HomeQuote: React.FC = () => {
  const intl = useIntl();

  const [quoteAutoplay, setQuoteAutoplay] = useState<boolean>(true);
  const quoteCount = 6;

  const imageList: { id: number; src: string }[] = [
    {
      id: 0,
      src: authorImage_0
    },
    {
      id: 1,
      src: authorImage_1
    },
    {
      id: 2,
      src: authorImage_2
    },
    {
      id: 3,
      src: authorImage_3
    },
    {
      id: 4,
      src: authorImage_4
    },
    {
      id: 5,
      src: authorImage_5
    }
  ];

  const renderQuote = (i: number) => {
    return (
      <div key={i}>
        <StyledQuoteContainer onTouchStart={() => setQuoteAutoplay(false)} onClick={() => setQuoteAutoplay(false)}>
          <StyledQuoteMark icon={faQuoteLeft} />
          <div>{intl.formatMessage({ id: `home.quote.${i}.text` })}</div>
          <HomeAuthor
            image={imageList[i].src}
            name={intl.formatMessage({ id: `home.quote.${i}.author` })}
            description={intl.formatMessage({ id: `home.quote.${i}.authorDescription` })}
          />
        </StyledQuoteContainer>
      </div>
    );
  };

  return (
    <HomeSectionWrapper coloredBg={false} title={intl.formatMessage({ id: 'home.quote.title' })}>
      <StyledCarousel
        dots={{ className: CarouselDots }}
        autoplay={quoteAutoplay}
        pauseOnFocus
        pauseOnHover
        pauseOnDotsHover
        draggable
      >
        {_.times(quoteCount, (i) => renderQuote(i))}
      </StyledCarousel>
    </HomeSectionWrapper>
  );
};

export default HomeQuote;
