import React from 'react';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import GratitudeListItem from './GratitudeListItem/GratitudeListItem';
import HeaderText from '@common/components/HeaderText';
import { StyledList } from '@common/components/List/styled';

interface IProps {
  gratitudes: IGratitudeModel[];
  headerText: string;
  removeGratitude?: (id: string) => void;
  updateGratitude?: (item: IGratitudeModel) => void;
}

const GratitudeList: React.FC<IProps> = ({
  gratitudes,
  headerText,
  removeGratitude,
  updateGratitude
}) => {
  return (
    <StyledList
      header={<HeaderText text={headerText} />}
      dataSource={gratitudes}
      renderItem={(item) => {
        return (
          <GratitudeListItem
            gratitude={item}
            removeGratitude={removeGratitude}
            updateGratitude={updateGratitude}
          />
        );
      }}
    />
  );
};

export default GratitudeList;
