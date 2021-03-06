import React from 'react';
import { List } from 'antd';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import styles from '@modules/Gratitude/components/GratitudeList/GratitudeList.module.less';
import GratitudeListItem from './GratitudeListItem/GratitudeListItem';
import HeaderText from '@common/components/HeaderText';

interface IProps {
  gratitudes: IGratitudeModel[];
  headerText: string;
  hideManageOptions?: boolean;
  removeGratitude?: (id: string) => void;
  updateGratitude?: (item: IGratitudeModel) => void;
}

const GratitudeList: React.FC<IProps> = ({
  gratitudes,
  headerText,
  hideManageOptions,
  removeGratitude,
  updateGratitude
}) => {
  return (
    <List
      className={styles.GratitudeList}
      header={<HeaderText text={headerText} />}
      dataSource={gratitudes}
      renderItem={(item) => {
        return (
          <GratitudeListItem
            gratitude={item}
            hideManageOptions={hideManageOptions}
            removeGratitude={removeGratitude}
            updateGratitude={updateGratitude}
          />
        );
      }}
    />
  );
};

export default GratitudeList;
