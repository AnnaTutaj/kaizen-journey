import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import styles from './HomeQuote.module.less';
import { Carousel } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';

const HomeQuote: React.FC = () => {
  const intl = useIntl();

  const [quoteAutoplay, setQuoteAutoplay] = useState<boolean>(true);
  const quoteCount = 6;

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
          <div>~ {intl.formatMessage({ id: `home.quote.${i}.author` })}</div>
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
