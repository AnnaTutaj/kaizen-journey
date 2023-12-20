import React from 'react';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import GratitudeListItem from './GratitudeListItem/GratitudeListItem';
import useCommonStyles from '@common/useStyles';
import List from '@common/components/List/List';

interface IProps {
  gratitudes: IGratitudeModel[];
  headerText: string;
  removeGratitude?: (id: string) => void;
  updateGratitude?: (item: IGratitudeModel) => void;
}

const GratitudeList: React.FC<IProps> = ({ gratitudes, headerText, removeGratitude, updateGratitude }) => {
  const { styles: commonStyles } = useCommonStyles();

  return (
    <List
      header={<span className={commonStyles.headerText}>{headerText}</span>}
      dataSource={gratitudes}
      renderItem={(item) => {
        return (
          <GratitudeListItem gratitude={item} removeGratitude={removeGratitude} updateGratitude={updateGratitude} />
        );
      }}
    />
  );
};

export default GratitudeList;
