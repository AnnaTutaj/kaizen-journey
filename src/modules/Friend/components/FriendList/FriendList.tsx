import React from 'react';
import { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';
import FriendListItem, { FriendListMode } from './FriendListItem/FriendListItem';
import useCommonStyles from '@common/useStyles';
import List from '@common/components/List/List';

interface IProps {
  friends: IFriendBaseModel[];
  headerText: string;
  mode: FriendListMode;
  removeFriendFollowing?: (id: string) => void;
  removeFriendFollower?: (id: string) => void;
}

const FriendList: React.FC<IProps> = ({ friends, headerText, mode, removeFriendFollowing, removeFriendFollower }) => {
  const { styles: commonStyles } = useCommonStyles();

  return (
    <List
      header={<span className={commonStyles.headerText}>{headerText}</span>}
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
