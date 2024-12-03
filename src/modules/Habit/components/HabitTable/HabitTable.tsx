import { Col, Grid, Row, Tooltip } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import Dropdown from '@common/components/Dropdown';
import Empty from '@common/components/Empty';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import useHabitHelper from '@modules/Habit/hooks/useHabitHelper';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLoading from '@common/components/PageLoading';
import { faArrowUpWideShort, faCog, faEllipsisV, faEyeSlash, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import HabitUpdateModal, { IHabitUpdateModalProps } from '@modules/Habit/components/HabitUpdateModal/HabitUpdateModal';
import { generatePath, useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import { useSelector } from 'react-redux';
import { IHabitTrackerOwnState } from '@modules/Habit/redux/HabitTracker/HabitTrackerInterface';
import { Visibility } from '@common/constants/Visibility';
import HabitTableColumnSettings, { ColumnType } from './HabitTableColumnSettings/HabitTableColumnSettings';
import Table, { ITableColumn } from '@common/components/Table/Table';
import useConfirmModal from '@common/hooks/useConfirmModal';
import Spinner from '@common/components/Spinner';
import { MascotImage } from '@common/constants/MascotImage';
import useCommonStyles from '@common/useStyles';
import { useStyles } from './useStyles';
import { useTheme } from 'antd-style';
import HabitResource from '@modules/Habit/api/HabitResource';
import Drawer from '@common/components/Drawer/Drawer';
import HabitReorderModal, { IHabitReorderModalalProps } from '../HabitReorderModal/HabitReorderModal';

const { useBreakpoint } = Grid;

interface IProps {
  habits: IHabitModel[];
  setHabitsInOrder: ({ habitsToSet, orderToSet }: { habitsToSet?: IHabitModel[]; orderToSet?: string[] }) => void;
  isInitialLoaded: boolean;
  updateHabit: (updatedHabit: IHabitModel) => void;
  deleteHabit: (id: string) => void;
}

const HabitTable: React.FC<IProps> = ({ habits, setHabitsInOrder, updateHabit, deleteHabit, isInitialLoaded }) => {
  const intl = useIntl();
  const token = useTheme();
  const { styles: commonStyles } = useCommonStyles();
  const { styles, cx } = useStyles();
  const navigate = useNavigate();
  const { confirmModal, confirmModalContextHolder } = useConfirmModal();
  const screens = useBreakpoint();
  const range = useSelector(({ habitTracker }: IHabitTrackerOwnState) => habitTracker.rangeLastDays);
  const [loadingHabitDate, setLoadingHabitDate] = useState<string[]>([]);
  const [habitUpdateModalConfig, setHabitUpdateModalConfig] = useState<IHabitUpdateModalProps>();
  const [habitReorderModalConfig, setHabitReorderModalConfig] = useState<IHabitReorderModalalProps>();
  const todayHeaderRef = useRef<HTMLDivElement | null>(null);

  const [isOpenColumnSettings, setIsOpenColumnSettings] = useState(false);

  const showColumnSettings = useCallback(() => {
    setIsOpenColumnSettings(true);
  }, []);

  const hideColumnSettings = useCallback(() => {
    setIsOpenColumnSettings(false);
  }, []);

  const [visibleColumns, setVisibleColumns] = useState<ColumnType[]>([
    ColumnType.currentStreak,
    ColumnType.longestStreak,
    ColumnType.totalChecks
  ]);

  const { getDateStatus, getIconByDateStatus, getHoverInfoByDateStatus } = useHabitHelper();
  const { getHabitById, updateHabitDates, archiveHabit } = useHabitFetch();

  const scrollToTodayColumn = useCallback(() => {
    if (todayHeaderRef.current) {
      todayHeaderRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end'
      });
    }
  }, []);

  const setTodayHeaderRef = useCallback(
    (element: HTMLDivElement | null) => {
      const scrollToTodayColumnEnd = todayHeaderRef.current ? false : true;

      if (element) {
        todayHeaderRef.current = element;
        if (scrollToTodayColumnEnd) {
          scrollToTodayColumn();
        }
      }
    },
    [scrollToTodayColumn]
  );

  useEffect(() => {
    setVisibleColumns(
      screens.xs
        ? [ColumnType.currentStreak]
        : [ColumnType.currentStreak, ColumnType.longestStreak, ColumnType.totalChecks]
    );
  }, [screens.xs]);

  const refreshHabit = useCallback(
    async (habit: IHabitModel) => {
      const updatedHabit = await getHabitById(habit.id);
      if (updatedHabit) {
        updateHabit(updatedHabit);
      }
    },
    [updateHabit, getHabitById]
  );

  const getHabitDateValue = useCallback((habitId: string, dateKey: string) => `${habitId}${dateKey}`, []);

  const handleClickDate = useCallback(
    async (dateKey: string, habit: IHabitModel, dateStatus: HabitDateStatus) => {
      const habitDateValue = getHabitDateValue(habit.id, dateKey);
      setLoadingHabitDate((prevState) => [...prevState, habitDateValue]);
      await updateHabitDates({ habitId: habit.id, dateStatus, dateKey });
      await refreshHabit(habit);
      setLoadingHabitDate((prevState) => [...prevState.filter((i) => i !== habitDateValue)]);
    },
    [getHabitDateValue, refreshHabit, updateHabitDates]
  );

  const handleUpdateHabit = useCallback(
    (habit: IHabitModel) => {
      setHabitUpdateModalConfig({
        handleCancel: () => setHabitUpdateModalConfig(undefined),
        handleSubmit: async () => {
          setHabitUpdateModalConfig(undefined);
          await refreshHabit(habit);
        },
        habit
      });
    },
    [refreshHabit]
  );

  const handleReorder = useCallback(() => {
    setHabitReorderModalConfig({
      handleCancel: () => setHabitReorderModalConfig(undefined),
      handleSubmit: async (order) => {
        setHabitReorderModalConfig(undefined);
        setHabitsInOrder({ orderToSet: order });
      },
      habits
    });
  }, [setHabitsInOrder, habits]);

  const handleDelete = useCallback(
    async (habit: IHabitModel) => {
      await HabitResource.delete(habit.id);
      deleteHabit(habit.id);
    },
    [deleteHabit]
  );

  const handleArchive = useCallback(
    async (habit: IHabitModel) => {
      await archiveHabit(habit.id);
      deleteHabit(habit.id);
    },
    [archiveHabit, deleteHabit]
  );

  const confirmDelete = useCallback(
    async (habit: IHabitModel) => {
      confirmModal({
        centered: true,
        closable: true,
        title: intl.formatMessage({ id: 'habit.confirmModal.delete.title' }),
        content: intl.formatMessage({ id: 'habit.confirmModal.delete.content' }),
        okText: intl.formatMessage({ id: 'habit.confirmModal.delete.okText' }),
        onOk: async () => {
          await handleDelete(habit);
        }
      });
    },
    [intl, handleDelete, confirmModal]
  );

  const confirmArchive = useCallback(
    async (habit: IHabitModel) => {
      confirmModal({
        centered: true,
        closable: true,
        title: intl.formatMessage({ id: 'habit.confirmModal.archive.title' }),
        content: intl.formatMessage({ id: 'habit.confirmModal.archive.content' }),
        okText: intl.formatMessage({ id: 'habit.confirmModal.archive.okText' }),
        onOk: async () => {
          await handleArchive(habit);
        },
        imageMascot: MascotImage.folder
      });
    },
    [intl, handleArchive, confirmModal]
  );

  const menuItems = useCallback(
    (habit: IHabitModel): DropdownMenuItemProps => {
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
    },
    [navigate, handleUpdateHabit, confirmArchive, confirmDelete]
  );

  const tableMenuItems: DropdownMenuItemProps = useMemo(
    (): DropdownMenuItemProps => [
      {
        key: 'manageColumns',
        item: {
          icon: faEyeSlash,
          text: intl.formatMessage({ id: 'habit.table.columnSettings.title' })
        },
        onClick: showColumnSettings
      },
      {
        key: 'reorder',
        item: {
          icon: faArrowUpWideShort,
          text: intl.formatMessage({ id: 'habit.reorder' })
        },
        onClick: handleReorder
      }
    ],
    [intl, showColumnSettings, handleReorder]
  );

  const columns = useMemo((): ITableColumn<IHabitModel>[] => {
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
            <div className={styles.dateHeaderContainer}>
              <div
                className={cx(styles.date, { [styles.dateIsToday]: isToday })}
                ref={(element) => (isToday ? setTodayHeaderRef(element) : null)}
              >
                <small className={styles.smallText}>{monthShort}</small>
                <div className={styles.monthDay}>{monthDay}</div>
                <small className={styles.smallText}>{weekDayShort}</small>
              </div>
            </div>
          );
        },
        key: `date-${i}`,
        className: styles.dateCol,
        render: (value, record) => {
          const dateStatus = getDateStatus(record, dateKey);
          const isLoading: boolean =
            loadingHabitDate.filter((i) => i === getHabitDateValue(record.id, dateKey)).length > 0;
          const { icon: hoverIcon, text: hoverText } = getHoverInfoByDateStatus(dateStatus);

          return (
            <div
              className={cx(styles.dateSelectContainer, {
                [styles.skipped]: dateStatus === HabitDateStatus.skipped
              })}
              style={{
                borderColor: token.layout.colorsCategory[record.color],
                backgroundColor:
                  dateStatus === HabitDateStatus.checked ? token.layout.colorsCategory[record.color] : 'unset'
              }}
              onClick={() => {
                if (isLoading) {
                  return;
                }
                handleClickDate(dateKey, record, dateStatus);
              }}
            >
              {isLoading ? (
                <Spinner size="small" />
              ) : (
                <>
                  <FontAwesomeIcon
                    className={styles.dateHoverIcon}
                    style={{ color: token.layout.colorsCategoryHover[record.color] }}
                    icon={hoverIcon}
                  />
                  <small
                    className={styles.dateHoverText}
                    style={{ color: token.layout.colorsCategoryHover[record.color] }}
                  >
                    {hoverText}
                  </small>
                  {dateStatus === HabitDateStatus.skipped ? (
                    <FontAwesomeIcon
                      className={styles.dateInfoIcon}
                      style={{ color: token.layout.colorsCategory[record.color] }}
                      icon={getIconByDateStatus(dateStatus)}
                    />
                  ) : null}
                </>
              )}
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
              <Dropdown menuItems={tableMenuItems}>
                <div className={styles.settingsIconContainer}>
                  <FontAwesomeIcon className={styles.settingsIcon} icon={faCog} />
                </div>
              </Dropdown>
            </Col>
          </Row>
        ),
        className: styles.nameCol,
        dataIndex: 'name',
        key: 'name',
        fixed: true,
        render: (text, record) => (
          <>
            <Row wrap={false} align="top">
              <Col flex={1}>
                <div className={styles.habitName}>
                  <Tooltip
                    placement="right"
                    title={intl.formatMessage({
                      id: `common.visibility.${record.isPublic ? Visibility.public : Visibility.private}`
                    })}
                  >
                    <FontAwesomeIcon className={styles.habitVisibilityIcon} icon={record.isPublic ? faGlobe : faLock} />
                  </Tooltip>

                  <Tooltip
                    placement="bottom"
                    title={
                      <div>
                        <div>{text}</div>
                        {record.description ? (
                          <div className={styles.tooltipDescription}>{record.description}</div>
                        ) : null}
                      </div>
                    }
                  >
                    {text}
                  </Tooltip>
                </div>
              </Col>
              <Col className={styles.dropdownCol}>
                <Dropdown menuItems={menuItems(record)}>
                  <div className={styles.ellipsisIconContainer}>
                    <FontAwesomeIcon className={styles.habitIcon} icon={faEllipsisV} />
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </>
        )
      },
      ...dateCols,
      {
        title: () => <div className={styles.streakHeader}>{intl.formatMessage({ id: 'habit.currentStreak' })}</div>,
        className: styles.streakCol,
        key: 'currentStreak',
        fixed: 'right',
        align: 'right',
        render: (record) => <div className={styles.streakValue}>{record.currentStreak.streakCount}</div>,
        visible: () => visibleColumns.includes(ColumnType.currentStreak)
      },
      {
        title: () => <div className={styles.streakHeader}>{intl.formatMessage({ id: 'habit.longestStreak' })}</div>,
        className: styles.streakCol,
        key: 'longestStreak',
        fixed: 'right',
        align: 'right',
        render: (record) => <div className={styles.streakValue}>{record.longestStreak.streakCount}</div>,
        visible: () => visibleColumns.includes(ColumnType.longestStreak)
      },
      {
        title: () => <div className={styles.streakHeader}>{intl.formatMessage({ id: 'habit.totalChecks' })}</div>,
        className: styles.streakCol,
        key: 'totalChecks',
        fixed: 'right',
        align: 'right',
        render: (record) => <div className={styles.streakValue}>{record.datesChecked.length}</div>,
        visible: () => visibleColumns.includes(ColumnType.totalChecks)
      }
    ];
  }, [
    getDateStatus,
    getHabitDateValue,
    getHoverInfoByDateStatus,
    handleClickDate,
    getIconByDateStatus,
    intl,
    visibleColumns,
    menuItems,
    tableMenuItems,
    loadingHabitDate,
    range
  ]);

  if (!isInitialLoaded) {
    return <PageLoading />;
  }

  return (
    <>
      {habits && habits.length ? (
        <>
          <div className={styles.header}>
            <span className={commonStyles.headerText}>{intl.formatMessage({ id: 'habit.table.title' })}</span>
          </div>
          <Table<IHabitModel>
            className={styles.habitTable}
            bordered={true}
            columns={columns}
            dataSource={habits}
            pagination={false}
            scroll={{ x: true }}
            rowKey="id"
          />
          <Drawer
            title={intl.formatMessage({ id: 'habit.table.columnSettings.title' })}
            placement="right"
            close={hideColumnSettings}
            open={isOpenColumnSettings}
            width="300"
          >
            <HabitTableColumnSettings visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
          </Drawer>
        </>
      ) : (
        <Empty description={intl.formatMessage({ id: 'habit.table.empty' })} />
      )}
      {habitUpdateModalConfig ? <HabitUpdateModal {...habitUpdateModalConfig} /> : null}
      {habitReorderModalConfig ? <HabitReorderModal {...habitReorderModalConfig} /> : null}
      {confirmModalContextHolder}
    </>
  );
};

export default HabitTable;
