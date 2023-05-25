import React from 'react';
import { useIntl } from 'react-intl';
import styles from './HomeKaizenMeaning.module.less';
import parentStyles from '@modules/Home/HomeCommon.module.less';
import fuji from '@assets/fuji.jpg';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';

const HomeFeature: React.FC = () => {
  const intl = useIntl();

  return (
    <HomeSectionWrapper coloredBg={false} title={intl.formatMessage({ id: 'home.kaizenMeaning.title' })}>
      <div className={parentStyles.HomeContainerTwoSections}>
        <div className={styles.KaizenMeaningContainer}>
          <div>{intl.formatMessage({ id: 'home.kaizenMeaning' })}</div>
          <div>{intl.formatMessage({ id: 'home.kaizenMeaning.description' })}</div>
        </div>
        <div className={styles.KanjiContainer} style={{ backgroundImage: `url(${fuji})` }}>
          <div className={styles.KanjiDivContainer}>
            <div className={styles.Kanji}>改</div>
            <div className={styles.KanjiMeaning}>Kai = {intl.formatMessage({ id: 'home.change' })}</div>
          </div>
          <div className={styles.KanjiDivContainer}>
            <div className={styles.Kanji}>善</div>
            <div className={styles.KanjiMeaning}>Zen = {intl.formatMessage({ id: 'home.forTheBetter' })}</div>
          </div>
        </div>
      </div>
    </HomeSectionWrapper>
  );
};

export default HomeFeature;
