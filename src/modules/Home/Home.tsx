import { Empty, Spin, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import useGratitudeListFetch from '@modules/Gratitude/hooks/useGratitudeListFetch';
import GratitudeList from '@modules/Gratitude/components/GratitudeList';
import styles from './Home.module.less';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  const intl = useIntl();
  const divRef = useRef<HTMLDivElement>(null);

  const executeScroll = () => {
    if (divRef && divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
          <div className={cn(styles.HeaderText, styles.HeaderSubtitle, styles.HeaderTextAnimate)}>
            {intl.formatMessage({ id: 'home.header.text' })}
          </div>
          <div className={cn(styles.HeaderText, styles.HeaderTitle, styles.HeaderTextAnimate)}>Kaizen Journey!</div>
          <Space direction="vertical" size={5} className={styles.HeaderTextDiscoverMore} onClick={executeScroll}>
            <span>{intl.formatMessage({ id: 'home.header.discoverMore' })}</span>
            <FontAwesomeIcon className={styles.HeaderIconDiscoverMore} icon={faChevronDown} />
          </Space>
        </Space>
      </div>

      <div ref={divRef} className={styles.FeaturesDiv}>
        <h1>Lorem Ipsum</h1>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </div>
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
