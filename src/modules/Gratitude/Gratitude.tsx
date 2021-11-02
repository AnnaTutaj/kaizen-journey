import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeMyList from './components/GratitudeMyList';
import styles from './Gratitude.module.less';

const Gratitude: React.FC = () => {
  const intl = useIntl();

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  return (
    <>
      <div className={styles.Header}>
        <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
          {intl.formatMessage({ id: 'gratitude.create.button' })}
        </Button>
      </div>

      <GratitudeMyList />

      {isCreateModalVisible ? <div>Show modal form</div> : null}
    </>
  );
};

export default Gratitude;
