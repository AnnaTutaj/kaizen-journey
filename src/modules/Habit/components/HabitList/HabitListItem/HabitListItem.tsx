import _ from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { generatePath, useNavigate } from 'react-router-dom';
import { Col, Tooltip } from 'antd';
import { faEllipsisV, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paths } from '@common/constants/Paths';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import HabitUpdateModal, { IHabitUpdateModalProps } from '../../HabitUpdateModal/HabitUpdateModal';
import { Visibility } from '@common/constants/Visibility';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import useConfirmModal from '@common/hooks/useConfirmModal';
import { MascotImage } from '@common/constants/MascotImage';
import {
  StyledDescriptionParagraph,
  StyledDropDownCol,
  StyledDropdown,
  StyledDropdownIconContainer,
  StyledListItem,
  StyledListItemRow,
  StyledTitle,
  StyledVisibilityIcon,
  StyledVisibilityIconContainer
} from '@common/components/ListItem/styled';

interface IProps {
  habit: IHabitModel;
  setHabits: React.Dispatch<React.SetStateAction<IHabitModel[]>>;
}

const HabitListItem: React.FC<IProps> = ({ habit, setHabits }) => {
  const intl = useIntl();
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
      <StyledListItem $backgroundColor={habit.color}>
        <StyledListItemRow wrap={false}>
          <Col flex={1}>
            <StyledTitle level={5}>{habit.name}</StyledTitle>
            <StyledDescriptionParagraph>{habit.description}</StyledDescriptionParagraph>
          </Col>
          <Col>
            <StyledVisibilityIconContainer>
              <Tooltip
                placement="bottom"
                title={intl.formatMessage({
                  id: `common.visibility.${habit.isPublic ? Visibility.public : Visibility.private}`
                })}
              >
                <StyledVisibilityIcon icon={habit.isPublic ? faGlobe : faLock} />
              </Tooltip>
            </StyledVisibilityIconContainer>
          </Col>
          <StyledDropDownCol>
            <StyledDropdown menuItems={menuItems}>
              <StyledDropdownIconContainer $colorHover={habit.color}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </StyledDropdownIconContainer>
            </StyledDropdown>
          </StyledDropDownCol>
        </StyledListItemRow>
      </StyledListItem>
      {habitUpdateModalConfig ? <HabitUpdateModal {...habitUpdateModalConfig} /> : null}
      {confirmModalContextHolder}
    </>
  );
};

export default HabitListItem;
