import { Avatar, Button, Col, Modal, Row } from 'antd';
import React from 'react';
import { List } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { IFriendModel } from '@modules/Friend/models/FriendModel';
import styles from '@modules/Friend/components/FriendList/FriendListItem/FriendListItem.module.less';
import { useIntl } from 'react-intl';
import { useAuth } from '@common/contexts/AuthContext';
import { Paths } from '@common/constants/Paths';
import { generatePath, Link } from 'react-router-dom';
import useFriendFollowFetch from '@modules/Friend/hooks/useFriendFollowFetch';

interface IProps {
  friend: IFriendModel;
  hideManageOptions?: boolean;
  removeFriendFollowing?: (id: string) => void;
}

const FriendListItem: React.FC<IProps> = ({ friend, hideManageOptions, removeFriendFollowing }) => {
  const intl = useIntl();
  const { userProfile } = useAuth();
  const { deleteFollowing } = useFriendFollowFetch();

  const confirmDelete = async () => {
    Modal.confirm({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'friend.following.confirmModal.delete.title' }),
      content: intl.formatMessage({ id: 'friend.following.confirmModal.delete.content' }),
      okText: intl.formatMessage({ id: 'friend.following.confirmModal.delete.okText' }),
      cancelText: intl.formatMessage({ id: 'friend.following.confirmModal.delete.cancelText' }),
      onOk: async () => {
        await handleDelete();
      }
    });
  };

  const handleDelete = async () => {
    if (removeFriendFollowing && userProfile) {
      await deleteFollowing(friend.id);
      removeFriendFollowing(friend.id);
    }
  };

  const miliseconds = friend.createdAt.seconds * 1000;
  const cratedAtText = moment(miliseconds).format('ll');

  return (
    <List.Item className={styles.ListItem}>
      <Row justify="space-between" align="middle" wrap={false} gutter={20} className={styles.ListItemRow}>
        <Col flex={1}>
          <Row align="middle" wrap={false} gutter={10}>
            <Col>
              <Link to={generatePath(Paths.UserView, { id: friend.id })}>
                <Avatar size={40} icon={<FontAwesomeIcon icon={faUser} />} src={friend?.pictureURL} />
              </Link>
            </Col>
            <Col className={styles.TextCol}>
              <Link to={generatePath(Paths.UserView, { id: friend.id })} className={styles.LinkBaseText}>
                <div className={styles.UserNameContainer}>{friend.username}</div>
              </Link>
              <small>
                {intl.formatMessage({ id: 'common.since' }).toLowerCase()}: {cratedAtText}
              </small>
            </Col>
          </Row>
        </Col>
        <Col>
          {!hideManageOptions ? (
            <Button type="ghost" onClick={() => confirmDelete()} size="middle">
              {intl.formatMessage({ id: 'friend.following.form.unfollow' })}
            </Button>
          ) : null}
        </Col>
      </Row>
    </List.Item>
  );
};

export default FriendListItem;
