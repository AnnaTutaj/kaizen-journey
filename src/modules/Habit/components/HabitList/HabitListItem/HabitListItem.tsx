import _ from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { generatePath, useNavigate } from 'react-router-dom';
import { Col, List, Row, Tooltip } from 'antd';
import { faEllipsisV, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paths } from '@common/constants/Paths';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import Dropdown, { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import HabitUpdateModal, { IHabitUpdateModalProps } from '../../HabitUpdateModal/HabitUpdateModal';
import { Visibility } from '@common/constants/Visibility';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import useConfirmModal from '@common/hooks/useConfirmModal';
import { MascotImage } from '@common/constants/MascotImage';
import useListItemStyles from '@common/components/ListItem/useStyles';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

interface IProps {
  habit: IHabitModel;
  setHabits: React.Dispatch<React.SetStateAction<IHabitModel[]>>;
}

const HabitListItem: React.FC<IProps> = ({ habit, setHabits }) => {
  const intl = useIntl();
  const { styles } = useListItemStyles({ backgroundColor: habit.color, colorHover: habit.color });
  const navigate = useNavigate();
  const { confirmModal, confirmModalContextHolder } = useConfirmModal();
  const { userProfile } = useUserProfile();
  const [habitUpdateModalConfig, setHabitUpdateModalConfig] = useState<IHabitUpdateModalProps>();
  const { getHabitById, deleteHabit, archiveHabit, restoreHabit } = useHabitFetch();

  const refreshHabit = async () => {
    const updatedHabit = await getHabitById(habit.id);
    if (updatedHabit) {
      setHabits((prevState) => {
        return prevState.map((i) => (i.id === updatedHabit.id ? updatedHabit : i));
      });
    }
  };

  const handleUpdateHabit = () => {
    setHabitUpdateModalConfig({
      handleCancel: () => setHabitUpdateModalConfig(undefined),
      handleSubmit: async () => {
        setHabitUpdateModalConfig(undefined);
        refreshHabit();
      },
      habit: habit
    });
  };

  const handleDelete = async (habit: IHabitModel) => {
    await deleteHabit(habit.id);
    setHabits((prevState) => _.remove(prevState, (i) => i.id !== habit.id));
  };

  const handleArchive = async (habit: IHabitModel) => {
    await archiveHabit(habit.id);
    setHabits((prevState) => _.remove(prevState, (i) => i.id !== habit.id));
  };

  const handleRestore = async (habit: IHabitModel) => {
    await restoreHabit(habit.id);
    setHabits((prevState) => _.remove(prevState, (i) => i.id !== habit.id));
  };

  const confirmDelete = async (habit: IHabitModel) => {
    confirmModal({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'habit.confirmModal.delete.title' }),
      content: intl.formatMessage({ id: 'habit.confirmModal.delete.content' }),
      okText: intl.formatMessage({ id: 'habit.confirmModal.delete.okText' }),
      cancelText: intl.formatMessage({ id: 'habit.confirmModal.delete.cancelText' }),
      onOk: async () => {
        await handleDelete(habit);
      }
    });
  };

  const confirmArchive = async (habit: IHabitModel) => {
    confirmModal({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'habit.confirmModal.archive.title' }),
      content: intl.formatMessage({ id: 'habit.confirmModal.archive.content' }),
      okText: intl.formatMessage({ id: 'habit.confirmModal.archive.okText' }),
      cancelText: intl.formatMessage({ id: 'habit.confirmModal.archive.cancelText' }),
      onOk: async () => {
        await handleArchive(habit);
      },
      imageMascot: MascotImage.map
    });
  };

  const confirmRestore = async (habit: IHabitModel) => {
    confirmModal({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'habit.confirmModal.restore.title' }),
      content: intl.formatMessage({ id: 'habit.confirmModal.restore.content' }),
      okText: intl.formatMessage({ id: 'habit.confirmModal.restore.okText' }),
      cancelText: intl.formatMessage({ id: 'habit.confirmModal.restore.cancelText' }),
      onOk: async () => {
        await handleRestore(habit);
      },
      imageMascot: MascotImage.welcome
    });
  };

  const menuItems: DropdownMenuItemProps = [
    {
      key: DropdownMenuKey.preview,
      onClick: async () => navigate(generatePath(Paths.HabitView, { id: habit.id }))
    },
    {
      key: DropdownMenuKey.update,
      onClick: async () => handleUpdateHabit(),
      visible: () => habit.createdByUid === userProfile.uid
    },
    {
      key: DropdownMenuKey.divider,
      visible: () => habit.createdByUid === userProfile.uid
    },
    {
      key: habit.isArchived ? DropdownMenuKey.restore : DropdownMenuKey.archive,
      onClick: () => (habit.isArchived ? confirmRestore(habit) : confirmArchive(habit)),
      visible: () => habit.createdByUid === userProfile.uid
    },
    {
      key: DropdownMenuKey.delete,
      onClick: () => confirmDelete(habit),
      visible: () => habit.createdByUid === userProfile.uid
    }
  ];

  return (
    <>
      <List.Item className={styles.listItem}>
        <Row className={styles.listItemRow} wrap={false}>
          <Col flex={1}>
            <Title className={styles.title} level={5}>
              {habit.name}
            </Title>
            <Paragraph className={styles.descriptionParagraph}>{habit.description}</Paragraph>
          </Col>
          <Col>
            <div className={styles.visibilityIconContainer}>
              <Tooltip
                placement="bottom"
                title={intl.formatMessage({
                  id: `common.visibility.${habit.isPublic ? Visibility.public : Visibility.private}`
                })}
              >
                <FontAwesomeIcon className={styles.visibilityIcon} icon={habit.isPublic ? faGlobe : faLock} />
              </Tooltip>
            </div>
          </Col>
          <Col className={styles.dropDownCol}>
            <Dropdown className={styles.dropdown} menuItems={menuItems}>
              <div className={styles.dropdownIconContainer}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </div>
            </Dropdown>
          </Col>
        </Row>
      </List.Item>
      {habitUpdateModalConfig ? <HabitUpdateModal {...habitUpdateModalConfig} /> : null}
      {confirmModalContextHolder}
    </>
  );
};

export default HabitListItem;
