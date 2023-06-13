import React from 'react';
import { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';
import FriendListItem, { FriendListMode } from './FriendListItem/FriendListItem';
import HeaderText from '@common/components/HeaderText';
import { StyledList } from './styled';

interface IProps {
  friends: IFriendBaseModel[];
  headerText: string;
  mode: FriendListMode;
  removeFriendFollowing?: (id: string) => void;
  removeFriendFollower?: (id: string) => void;
}

const FriendList: React.FC<IProps> = ({ friends, headerText, mode, removeFriendFollowing, removeFriendFollower }) => {
  return (
    <StyledList
      header={<HeaderText text={headerText} />}
      dataSource={friends}
      renderItem={(item) => {
        return (
          <FriendListItem
            friend={item}
            mode={mode}
            removeFriendFollowing={removeFriendFollowing}
            removeFriendFollower={removeFriendFollower}
          />
        );
      }}
    />
  );
};

export default FriendList;
