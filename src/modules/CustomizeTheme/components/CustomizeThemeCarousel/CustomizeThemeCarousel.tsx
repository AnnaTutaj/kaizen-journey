import React from 'react';
import { Carousel } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { createStyles } from 'antd-style';
import useStylesHomeQuote from '@modules/Home/components/HomeQuote/useStyles';

const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      display: flex;
      flex-direction: column;
      gap: ${token.padding}px;
    `,
    carousel: css`
      width: 190px;
    `,
    quoteContainer: css`
      height: 200px;
    `,
    quoteMark: css`
      font-size: ${token.fontSizeHeading2}px;
    `
  };
});

const CustomizeThemeCarousel: React.FC = () => {
  const { styles, cx } = useStyles();
  const { styles: stylesHomeQuote } = useStylesHomeQuote();
  const quotes = ['lorem ipsum', 'lorem ipsum', 'lorem ipsum', 'lorem ipsum'];

  const renderQuote = (text: string) => {
    return (
      <div key={text}>
        <div className={cx(stylesHomeQuote.quoteContainer, styles.quoteContainer)}>
          <FontAwesomeIcon className={cx(stylesHomeQuote.quoteMark, styles.quoteMark)} icon={faQuoteLeft} />
          <div>{text}</div>
        </div>
      </div>
    );
  };

  return (
    <Carousel
      className={cx(stylesHomeQuote.carousel, styles.carousel)}
      dots={{ className: stylesHomeQuote.crouselDots }}
      pauseOnFocus
      pauseOnHover
      pauseOnDotsHover
      draggable
    >
      {quotes.map((i) => renderQuote(i))}
    </Carousel>
  );
};

export default CustomizeThemeCarousel;
