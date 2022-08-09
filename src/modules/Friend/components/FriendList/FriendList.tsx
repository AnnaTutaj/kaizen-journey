import React from 'react';
import { List } from 'antd';
import { IFriendModel } from '@modules/Friend/models/FriendModel';
import styles from '@modules/Friend/components/FriendList/FriendList.module.less';
import FriendListItem from './FriendListItem/FriendListItem';
import HeaderText from '@common/components/HeaderText';

interface IProps {
  friends: IFriendModel[];
  headerText: string;
  hideManageOptions?: boolean;
  removeFriendFollowing?: (id: string) => void;
}

const FriendList: React.FC<IProps> = ({ friends, headerText, hideManageOptions, removeFriendFollowing }) => {
  return (
    <List
      className={styles.FriendList}
      header={<HeaderText text={headerText} />}
      dataSource={friends}
      renderItem={(item) => {
        return (
          <FriendListItem
            friend={item}
            hideManageOptions={hideManageOptions}
            removeFriendFollowing={removeFriendFollowing}
          />
        );
      }}
    />
  );
};

export default FriendList;
