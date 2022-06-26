import React from 'react';
import PageUnderConstruction from '@common/components/PageUnderConstruction';
import { useIntl } from 'react-intl';

const HabitArchive: React.FC = () => {
  const intl = useIntl();

  return <PageUnderConstruction title={intl.formatMessage({ id: 'habit.habitArchive' })} />;
};

export default HabitArchive;
