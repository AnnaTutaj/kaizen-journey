import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Menu } from 'antd';
import { Paths } from '@common/constants/Paths';
import styles from './Habit.module.less';

const Habit: React.FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const items: { key: string; label: React.ReactElement }[] = useMemo(
    () => [
      {
        key: Paths.HabitTracker,
        label: <Link to={Paths.HabitTracker}>{intl.formatMessage({ id: 'habit.habitTracker' })}</Link>
      },
      {
        key: Paths.HabitArchive,
        label: <Link to={Paths.HabitArchive}>{intl.formatMessage({ id: 'habit.habitArchive' })}</Link>
      }
    ],
    [intl]
  );

  useEffect(() => {
    const findItem = items.find((i) => i.key === location.pathname);
    if (findItem) {
      setSelectedKeys([findItem.key]);
    }
  }, [location.pathname, items]);

  return (
    <>
      <Menu mode={'horizontal'} className={styles.MenuContainer} selectedKeys={selectedKeys} items={items} />

      <Outlet />
    </>
  );
};

export default Habit;
