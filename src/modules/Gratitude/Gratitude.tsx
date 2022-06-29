import { getDoc, doc } from '@firebase/firestore';
import { Button, Space } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import GratitudeCreateModal from './components/GratitudeCreateModal';
import GratitudeMyList from './components/GratitudeMyList';
import styles from './Gratitude.module.less';
import { db } from '@common/util/firebase';
import GratitudeModel, { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import { IGratitudeCreateModalProps } from '@modules/Gratitude/components/GratitudeCreateModal/GratitudeCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import GratitudeMyListFilters from '@modules/Gratitude/components/GratitudeMyListFilters/GratitudeMyListFilters';
import cn from 'classnames';
import GratitudeMyListFiltersModel, {
  IGratitudeMyListFiltersModelDTO
} from '@modules/Gratitude/models/GratitudeMyListFiltersModel';

const Gratitude: React.FC = () => {
  const intl = useIntl();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [gratitudeCreateModalConfig, setGratitudeCreateModalConfig] = useState<IGratitudeCreateModalProps>();
  const [newGratitude, setNewGratitude] = useState<IGratitudeModel>();
  const [filters, setFilters] = useState<IGratitudeMyListFiltersModelDTO>();

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
        <Button
          onClick={() => {
            setShowFilters((prevState) => !prevState);
          }}
        >
          <Space size={10}>
            <FontAwesomeIcon icon={faFilter} />
            {intl.formatMessage({ id: 'common.filters' })}
          </Space>
        </Button>

        <Button type="primary" onClick={() => handleCreateGratitude()}>
          <Space size={10}>
            <FontAwesomeIcon icon={faPlus} />
            {intl.formatMessage({ id: 'gratitude.create.button' })}
          </Space>
        </Button>
      </div>

      <div className={cn(styles.FiltersContainer, { [styles.FiltersContainerVisible]: showFilters })}>
        <GratitudeMyListFilters
          onFinish={(values) => {
            const finalValues = GratitudeMyListFiltersModel.serialize(values);
            setFilters(finalValues);
          }}
        />
      </div>

      <GratitudeMyList newGratitude={newGratitude} filters={filters} />

      {gratitudeCreateModalConfig ? <GratitudeCreateModal {...gratitudeCreateModalConfig} /> : null}
    </>
  );
};

export default Gratitude;
