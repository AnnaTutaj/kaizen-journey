import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useParams, generatePath } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Button, Col, Grid, message, Row, Space, Modal as ConfirmModal } from 'antd';
import { Paths } from '@common/constants/Paths';
import styles from './User.module.less';
import UserModel, { IUserModel } from '@common/models/UserModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import Menu from '@common/components/Menu';
import Avatar from '@common/components/Avatar';
import { useAuth } from '@common/contexts/AuthContext';
import useFriendFollowFetch from '@modules/Friend/hooks/useFriendFollowFetch';
import { FirebaseError } from 'firebase/app';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import PageLoading from '@common/components/PageLoading';
import CopyToClipboard from 'react-copy-to-clipboard';
import moment from 'moment';
import { MenuItemsProps } from '@common/components/Menu/Menu';

const { useBreakpoint } = Grid;

const User: React.FC = () => {
  const intl = useIntl();
  const params = useParams();
  const location = useLocation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const { userProfile } = useAuth();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [user, setUser] = useState<IUserModel>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState<boolean>(true);
  const [isFollowingLoading, setIsFollowingLoading] = useState<boolean>(false);
  const [showCheckCopiedIcon, setShowCheckCopiedIcon] = useState<boolean>(false);
  const { getFollowingById, followUser, deleteFollowing } = useFriendFollowFetch();

  useEffect(() => {
    async function fetchUserInfo() {
      if (!params.id) {
        return;
      }

      setIsUserInfoLoading(true);
      const userSnap = await UserModel.fetchById(params.id);
      if (userSnap.exists()) {
        setUser(UserModel.build(userSnap.data()));
      } else {
        //todo redirect + message
      }

      const friendFollow = await getFollowingById(userProfile.uid, params.id);
      setIsFollowing(friendFollow ? true : false);
      setIsUserInfoLoading(false);
    }

    fetchUserInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleOnFollowClick = async () => {
    if (isFollowingLoading) {
      return;
    }

    try {
      if (!user) {
        return;
      }

      setIsFollowingLoading(true);
      await followUser(user);
      setIsFollowing(true);
      setIsFollowingLoading(false);
    } catch (error) {
      setIsFollowingLoading(false);

      if (error instanceof FirebaseError) {
        const errorMessage = intl.formatMessage({
          id: error.code,
          defaultMessage: intl.formatMessage({ id: 'common.defaultErrorMessage' })
        });
        message.error(errorMessage);
      } else {
        message.error(intl.formatMessage({ id: 'common.defaultErrorMessage' }));
      }
    }
  };

  const confirmDeleteFollowing = async () => {
    if (isFollowingLoading) {
      return;
    }

    ConfirmModal.confirm({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'friend.following.confirmModal.delete.title' }),
      okText: intl.formatMessage({ id: 'friend.following.confirmModal.delete.okText' }),
      cancelText: intl.formatMessage({ id: 'friend.following.confirmModal.delete.cancelText' }),
      onOk: async () => {
        await handleUnfollow();
      }
    });
  };

  const handleUnfollow = async () => {
    try {
      if (!user) {
        return;
      }

      setIsFollowingLoading(true);
      await deleteFollowing(user.id);
      setIsFollowing(false);
      setIsFollowingLoading(false);
    } catch (error) {
      setIsFollowingLoading(false);

      if (error instanceof FirebaseError) {
        const errorMessage = intl.formatMessage({
          id: error.code,
          defaultMessage: intl.formatMessage({ id: 'common.defaultErrorMessage' })
        });
        message.error(errorMessage);
      } else {
        message.error(intl.formatMessage({ id: 'common.defaultErrorMessage' }));
      }
    }
  };

  const items: MenuItemsProps = useMemo(
    () => [
      {
        key: Paths.UserViewHabit,
        label: (
          <Link to={generatePath(Paths.UserViewHabit, { id: params.id })}>
            {intl.formatMessage({ id: 'header.habits' })}
          </Link>
        )
      },
      {
        key: Paths.UserViewGratitude,
        label: (
          <Link to={generatePath(Paths.UserViewGratitude, { id: params.id })}>
            {intl.formatMessage({ id: 'header.gratitude' })}
          </Link>
        )
      },
      {
        label: <div> {intl.formatMessage({ id: 'header.friends' })}</div>,
        key: 'friends',
        children: [
          {
            key: Paths.UserViewFollowing,
            label: (
              <Link to={generatePath(Paths.UserViewFollowing, { id: params.id })}>
                {intl.formatMessage({ id: 'friend.menu.following' })}
              </Link>
            )
          },
          {
            key: Paths.UserViewFollowers,
            label: (
              <Link to={generatePath(Paths.UserViewFollowers, { id: params.id })}>
                {intl.formatMessage({ id: 'friend.menu.followers' })}
              </Link>
            )
          }
        ]
      }
    ],
    [intl, params.id]
  );

  useEffect(() => {
    items.forEach((i) => {
      if (location.pathname === generatePath(i.key, { id: params.id })) {
        setSelectedKeys([i.key]);
      }

      if (i.children) {
        i.children.forEach((j) => {
          if (location.pathname === generatePath(j.key, { id: params.id })) {
            setSelectedKeys([j.key]);
          }
        });
      }
    });
  }, [location.pathname, items, params.id]);

  const handleCopy = () => {
    setShowCheckCopiedIcon(true);

    setTimeout(() => {
      setShowCheckCopiedIcon(false);
    }, 1000);
  };

  if (isUserInfoLoading || !user) {
    return <PageLoading />;
  }

  const miliseconds = user.createdAt.seconds * 1000;
  const cratedAtText = moment(miliseconds).format('ll');

  const renderUserInfo = (
    <>
      <div className={styles.UserNameContainer}>{user.username}</div>
      <div>
        {intl.formatMessage({ id: 'user.joined' })} {cratedAtText}
      </div>
    </>
  );

  const renderButtons = (
    <Space size={10} wrap={true}>
      {isFollowing ? (
        <Button onClick={() => confirmDeleteFollowing()}>
          {intl.formatMessage({ id: 'friend.following.form.unfollow' })}
        </Button>
      ) : (
        <Button onClick={() => handleOnFollowClick()}>
          {intl.formatMessage({ id: 'friend.following.form.follow' })}
        </Button>
      )}

      <CopyToClipboard text={user.id} onCopy={() => handleCopy()}>
        <Button icon={<FontAwesomeIcon icon={showCheckCopiedIcon ? faCheck : faCopy} />}>
          <span className={styles.ButtonTextWithIcon}>{intl.formatMessage({ id: 'user.copyIdToClipboard' })}</span>
        </Button>
      </CopyToClipboard>
    </Space>
  );

  return (
    <>
      <Row
        gutter={20}
        wrap={isMobile ? true : false}
        justify={isMobile ? 'center' : 'start'}
        className={isMobile ? styles.RowHeaderMobile : styles.RowHeader}
      >
        <Col flex={'150px'}>
          <Avatar size={150} icon={<FontAwesomeIcon icon={faUser} />} src={user.pictureURL} />
        </Col>
        <Col flex={'auto'}>
          <Row justify="space-between" gutter={[10, 10]} className={styles.RowUserData}>
            <Col span={isMobile ? 24 : ''}>{renderUserInfo}</Col>
            <Col span={isMobile ? 24 : ''}>{renderButtons}</Col>
          </Row>
        </Col>
      </Row>

      <Menu selectedKeys={selectedKeys} items={items} />

      <Outlet />
    </>
  );
};

export default User;
