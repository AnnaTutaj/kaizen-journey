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
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ITableColumn } from '@common/components/Table/Table';
import useConfirmModal from '@common/hooks/useConfirmModal';
import Spinner from '@common/components/Spinner';
import { MascotImage } from '@common/constants/MascotImage';
import {
  CnDateCol,
  CnNameCol,
  CnStreakCol,
  StyledDate,
  StyledDateHeaderContainer,
  StyledDateHoverIcon,
  StyledDateHoverText,
  StyledDateInfoIcon,
  StyledDateSelectContainer,
  StyledDropdownCol,
  StyledEllipsisIconContainer,
  StyledHabitIcon,
  StyledHabitName,
  StyledHabitTable,
  StyledHeader,
  StyledMonthDay,
  StyledPopoverTitle,
  StyledSettingsIcon,
  StyledSettingsIconContainer,
  StyledSmallText,
  StyledStreakHeader,
  StyledStreakValue
} from './styled';
import { StyledHeaderText } from '@common/components/HeaderText/styled';

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

  const [loadingHabitDate, setLoadingHabitDate] = useState<string[]>([]);
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
            <StyledDateHeaderContainer>
              <StyledDate $isToday={isToday} ref={(element) => (isToday ? setScrollContainerRef(element) : null)}>
                <StyledSmallText>{monthShort}</StyledSmallText>
                <StyledMonthDay>{monthDay}</StyledMonthDay>
                <StyledSmallText>{weekDayShort}</StyledSmallText>
              </StyledDate>
            </StyledDateHeaderContainer>
          );
        },
        key: `date-${i}`,
        className: CnDateCol,
        render: (value, record) => {
          const dateStatus = getDateStatus(record, dateKey);
          const isLoading: boolean =
            loadingHabitDate.filter((i) => i === getHabitDateValue(record.id, dateKey)).length > 0;
          const { icon: hoverIcon, text: hoverText } = getHoverInfoByDateStatus(dateStatus);

          return (
            <StyledDateSelectContainer
              $skipped={dateStatus === HabitDateStatus.skipped}
              $borderColor={record.color}
              $backgroundColor={dateStatus === HabitDateStatus.checked ? record.color : 'unset'}
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
                  <StyledDateHoverIcon $color={record.color} icon={hoverIcon} />
                  <StyledDateHoverText $color={record.color}>{hoverText}</StyledDateHoverText>
                  {dateStatus === HabitDateStatus.skipped ? (
                    <StyledDateInfoIcon $color={record.color} icon={getIconByDateStatus(dateStatus)} />
                  ) : null}
                </>
              )}
            </StyledDateSelectContainer>
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
                  <StyledPopoverTitle>
                    <Space size={10}>
                      <FontAwesomeIcon icon={faBrush} />
                      {intl.formatMessage({ id: 'habit.table.popover.columnSettings.title' })}
                    </Space>
                  </StyledPopoverTitle>
                }
                content={
                  <HabitTableColumnSettings visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
                }
                trigger="click"
              >
                <StyledSettingsIconContainer>
                  <StyledSettingsIcon icon={faCog} />
                </StyledSettingsIconContainer>
              </Popover>
            </Col>
          </Row>
        ),
        className: CnNameCol,
        dataIndex: 'name',
        key: 'name',
        fixed: true,
        render: (text, record) => (
          <>
            <Row wrap={false} align="top">
              <Col flex={1}>
                <Row gutter={10}>
                  <Col>
                    <Tooltip
                      placement="right"
                      title={intl.formatMessage({
                        id: `common.visibility.${record.isPublic ? Visibility.public : Visibility.private}`
                      })}
                    >
                      <StyledHabitIcon icon={record.isPublic ? faGlobe : faLock} />
                    </Tooltip>
                  </Col>
                  <Col>
                    <StyledHabitName>{text}</StyledHabitName>
                  </Col>
                </Row>
              </Col>
              <StyledDropdownCol>
                <Dropdown menuItems={menuItems(record)}>
                  <StyledEllipsisIconContainer>
                    <StyledHabitIcon icon={faEllipsisV} />
                  </StyledEllipsisIconContainer>
                </Dropdown>
              </StyledDropdownCol>
            </Row>
          </>
        )
      },
      ...dateCols,
      {
        title: () => <StyledStreakHeader>{intl.formatMessage({ id: 'habit.currentStreak' })}</StyledStreakHeader>,
        className: CnStreakCol,
        key: 'currentStreak',
        fixed: 'right',
        align: 'right',
        render: (record) => <StyledStreakValue>{record.currentStreak.streakCount}</StyledStreakValue>,
        visible: () => visibleColumns.includes(ColumnType.currentStreak)
      },
      {
        title: () => <StyledStreakHeader>{intl.formatMessage({ id: 'habit.longestStreak' })}</StyledStreakHeader>,
        className: CnStreakCol,
        key: 'longestStreak',
        fixed: 'right',
        align: 'right',
        render: (record) => <StyledStreakValue>{record.longestStreak.streakCount}</StyledStreakValue>,
        visible: () => visibleColumns.includes(ColumnType.longestStreak)
      },
      {
        title: () => <StyledStreakHeader>{intl.formatMessage({ id: 'habit.totalChecks' })}</StyledStreakHeader>,
        className: CnStreakCol,
        key: 'totalChecks',
        fixed: 'right',
        align: 'right',
        render: (record) => <StyledStreakValue>{record.datesChecked.length}</StyledStreakValue>,
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
          <StyledHeader>
            <StyledHeaderText>{intl.formatMessage({ id: 'habit.table.title' })}</StyledHeaderText>
          </StyledHeader>
          <StyledHabitTable<IHabitModel>
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
