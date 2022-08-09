import { Button, Spin } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IFriendFollowingModel } from '@modules/Friend/models/FriendFollowingModel';
import FriendList from '@modules/Friend/components/FriendList';
import styles from './FriendFollowingListScrolled.module.less';
import { useIntl } from 'react-intl';

interface IProps {
  friendFollowings: IFriendFollowingModel[];
  headerText: string;
  getNextFriendFollowings: () => void;
  loading: boolean;
  moreFriendFollowings: boolean;
  removeFriendFollowing: (id: string) => void;
}

const FriendFollowingListScrolled: React.FC<IProps> = ({
  friendFollowings,
  headerText,
  getNextFriendFollowings,
  loading,
  moreFriendFollowings,
  removeFriendFollowing
}) => {
  const intl = useIntl();

  return (
    <>
      {friendFollowings && friendFollowings.length ? (
        <>
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextFriendFollowings}
            hasMore={!loading && moreFriendFollowings}
            initialLoad={false}
          >
            <FriendList
              friends={friendFollowings}
              headerText={headerText}
              removeFriendFollowing={removeFriendFollowing}
            />
          </InfiniteScroll>
          <div className={styles.Footer}>
            {!loading && moreFriendFollowings ? (
              <Button type="primary" onClick={getNextFriendFollowings}>
                {intl.formatMessage({ id: 'common.list.loadMore' })}
              </Button>
            ) : null}

            {loading ? <Spin size="large" /> : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default FriendFollowingListScrolled;
