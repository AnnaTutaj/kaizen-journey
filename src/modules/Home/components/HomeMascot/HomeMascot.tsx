import React from 'react';
import { useIntl } from 'react-intl';
import styles from './HomeMascot.module.less';
import image from '@assets/mascot_map.svg';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';

const HomeMascot: React.FC = () => {
  const intl = useIntl();

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
      <img src={image} className={styles.Image} alt="Kaizen Journey Mascot" />
    </HomeSectionWrapper>
  );
};

export default HomeMascot;
