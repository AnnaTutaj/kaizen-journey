import PageLoading from '@common/components/PageLoading';
import { Empty, Row, Spin, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import useGratitudeListFetch from '@modules/Gratitude/hooks/useGratitudeListFetch';
import GratitudeList from '@modules/Gratitude/components/GratitudeList';
import styles from './Home.module.less';
import cn from 'classnames';

const Home: React.FC = () => {
  const intl = useIntl();

  const [loadedGratitudes, setLoadedGratitudes] = useState<IGratitudeModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { getGratitudes } = useGratitudeListFetch({ setLoading, mode: 'public' });

  //init - runs only once
  useEffect(() => {
    async function fetchGratitudes() {
      const gratitudes = await getGratitudes();
      setLoadedGratitudes(gratitudes);
    }

    fetchGratitudes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles.HeaderContainer}>
        <Space direction="vertical">
          <div className={cn(styles.HeaderText, styles.HeaderTextShadow)}>
            {intl.formatMessage({ id: 'home.header.text' })}
          </div>
          <div className={cn(styles.HeaderText, styles.HeaderTextAnimate)}>Kaizen Journey!</div>
        </Space>
      </div>
      {loading ? (
        <Spin size="large" />
      ) : loadedGratitudes && loadedGratitudes.length ? (
        <GratitudeList
          gratitudes={loadedGratitudes}
          headerText={intl.formatMessage({ id: 'home.publicGratitude.list.title' })}
          hideManageOptions
        />
      ) : (
        <Empty description={intl.formatMessage({ id: 'home.publicGratitude.list.empty' })} />
      )}
    </>
  );
};

export default Home;
