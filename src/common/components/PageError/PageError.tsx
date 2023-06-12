import React from 'react';
import { useIntl } from 'react-intl';
import HeaderText from '../HeaderText';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import Button from '@common/components/Button';
import { StyledPageErrorContainer, StyledPageErrorIcon } from './styled';

interface IProps {
  onClick: () => void;
}
const PageError: React.FC<IProps> = ({ onClick }) => {
  const intl = useIntl();

  return (
    <StyledPageErrorContainer>
      <StyledPageErrorIcon icon={faHeartBroken} />
      <HeaderText text={intl.formatMessage({ id: 'pageError.title' })} size="small" />
      <Button type="primary" onClick={onClick}>
        {intl.formatMessage({ id: 'pageError.button' })}
      </Button>
    </StyledPageErrorContainer>
  );
};

export default PageError;
