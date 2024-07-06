import { Col, Grid, Popover, Row, Space, Tooltip } from 'antd';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import Dropdown from '@common/components/Dropdown';
import Empty from '@common/components/Empty';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { HabitDateStatus } from '@common/constants/HabitDateStatus';
import useHabitHelper from '@modules/Habit/hooks/useHabitHelper';
import useHabitFetch from '@modules/Habit/hooks/useHabitFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLoading from '@common/components/PageLoading';
import { faBrush, faCog, faEllipsisV, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
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

const { useBreakpoint } = Grid;

interface IProps {
  habits: IHabitModel[];
  setHabits: React.Dispatch<React.SetStateAction<IHabitModel[]>>;
  isInitialLoaded: boolean;
}

const HabitTable: React.FC<IProps> = ({ habits, setHabits, isInitialLoaded }) => {
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
  const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<ColumnType[]>([
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

  const getHabitDateValue = (habitId: string, dateKey: string) => `${habitId}${dateKey}`;

  const handleClickDate = async (dateKey: string, habit: IHabitModel, dateStatus: HabitDateStatus) => {
    const habitDateValue = getHabitDateValue(habit.id, dateKey);
    setLoadingHabitDate((prevState) => [...prevState, habitDateValue]);
    await updateHabitDates({ habitId: habit.id, dateStatus, dateKey });
    await refreshHabit(habit);
    setLoadingHabitDate((prevState) => [...prevState.filter((i) => i !== habitDateValue)]);
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
      },
      imageMascot: MascotImage.folder
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
            <div className={styles.dateHeaderContainer}>
              <div
                className={cx(styles.date, { [styles.dateIsToday]: isToday })}
                ref={(element) => (isToday ? setScrollContainerRef(element) : null)}
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
              <Popover
                placement="bottomLeft"
                title={
                  <div className={styles.popoverTitle}>
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
                <div className={styles.settingsIconContainer}>
                  <FontAwesomeIcon className={styles.settingsIcon} icon={faCog} />
                </div>
              </Popover>
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
  };

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
            columns={columns()}
            dataSource={habits}
            pagination={false}
            scroll={{ x: true }}
            rowKey="id"
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
