import { Spin } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';
import FriendList from '@modules/Friend/components/FriendList';
import { useIntl } from 'react-intl';
import { FriendListMode } from '@modules/Friend/components/FriendList/FriendListItem/FriendListItem';
import Button from '@common/components/Button';
import { StyledFooter } from './styled';

interface IProps {
  friends: IFriendBaseModel[];
  headerText: string;
  mode: FriendListMode;
  getNextFriends: () => void;
  loading: boolean;
  moreFriends: boolean;
  removeFriendFollowing?: (id: string) => void;
  removeFriendFollower?: (id: string) => void;
}

const FriendListScrolled: React.FC<IProps> = ({
  friends,
  headerText,
  mode,
  getNextFriends,
  loading,
  moreFriends,
  removeFriendFollowing,
  removeFriendFollower
}) => {
  const intl = useIntl();

  return (
    <>
      {friends && friends.length ? (
        <>
          <InfiniteScroll pageStart={0} loadMore={getNextFriends} hasMore={!loading && moreFriends} initialLoad={false}>
            <FriendList
              friends={friends}
              headerText={headerText}
              mode={mode}
              removeFriendFollowing={removeFriendFollowing}
              removeFriendFollower={removeFriendFollower}
            />
          </InfiniteScroll>
          <StyledFooter>
            {!loading && moreFriends ? (
              <Button type="primary" onClick={getNextFriends}>
                {intl.formatMessage({ id: 'common.list.loadMore' })}
              </Button>
            ) : null}

            {loading ? <Spin size="large" /> : null}
          </StyledFooter>
        </>
      ) : null}
    </>
  );
};

export default FriendListScrolled;
