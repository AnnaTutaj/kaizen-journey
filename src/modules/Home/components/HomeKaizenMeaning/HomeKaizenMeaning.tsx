import React from 'react';
import { useIntl } from 'react-intl';
import styles from './HomeKaizenMeaning.module.less';
import parentStyles from '@modules/Home/HomeCommon.module.less';
import fuji from '@assets/fuji.jpg';

const HomeFeature: React.FC = () => {
  const intl = useIntl();

  return (
    <div className={parentStyles.HomeSectionContainer}>
      <h2 className={parentStyles.HomeSectionTitle}>{intl.formatMessage({ id: 'home.kaizenMeaning.title' })}</h2>
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
  );
};

export default HomeFeature;
