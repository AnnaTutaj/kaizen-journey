import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import styles from './HomeQuote.module.less';
import { Carousel } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import HomeAuthor from '../HomeAuthor/HomeAuthor';
import authorImage_0 from '@assets/authors/Robert_Maurer.jpg';
import authorImage_1 from '@assets/authors/Alan_Watts.jpg';
import authorImage_2 from '@assets/authors/Helen_Keller.jpg';
import authorImage_3 from '@assets/authors/Brian_Tracy.jpg';
import authorImage_4 from '@assets/authors/Mandy_Hale.jpg';
import authorImage_5 from '@assets/authors/Robert_Collier.jpg';

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
        <div
          className={styles.QuoteContainer}
          onTouchStart={() => setQuoteAutoplay(false)}
          onClick={() => setQuoteAutoplay(false)}
        >
          <FontAwesomeIcon className={styles.QuoteMark} icon={faQuoteLeft} />
          <div>{intl.formatMessage({ id: `home.quote.${i}.text` })}</div>
          <HomeAuthor
            image={imageList[i].src}
            name={intl.formatMessage({ id: `home.quote.${i}.author` })}
            description={intl.formatMessage({ id: `home.quote.${i}.authorDescription` })}
          />
        </div>
      </div>
    );
  };

  return (
    <HomeSectionWrapper coloredBg={false} title={intl.formatMessage({ id: 'home.quote.title' })}>
      <Carousel
        className={styles.Carousel}
        dots={{ className: styles.CarouselDots }}
        autoplay={quoteAutoplay}
        pauseOnFocus
        pauseOnHover
        pauseOnDotsHover
        draggable
      >
        {_.times(quoteCount, (i) => renderQuote(i))}
      </Carousel>
    </HomeSectionWrapper>
  );
};

export default HomeQuote;
