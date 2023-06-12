import React from 'react';
import { Space } from 'antd';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import { StyledCreditsSpan, StyledFooter } from './styled';

const Footer: React.FC = () => {
  const intl = useIntl();

  return (
    <StyledFooter>
      <Space direction="vertical" size={4}>
        <span>
          <StyledCreditsSpan>©2022 - 2023 {intl.formatMessage({ id: 'footer.credits' })} </StyledCreditsSpan>
          <a href="mailto:tutaj.anna.93@gmail.com">Anna Tutaj</a>
        </span>
        <Space size={10}>
          <Link to={Paths.Support}>{intl.formatMessage({ id: 'footer.help' })}</Link>
          <span>•</span>
          <a
            href="https://www.freeprivacypolicy.com/live/5ff9b681-264b-4e29-bdf8-0ecd766df5d9"
            target="_blank"
            rel="noreferrer"
          >
            {intl.formatMessage({ id: 'footer.privacyPolicy' })}
          </a>
        </Space>
      </Space>
    </StyledFooter>
  );
};

export default Footer;
