import PageUnderConstruction from '@common/components/PageUnderConstruction';
import React from 'react';
import { useIntl } from 'react-intl';

const Habit: React.FC = () => {
  const intl = useIntl();

  return <PageUnderConstruction title={intl.formatMessage({ id: 'header.habits' })} />;
};

export default Habit;
