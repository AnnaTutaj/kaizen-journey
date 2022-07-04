import _ from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { generatePath, useNavigate } from 'react-router-dom';
import { Col, Modal, Row, List, Typography } from 'antd';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paths } from '@common/constants/Paths';
import Dropdown from '@common/components/Dropdown';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import styles from '@modules/Habit/components/HabitList/HabitListItem/HabitListItem.module.less';
import HabitUpdateModal, { IHabitUpdateModalProps } from '../../HabitUpdateModal/HabitUpdateModal';

const { Title, Paragraph } = Typography;

interface IProps {
  habit: IHabitModel;
  setHabits: React.Dispatch<React.SetStateAction<IHabitModel[]>>;
}

const HabitListItem: React.FC<IProps> = ({ habit, setHabits }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [habitUpdateModalConfig, setHabitUpdateModalConfig] = useState<IHabitUpdateModalProps>();
  const { getHabitById, deleteHabit, archiveHabit, restoreHabit } = useHabitFetch();

  const [dropdownHover, setDropdownHover] = useState<boolean>(false);

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

  const dropdownIconContainer = () => ({
    backgroundColor: dropdownHover ? habit.colorLighten.value : 'unset'
  });

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
    Modal.confirm({
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
    Modal.confirm({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'habit.confirmModal.archive.title' }),
      content: intl.formatMessage({ id: 'habit.confirmModal.archive.content' }),
      okText: intl.formatMessage({ id: 'habit.confirmModal.archive.okText' }),
      cancelText: intl.formatMessage({ id: 'habit.confirmModal.archive.cancelText' }),
      onOk: async () => {
        await handleArchive(habit);
      }
    });
  };

  const confirmRestore = async (habit: IHabitModel) => {
    Modal.confirm({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'habit.confirmModal.restore.title' }),
      content: intl.formatMessage({ id: 'habit.confirmModal.restore.content' }),
      okText: intl.formatMessage({ id: 'habit.confirmModal.restore.okText' }),
      cancelText: intl.formatMessage({ id: 'habit.confirmModal.restore.cancelText' }),
      onOk: async () => {
        await handleRestore(habit);
      }
    });
  };

  const menuItems: DropdownMenuItemProps = [
    {
      key: DropdownMenuKey.preview,
      onClick: async () => navigate(generatePath(Paths.HabitView, { id: habit.id }))
    },
    {
      key: DropdownMenuKey.update,
      onClick: async () => handleUpdateHabit()
    },
    {
      key: DropdownMenuKey.divider
    },
    {
      key: habit.isArchived ? DropdownMenuKey.restore : DropdownMenuKey.archive,
      onClick: () => (habit.isArchived ? confirmRestore(habit) : confirmArchive(habit))
    },
    {
      key: DropdownMenuKey.delete,
      onClick: () => confirmDelete(habit)
    }
  ];

  const dropdownButton = (
    <div
      className={styles.DropdownIconContainer}
      style={dropdownIconContainer()}
      onMouseEnter={() => setDropdownHover(true)}
      onMouseLeave={() => setDropdownHover(false)}
    >
      <FontAwesomeIcon icon={faEllipsisV} />
    </div>
  );

  return (
    <>
      <List.Item
        className={styles.ListItem}
        style={{
          backgroundColor: habit.color.value
        }}
      >
        <Row wrap={false} className={styles.ListItemRow}>
          <Col flex={1}>
            <Title level={5} className={styles.Title}>
              {habit.name}
            </Title>
            <Paragraph className={styles.Description}>{habit.description}</Paragraph>
          </Col>
          <Col className={styles.DropDownCol}>
            <Dropdown menuItems={menuItems} className={styles.Dropdown}>
              {dropdownButton}
            </Dropdown>
          </Col>
        </Row>
      </List.Item>
      {habitUpdateModalConfig ? <HabitUpdateModal {...habitUpdateModalConfig} /> : null}
    </>
  );
};

export default HabitListItem;
