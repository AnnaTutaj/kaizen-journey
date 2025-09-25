import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import Modal from '@common/components/Modal';
import Empty from '@common/components/Empty';
import PageHeader from '@common/components/PageHeader';
import Button from '@common/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IGratitudeTemplateCreateModalProps } from '../GratitudeTemplateCreateModal/GratitudeTemplateCreateModal';
import GratitudeTemplateCreateModal from '../GratitudeTemplateCreateModal';
import useConfirmModal from '@common/hooks/useConfirmModal';
import { useAuth } from '@common/contexts/AuthContext';
import { createStyles } from 'antd-style';
import GratitudeTemplateModel, { IGratitudeTemplateCreateForm } from '@common/models/GratitudeTemplateModel';
import useErrorMessage from '@common/hooks/useErrorMessage';

export interface IGratitudeTemplateModalProps {
  handleCancel: () => void;
}

const GratitudeTemplateModal: React.FC<IGratitudeTemplateModalProps> = ({ handleCancel }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  const { confirmModal, confirmModalContextHolder } = useConfirmModal();
  const { showError } = useErrorMessage();
  const { createProfileGratitudeTemplate, deleteProfileGratitudeTemplate } = useAuth();
  const { userProfile } = useUserProfile();

  const [gratitudeTemplateCreateModalConfig, setGratitudeTemplateCreateModalConfig] =
    useState<IGratitudeTemplateCreateModalProps>();

  const onFinish = async (values: IGratitudeTemplateCreateForm) => {
    try {
      await createProfileGratitudeTemplate(GratitudeTemplateModel.serialize(values));
      setGratitudeTemplateCreateModalConfig(undefined);
    } catch (error) {
      showError(error);
    }
  };

  const handleCreateGratitdeTemplate = () => {
    setGratitudeTemplateCreateModalConfig({
      handleCancel: () => setGratitudeTemplateCreateModalConfig(undefined),
      onFinish
    });
  };

  const confirmDelete = async (id: string) => {
    confirmModal({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'gratitudeTemplate.confirmModal.delete.title' }),
      okText: intl.formatMessage({ id: 'gratitudeTemplate.confirmModal.delete.okText' }),
      onOk: async () => {
        await deleteProfileGratitudeTemplate(id);
      }
    });
  };

  return (
    <>
      <Modal title={intl.formatMessage({ id: 'header.gratitudeTemplates' })} open onCancel={handleCancel} width={500}>
        <PageHeader>
          <Button type="primary" onClick={handleCreateGratitdeTemplate} icon={<FontAwesomeIcon icon={faPlus} />}>
            {intl.formatMessage({ id: 'gratitudeTemplate.create.button' })}
          </Button>
        </PageHeader>
        {userProfile.gratitudeTemplates.length ? (
          userProfile.gratitudeTemplates.map((i) => (
            <div key={i.id} className={styles.container}>
              <div>{i.templateName}</div>
              <div>
                <Button type="primary" ghost onClick={() => confirmDelete(i.id)} size="middle">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </Modal>
      {gratitudeTemplateCreateModalConfig ? (
        <GratitudeTemplateCreateModal {...gratitudeTemplateCreateModalConfig} />
      ) : null}
      {confirmModalContextHolder}
    </>
  );
};

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${token.margin}px;
    padding: ${token.paddingSM}px ${token.padding}px;
    background-color: ${token.controlItemBgActive};
    border-radius: ${token.borderRadiusLG}px;
  `
}));

export default GratitudeTemplateModal;
