import { Button, Space } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import styles from './Habit.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import HabitTable from './components/HabitTable';

const Habit: React.FC = () => {
  const intl = useIntl();

  //todo: implementation
  const handleCreateHabit = () => {};

  return (
    <>
      <div className={styles.Header}>
        <Button type="primary" onClick={() => handleCreateHabit()}>
          <Space size={10}>
            <FontAwesomeIcon icon={faPlus} />
            {intl.formatMessage({ id: 'habit.create.button' })}
          </Space>
        </Button>
      </div>
      <HabitTable />
    </>
  );
};

export default Habit;
