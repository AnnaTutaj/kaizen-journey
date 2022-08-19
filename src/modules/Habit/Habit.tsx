import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Menu from '@common/components/Menu';
import { Paths } from '@common/constants/Paths';

const Habit: React.FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const items: { key: string; label: React.ReactElement }[] = useMemo(
    () => [
      {
        key: Paths.HabitTracker,
        label: <Link to={Paths.HabitTracker}>{intl.formatMessage({ id: 'habit.menu.habitTracker' })}</Link>
      },
      {
        key: Paths.HabitArchive,
        label: <Link to={Paths.HabitArchive}>{intl.formatMessage({ id: 'habit.menu.habitArchive' })}</Link>
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
      <Menu selectedKeys={selectedKeys} items={items} />

      <Outlet />
    </>
  );
};

export default Habit;
