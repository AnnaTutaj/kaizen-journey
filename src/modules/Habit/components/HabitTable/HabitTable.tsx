import { Col, Grid, Popover, Row, Space, Tooltip } from 'antd';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import styles from './HabitTable.module.less';
import cn from 'classnames';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import Dropdown from '@common/components/Dropdown';
import Empty from '@common/components/Empty';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import useHabitHelper from '@modules/Habit/hooks/useHabitHelper';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLoading from '@common/components/PageLoading';
import HeaderText from '@common/components/HeaderText';
import { faBrush, faCog, faEllipsisV, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import HabitUpdateModal, { IHabitUpdateModalProps } from '@modules/Habit/components/HabitUpdateModal/HabitUpdateModal';
import { generatePath, useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import { useSelector } from 'react-redux';
import { IHabitTrackerOwnState } from '@modules/Habit/redux/HabitTracker/HabitTrackerInterface';
import { Visibility } from '@common/constants/Visibility';
import HabitTableColumnSettings, { ColumnType } from './HabitTableColumnSettings/HabitTableColumnSettings';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import Table, { ITableColumn } from '@common/components/Table/Table';
import useConfirmModal from '@common/hooks/useConfirmModal';

const { useBreakpoint } = Grid;

interface IProps {
  habits: IHabitModel[];
  setHabits: React.Dispatch<React.SetStateAction<IHabitModel[]>>;
  isInitialLoaded: boolean;
}

const HabitTable: React.FC<IProps> = ({ habits, setHabits, isInitialLoaded }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { confirmModal, confirmModalContextHolder } = useConfirmModal();
  const screens = useBreakpoint();
  const range = useSelector(({ habitTracker }: IHabitTrackerOwnState) => habitTracker.rangeLastDays);

  const [loading, setLoading] = useState<boolean>(false);
  const [habitUpdateModalConfig, setHabitUpdateModalConfig] = useState<IHabitUpdateModalProps>();
  const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<CheckboxValueType[]>([
    ColumnType.currentStreak,
    ColumnType.longestStreak,
    ColumnType.totalChecks
  ]);

  const { getDateStatus, getIconByDateStatus, getHoverInfoByDateStatus } = useHabitHelper();
  const { getHabitById, updateHabitDates, deleteHabit, archiveHabit } = useHabitFetch();

  const scrollTo = useCallback(() => {
    if (scrollContainerRef) {
      scrollContainerRef.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end'
      });
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    scrollTo();
  }, [scrollTo, range]);

  useEffect(() => {
    setVisibleColumns(
      screens.xs
        ? [ColumnType.currentStreak]
        : [ColumnType.currentStreak, ColumnType.longestStreak, ColumnType.totalChecks]
    );
  }, [screens.xs]);

  const refreshHabit = async (habit: IHabitModel) => {
    const updatedHabit = await getHabitById(habit.id);
    if (updatedHabit) {
      setHabits((prevState) => {
        return prevState.map((i) => (i.id === updatedHabit.id ? updatedHabit : i));
      });
    }
  };

  const handleClickDate = async (dateKey: string, habit: IHabitModel, dateStatus: HabitDateStatus) => {
    setLoading(true);
    await updateHabitDates({ habitId: habit.id, dateStatus, dateKey });
    await refreshHabit(habit);
    setLoading(false);
  };

  const handleUpdateHabit = (habit: IHabitModel) => {
    setHabitUpdateModalConfig({
      handleCancel: () => setHabitUpdateModalConfig(undefined),
      handleSubmit: async () => {
        setHabitUpdateModalConfig(undefined);
        await refreshHabit(habit);
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
      }
    });
  };

  const menuItems = (habit: IHabitModel): DropdownMenuItemProps => {
    return [
      {
        key: DropdownMenuKey.preview,
        onClick: async () => navigate(generatePath(Paths.HabitView, { id: habit.id }))
      },
      {
        key: DropdownMenuKey.update,
        onClick: async () => handleUpdateHabit(habit)
      },
      {
        key: DropdownMenuKey.divider
      },
      {
        key: DropdownMenuKey.archive,
        onClick: () => confirmArchive(habit)
      },
      {
        key: DropdownMenuKey.delete,
        onClick: () => confirmDelete(habit)
      }
    ];
  };

  const columns = (): ITableColumn<IHabitModel>[] => {
    const dateCols: ITableColumn<IHabitModel>[] = [];

    const today = dayjs();
    for (let i = 0; i <= range - 1; i++) {
      const isToday = i === 0;
      const date = today.subtract(i, 'days');
      const dateKey = date.format('YYYY-MM-DD');
      const monthShort = date.format('MMM');
      const monthDay = date.format('D');
      const weekDayShort = date.format('ddd');

      dateCols.push({
        title: () => {
          return (
            <div className={styles.DateHeaderContainer}>
              <div
                className={cn(styles.Date, { [styles.DateToday]: isToday })}
                ref={(element) => (isToday ? setScrollContainerRef(element) : null)}
              >
                <small className={styles.SmallText}>{monthShort}</small>
                <div className={styles.MonthDay}>{monthDay}</div>
                <small className={styles.SmallText}>{weekDayShort}</small>
              </div>
            </div>
          );
        },
        key: `date-${i}`,
        className: styles.DateCol,
        render: (value, record) => {
          const dateStatus = getDateStatus(record, dateKey);
          const { icon: hoverIcon, text: hoverText } = getHoverInfoByDateStatus(dateStatus);

          return (
            <div
              onClick={() => {
                handleClickDate(dateKey, record, dateStatus);
              }}
              className={cn(styles.DateSelectContainer, { [styles.Skipped]: dateStatus === HabitDateStatus.skipped })}
              style={{
                borderColor: record.colorLighten.value,
                backgroundColor: dateStatus === HabitDateStatus.checked ? record.color.value : 'unset'
              }}
            >
              <FontAwesomeIcon
                className={styles.DateHoverIcon}
                style={{
                  color: record.colorLighten.value
                }}
                icon={hoverIcon}
              />
              <small
                className={styles.DateHoverText}
                style={{
                  color: record.colorLighten.value
                }}
              >
                {hoverText}
              </small>
              {dateStatus === HabitDateStatus.skipped ? (
                <FontAwesomeIcon
                  className={styles.DateInfoIcon}
                  style={{
                    color: record.color.value
                  }}
                  icon={getIconByDateStatus(dateStatus)}
                />
              ) : null}
            </div>
          );
        }
      });
    }

    dateCols.reverse();

    return [
      {
        title: () => (
          <Row justify="space-between" align="middle">
            <Col>{intl.formatMessage({ id: 'habit.table.header.habit' })}</Col>
            <Col>
              <Popover
                placement="bottomLeft"
                title={
                  <div className={styles.PopoverTitle}>
                    <Space size={10}>
                      <FontAwesomeIcon icon={faBrush} />
                      {intl.formatMessage({ id: 'habit.table.popover.columnSettings.title' })}
                    </Space>
                  </div>
                }
                content={
                  <HabitTableColumnSettings visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
                }
                trigger="click"
              >
                <div className={styles.DropdownIconContainer}>
                  <FontAwesomeIcon className={styles.SettingsIcon} icon={faCog} />
                </div>
              </Popover>
            </Col>
          </Row>
        ),
        className: styles.NameCol,
        dataIndex: 'name',
        key: 'name',
        fixed: true,
        render: (text, record) => (
          <>
            <Row wrap={false} align="middle">
              <Col flex={1}>
                <div className={styles.HabitName}>{text}</div>
              </Col>
              <Col>
                <div className={styles.VisibilityIconContainer}>
                  <Tooltip
                    placement="bottom"
                    title={intl.formatMessage({
                      id: `common.visibility.${record.isPublic ? Visibility.public : Visibility.private}`
                    })}
                  >
                    <FontAwesomeIcon className={styles.HabitIcon} icon={record.isPublic ? faGlobe : faLock} />
                  </Tooltip>
                </div>
              </Col>
              <Col className={styles.DropdownCol}>
                <Dropdown menuItems={menuItems(record)} className={styles.Dropdown}>
                  <div className={styles.DropdownIconContainer}>
                    <FontAwesomeIcon className={styles.HabitIcon} icon={faEllipsisV} />
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </>
        )
      },
      ...dateCols,
      {
        title: () => <div className={styles.StreakHeader}>{intl.formatMessage({ id: 'habit.currentStreak' })}</div>,
        className: styles.StreakCol,
        key: 'currentStreak',
        fixed: 'right',
        align: 'right',
        render: (record) => <div className={styles.StreakValue}>{record.currentStreak.streakCount}</div>,
        visible: () => visibleColumns.includes(ColumnType.currentStreak)
      },
      {
        title: () => <div className={styles.StreakHeader}>{intl.formatMessage({ id: 'habit.longestStreak' })}</div>,
        className: styles.StreakCol,
        key: 'longestStreak',
        fixed: 'right',
        align: 'right',
        render: (record) => <div className={styles.StreakValue}>{record.longestStreak.streakCount}</div>,
        visible: () => visibleColumns.includes(ColumnType.longestStreak)
      },
      {
        title: () => <div className={styles.StreakHeader}>{intl.formatMessage({ id: 'habit.totalChecks' })}</div>,
        className: styles.StreakCol,
        key: 'totalChecks',
        fixed: 'right',
        align: 'right',
        render: (record) => <div className={styles.StreakValue}>{record.datesChecked.length}</div>,
        visible: () => visibleColumns.includes(ColumnType.totalChecks)
      }
    ];
  };

  if (!isInitialLoaded) {
    return <PageLoading />;
  }

  return (
    <>
      {loading ? <PageLoading /> : null}
      {habits && habits.length ? (
        <>
          <div className={styles.Header}>
            <HeaderText text={intl.formatMessage({ id: 'habit.table.title' })} />
          </div>
          <Table<IHabitModel>
            bordered={true}
            columns={columns()}
            dataSource={habits}
            pagination={false}
            scroll={{ x: true }}
            rowKey="id"
            className={styles.HabitTable}
          />
        </>
      ) : (
        <Empty description={intl.formatMessage({ id: 'habit.table.empty' })} />
      )}
      {habitUpdateModalConfig ? <HabitUpdateModal {...habitUpdateModalConfig} /> : null}
      {confirmModalContextHolder}
    </>
  );
};

export default HabitTable;
