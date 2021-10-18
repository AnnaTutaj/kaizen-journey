import PageUnderConstruction from '@common/components/PageUnderConstruction';
import React from 'react';
import { useIntl } from 'react-intl';

const Gratitude: React.FC = () => {
  const intl = useIntl();

  return <PageUnderConstruction title={intl.formatMessage({ id: 'header.gratitude' })} />;
};

export default Gratitude;
