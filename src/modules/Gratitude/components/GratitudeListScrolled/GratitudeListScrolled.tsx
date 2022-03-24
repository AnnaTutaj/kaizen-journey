import { Button, Spin } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import GratitudeList from '../GratitudeList';
import styles from './GratitudeListScrolled.module.less';
import { useIntl } from 'react-intl';

interface IProps {
  gratitudes: IGratitudeModel[];
  headerText: string;
  getNextGratitudes: () => void;
  loading: boolean;
  moreGratitudes: boolean;
}

const GratitudeListScrolled: React.FC<IProps> = ({
  gratitudes,
  headerText,
  getNextGratitudes,
  loading,
  moreGratitudes
}) => {
  const intl = useIntl();

  return (
    <>
      {gratitudes && gratitudes.length ? (
        <>
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextGratitudes}
            hasMore={!loading && moreGratitudes}
            initialLoad={false}
          >
            <GratitudeList gratitudes={gratitudes} headerText={headerText} />
          </InfiniteScroll>
          <div className={styles.Footer}>
            {!loading && moreGratitudes ? (
              <Button type="primary" onClick={getNextGratitudes}>
                {intl.formatMessage({ id: 'common.list.loadMore' })}
              </Button>
            ) : null}

            {loading ? <Spin size="large" /> : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default GratitudeListScrolled;
