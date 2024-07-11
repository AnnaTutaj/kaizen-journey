import React from 'react';
import { useIntl } from 'react-intl';
import fuji from '@assets/fuji.jpg';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import Button from '@common/components/Button/Button';
import useStyles from './useStyles';
import useParentStyles from '../useStyles';

interface IProps {
  onClick: () => void;
}

const HomeFeature: React.FC<IProps> = ({ onClick }) => {
  const intl = useIntl();
  const { styles } = useStyles({ imageUrl: fuji });
  const { styles: parentStyles } = useParentStyles();

  return (
    <HomeSectionWrapper coloredBg={false} title={intl.formatMessage({ id: 'home.kaizenMeaning.title' })}>
      <div className={parentStyles.homeContainerTwoSections}>
        <div className={styles.kaizenMeaningContainer}>
          <div>{intl.formatMessage({ id: 'home.kaizenMeaning' })}</div>
          <div>{intl.formatMessage({ id: 'home.kaizenMeaning.description' })}</div>
          <div>
            <Button type="primary" onClick={onClick}>
              {intl.formatMessage({ id: 'home.kaizenMeaning.takeFirstStep.button' })}
            </Button>
          </div>
        </div>
        <div className={styles.kanjiContainer}>
          <div className={styles.kanjiDivContainer}>
            <div className={styles.kanji}>改</div>
            <div className={styles.kanjiMeaning}>Kai = {intl.formatMessage({ id: 'home.change' })}</div>
          </div>
          <div className={styles.kanjiDivContainer}>
            <div className={styles.kanji}>善</div>
            <div className={styles.kanjiMeaning}>Zen = {intl.formatMessage({ id: 'home.forTheBetter' })}</div>
          </div>
        </div>
      </div>
    </HomeSectionWrapper>
  );
};

export default HomeFeature;
