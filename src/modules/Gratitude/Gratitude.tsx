import { getDoc, doc } from '@firebase/firestore';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeCreateModal from './components/GratitudeCreateModal';
import GratitudeMyList from './components/GratitudeMyList';
import styles from './Gratitude.module.less';
import { db } from '@common/util/firebase';
import GratitudeModel, { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';

const Gratitude: React.FC = () => {
  const intl = useIntl();

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newGratitude, setNewGratitude] = useState<IGratitudeModel>();

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const handleCreateSubmit = async (gratitudeId: string) => {
    setIsCreateModalVisible(false);
    if (gratitudeId) {
      const snap = await getDoc(doc(db, 'gratitude', gratitudeId).withConverter(GratitudeModel.converter));

      if (snap.exists()) {
        setNewGratitude(GratitudeModel.build(snap.data()));
      }
    }
  };

  return (
    <>
      <div className={styles.Header}>
        <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
          {intl.formatMessage({ id: 'gratitude.create.button' })}
        </Button>
      </div>

      <GratitudeMyList newGratitude={newGratitude} />

      {isCreateModalVisible ? (
        <GratitudeCreateModal
          isModalVisible={isCreateModalVisible}
          handleCancel={handleCreateCancel}
          handleSubmit={handleCreateSubmit}
        />
      ) : null}
    </>
  );
};

export default Gratitude;
