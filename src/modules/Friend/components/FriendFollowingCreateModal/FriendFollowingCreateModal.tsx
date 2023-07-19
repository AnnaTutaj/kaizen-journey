import { Avatar, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Form, Input } from 'antd';
import { useAuth } from '@common/contexts/AuthContext';
import Modal from '@common/components/Modal';
import { IFriendFormModel } from '@modules/Friend/models/FriendFormModel';
import UserModel, { IUserModel } from '@common/models/UserModel';
import Empty from '@common/components/Empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PageLoading from '@common/components/PageLoading';
import useFriendFollowFetch from '@modules/Friend/hooks/useFriendFollowFetch';
import Button from '@common/components/Button';
import useConfirmModal from '@common/hooks/useConfirmModal';
import Alert from '@common/components/Alert';
import { StyledEllipsisContainer } from '@common/styled';
import useErrorMessage from '@common/hooks/useErrorMessage';

export interface IFriendFollowingCreateModalProps {
  handleSubmit: () => void;
  handleCancel: () => void;
}

export interface ISearchedUser extends IUserModel {
  isFollowing: boolean;
}

const FriendFollowingCreateModal: React.FC<IFriendFollowingCreateModalProps> = ({ handleSubmit, handleCancel }) => {
  const intl = useIntl();
  const { userProfile } = useAuth();
  const [form] = Form.useForm();
  const [searchedUser, setSearchedUser] = useState<ISearchedUser | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [closeWithReload, setCloseWithReload] = useState<boolean>(false);
  const [lastSearchedId, setLastSearchedId] = useState<string>();
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const { getFollowingById, followUser, deleteFollowing } = useFriendFollowFetch();
  const { confirmModal, confirmModalContextHolder } = useConfirmModal();
  const { showError } = useErrorMessage();

  const onFinish = async (values: IFriendFormModel) => {
    if (values.id === lastSearchedId) {
      return;
    }

    setLastSearchedId(values.id);
    setSearchedUser(null);
    setNotFound(false);
    const userSnap = await UserModel.fetchById(values.id);
    if (userSnap.exists()) {
      const friendFollow = await getFollowingById(userProfile.uid, values.id);
      const isFollowing = friendFollow ? true : false;
      setSearchedUser({ ...UserModel.build(userSnap.data()), isFollowing: isFollowing });
    } else {
      setNotFound(true);
    }
  };

  const handleOnFollowClick = async (searchedUser: ISearchedUser) => {
    try {
      setCloseWithReload(true);
      setFormDisabled(true);
      await followUser(searchedUser);

      setSearchedUser((prevState) => {
        return prevState
          ? {
              ...prevState,
              isFollowing: true
            }
          : null;
      });
      setFormDisabled(false);
    } catch (error) {
      setFormDisabled(false);
      showError(error);
    }
  };

  const confirmDeleteFollowing = async (searchedUser: ISearchedUser) => {
    confirmModal({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'friend.following.confirmModal.delete.title' }),
      okText: intl.formatMessage({ id: 'friend.following.confirmModal.delete.okText' }),
      cancelText: intl.formatMessage({ id: 'friend.following.confirmModal.delete.cancelText' }),
      onOk: async () => {
        await handleUnfollow(searchedUser);
      }
    });
  };

  const handleUnfollow = async (searchedUser: ISearchedUser) => {
    try {
      setCloseWithReload(true);
      setFormDisabled(true);
      await deleteFollowing(searchedUser.id);

      setSearchedUser((prevState) => {
        return prevState
          ? {
              ...prevState,
              isFollowing: false
            }
          : null;
      });

      setFormDisabled(false);
    } catch (error) {
      setFormDisabled(false);
      showError(error);
    }
  };

  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'friend.following.create.title' })}
        open
        onCancel={() => {
          closeWithReload ? handleSubmit() : handleCancel();
        }}
        width={500}
      >
        {formDisabled ? <PageLoading /> : null}
        <Form
          name="basic"
          form={form}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
          layout={'vertical'}
          disabled={formDisabled}
        >
          <Form.Item
            label={intl.formatMessage({ id: 'friend.following.form.field.id' })}
            name="id"
            rules={[
              { required: true, message: intl.formatMessage({ id: 'common.form.field.required.error' }) },
              {
                validator: async (_, value) => {
                  if (userProfile.uid === value) {
                    return Promise.reject(
                      intl.formatMessage({ id: 'friend.following.form.field.id.cannotFollowYourself' })
                    );
                  }
                }
              }
            ]}
          >
            <Input placeholder={intl.formatMessage({ id: 'friend.following.form.field.id.placeholder' })} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ id: 'friend.following.form.search' })}
            </Button>
          </Form.Item>

          <Alert
            showIcon
            closable
            message={intl.formatMessage({ id: 'friend.following.form.field.id.info.title' })}
            description={intl.formatMessage({ id: 'friend.following.form.field.id.info.description' })}
            type="info"
          />

          {notFound ? (
            <>
              <Divider />
              <Empty description={intl.formatMessage({ id: 'friend.following.form.notFound.empty' })} />
            </>
          ) : null}

          {searchedUser ? (
            <>
              <Divider />
              <Row justify="space-between" align="middle" wrap={false} gutter={20}>
                <Col flex={1}>
                  <Row align="middle" wrap={false} gutter={10}>
                    <Col>
                      <Avatar size={40} icon={<FontAwesomeIcon icon={faUser} />} src={searchedUser?.pictureURL} />
                    </Col>
                    <StyledEllipsisContainer as={Col}>
                      <span>{searchedUser.username}</span>
                    </StyledEllipsisContainer>
                  </Row>
                </Col>
                <Col>
                  {searchedUser.isFollowing ? (
                    <Button onClick={() => confirmDeleteFollowing(searchedUser)}>
                      {intl.formatMessage({ id: 'friend.following.form.unfollow' })}
                    </Button>
                  ) : (
                    <Button onClick={() => handleOnFollowClick(searchedUser)}>
                      {intl.formatMessage({ id: 'friend.following.form.follow' })}
                    </Button>
                  )}
                </Col>
              </Row>
            </>
          ) : null}
        </Form>
      </Modal>
      {confirmModalContextHolder}
    </>
  );
};

export default FriendFollowingCreateModal;
