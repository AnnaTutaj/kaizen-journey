import React from 'react';
import { List } from 'antd';
import { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';
import styles from '@modules/Friend/components/FriendList/FriendList.module.less';
import FriendListItem, { FriendListMode } from './FriendListItem/FriendListItem';
import HeaderText from '@common/components/HeaderText';

interface IProps {
  friends: IFriendBaseModel[];
  headerText: string;
  mode: FriendListMode;
  removeFriendFollowing?: (id: string) => void;
  removeFriendFollower?: (id: string) => void;
}

const FriendList: React.FC<IProps> = ({ friends, headerText, mode, removeFriendFollowing, removeFriendFollower }) => {
  return (
    <List
      className={styles.FriendList}
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
