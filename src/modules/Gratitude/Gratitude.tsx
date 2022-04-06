import { getDoc, doc } from '@firebase/firestore';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeCreateModal from './components/GratitudeCreateModal';
import GratitudeMyList from './components/GratitudeMyList';
import styles from './Gratitude.module.less';
import { db } from '@common/util/firebase';
import GratitudeModel, { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import { IGratitudeCreateModalProps } from '@modules/Gratitude/components/GratitudeCreateModal/GratitudeCreateModal';

const Gratitude: React.FC = () => {
  const intl = useIntl();

  const [gratitudeCreateModalConfig, setGratitudeCreateModalConfig] = useState<IGratitudeCreateModalProps>();
  const [newGratitude, setNewGratitude] = useState<IGratitudeModel>();

  const handleCreateSubmit = async (gratitudeId: string) => {
    if (gratitudeId) {
      const snap = await getDoc(doc(db, 'gratitude', gratitudeId).withConverter(GratitudeModel.converter));

      if (snap.exists()) {
        setNewGratitude(GratitudeModel.build(snap.data()));
      }
    }
  };

  const handleCreateGratitude = () => {
    setGratitudeCreateModalConfig({
      handleCancel: () => setGratitudeCreateModalConfig(undefined),
      handleSubmit: async (gratitudeId) => {
        setGratitudeCreateModalConfig(undefined);
        await handleCreateSubmit(gratitudeId);
      }
    });
  };

  return (
    <>
      <div className={styles.Header}>
        <Button type="primary" onClick={() => handleCreateGratitude()}>
          {intl.formatMessage({ id: 'gratitude.create.button' })}
        </Button>
      </div>

      <GratitudeMyList newGratitude={newGratitude} />

      {gratitudeCreateModalConfig ? <GratitudeCreateModal {...gratitudeCreateModalConfig} /> : null}
    </>
  );
};

export default Gratitude;
