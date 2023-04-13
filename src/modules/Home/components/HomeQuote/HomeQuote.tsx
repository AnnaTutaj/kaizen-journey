import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import styles from './HomeQuote.module.less';
import parentStyles from '@modules/Home/HomeCommon.module.less';
import { Carousel } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

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
    <div className={parentStyles.HomeSectionContainer}>
      <h2 className={parentStyles.HomeSectionTitle}>{intl.formatMessage({ id: 'home.quote.title' })}</h2>
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
    </div>
  );
};

export default HomeQuote;
