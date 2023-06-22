import React from 'react';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import GratitudeListItem from './GratitudeListItem/GratitudeListItem';
import { StyledList } from '@common/components/List/styled';
import { StyledHeaderText } from '@common/components/HeaderText/styled';

interface IProps {
  gratitudes: IGratitudeModel[];
  headerText: string;
  removeGratitude?: (id: string) => void;
  updateGratitude?: (item: IGratitudeModel) => void;
}

const GratitudeList: React.FC<IProps> = ({ gratitudes, headerText, removeGratitude, updateGratitude }) => {
  return (
    <StyledList
      header={<StyledHeaderText>{headerText}</StyledHeaderText>}
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
