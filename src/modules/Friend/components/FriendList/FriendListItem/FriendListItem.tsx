import { Avatar, Col, List, Row } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { IFriendBaseModel } from '@modules/Friend/models/FriendBaseModel';
import { useIntl } from 'react-intl';
import { Paths } from '@common/constants/Paths';
import { generatePath } from 'react-router-dom';
import useFriendFollowFetch from '@modules/Friend/hooks/useFriendFollowFetch';
import Button from '@common/components/Button';
import useConfirmModal from '@common/hooks/useConfirmModal';
import { Link } from 'react-router-dom';
import useCommonStyles from '@common/useStyles';
import useStyles from './useStyles';

export type FriendListMode = 'following' | 'follower' | 'viewUser';

interface IProps {
  friend: IFriendBaseModel;
  mode: FriendListMode;
  removeFriendFollowing?: (id: string) => void;
  removeFriendFollower?: (id: string) => void;
}

const FriendListItem: React.FC<IProps> = ({ friend, mode, removeFriendFollowing, removeFriendFollower }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  const { styles: commonStyles } = useCommonStyles();
  const { deleteFollowing, deleteFollower } = useFriendFollowFetch();
  const { confirmModal, confirmModalContextHolder } = useConfirmModal();

  const confirmDeleteFollowing = async () => {
    confirmModal({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'friend.following.confirmModal.delete.title' }),
      okText: intl.formatMessage({ id: 'friend.following.confirmModal.delete.okText' }),
      cancelText: intl.formatMessage({ id: 'friend.following.confirmModal.delete.cancelText' }),
      onOk: async () => {
        await handleDeleteFollowing();
      }
    });
  };

  const confirmDeleteFollower = async () => {
    confirmModal({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'friend.follower.confirmModal.delete.title' }),
      content: intl.formatMessage({ id: 'friend.follower.confirmModal.delete.content' }),
      okText: intl.formatMessage({ id: 'friend.follower.confirmModal.delete.okText' }),
      cancelText: intl.formatMessage({ id: 'friend.follower.confirmModal.delete.cancelText' }),
      onOk: async () => {
        await handleDeleteFollower();
      }
    });
  };

  const handleDeleteFollowing = async () => {
    if (removeFriendFollowing) {
      await deleteFollowing(friend.id);
      removeFriendFollowing(friend.id);
    }
  };

  const handleDeleteFollower = async () => {
    if (removeFriendFollower) {
      await deleteFollower(friend.id);
      removeFriendFollower(friend.id);
    }
  };

  const miliseconds = friend.createdAt.seconds * 1000;
  const cratedAtText = dayjs(miliseconds).format('ll');

  return (
    <List.Item className={styles.listItem}>
      <Row className={styles.listItemRow} justify="space-between" align="middle" wrap={false} gutter={20}>
        <Col flex={1}>
          <Row align="middle" wrap={false} gutter={10}>
            <Col>
              <Link to={generatePath(Paths.UserView, { id: friend.id })}>
                <Avatar size={40} icon={<FontAwesomeIcon icon={faUser} />} src={friend?.pictureURL} />
              </Link>
            </Col>
            <Col className={styles.textCol}>
              <Link className={commonStyles.colorTextLink} to={generatePath(Paths.UserView, { id: friend.id })}>
                <div className={commonStyles.ellipsisContainer}>{friend.username}</div>
              </Link>
              <small>
                {intl.formatMessage({ id: 'common.since' }).toLowerCase()}: {cratedAtText}
              </small>
            </Col>
          </Row>
        </Col>
        <Col>
          {mode === 'following' && removeFriendFollowing ? (
            <Button type="primary" ghost onClick={() => confirmDeleteFollowing()} size="middle">
              {intl.formatMessage({ id: 'friend.following.form.unfollow' })}
            </Button>
          ) : null}
          {mode === 'follower' && removeFriendFollower ? (
            <Button type="primary" ghost onClick={() => confirmDeleteFollower()} size="middle">
              {intl.formatMessage({ id: 'friend.follower.list.delete' })}
            </Button>
          ) : null}
        </Col>
      </Row>
      {confirmModalContextHolder}
    </List.Item>
  );
};

export default FriendListItem;
