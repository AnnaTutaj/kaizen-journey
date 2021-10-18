import React from 'react';
import PageUnderConstruction from '@common/components/PageUnderConstruction';
import { useIntl } from 'react-intl';

const Dashboard: React.FC = () => {
  const intl = useIntl();

  return <PageUnderConstruction title={intl.formatMessage({ id: 'header.dashboard' })} />;
};

export default Dashboard;
