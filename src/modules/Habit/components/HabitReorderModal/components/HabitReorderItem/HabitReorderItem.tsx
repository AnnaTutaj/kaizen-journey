import React from 'react';
import { IHabitModel } from '@modules/Habit/models/HabitModel';
import { createStyles, useTheme } from 'antd-style';
import { Card, Space } from 'antd';

interface IProps {
  habit: IHabitModel;
}

const HabitReorderItem: React.FC<IProps> = ({ habit }) => {
  const { styles } = useStyles();
  const token = useTheme();

  return (
    <Card size="small">
      <Space>
        <div
          className={styles.color}
          style={{
            backgroundColor: token.layout.colorsCategory[habit.color]
          }}
        />
        {habit.name}
      </Space>
    </Card>
  );
};

const useStyles = createStyles(({ css, token }) => ({
  color: css`
    width: 20px;
    height: 20px;
    border-radius: ${token.borderRadiusSM}px;
  `
}));

export default HabitReorderItem;
