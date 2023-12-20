import React from 'react';
import { useIntl } from 'react-intl';
import image from '@assets/mascot_map.svg';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import { homeBlockMaxWidth } from '../styledHelper';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  image: css`
    width: min(100vw, ${homeBlockMaxWidth});
    object-fit: cover;
  `
}));

const HomeMascot: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyles();

  return (
    <HomeSectionWrapper
      coloredBg={true}
      title={intl.formatMessage({ id: 'home.mascot.title' })}
      description={
        <>
          <div>{intl.formatMessage({ id: 'home.mascot.description1' })}</div>
          <div>{intl.formatMessage({ id: 'home.mascot.description2' })}</div>
        </>
      }
    >
      <img className={styles.image} src={image} alt="Kaizen Journey Mascot" />
    </HomeSectionWrapper>
  );
};

export default HomeMascot;
