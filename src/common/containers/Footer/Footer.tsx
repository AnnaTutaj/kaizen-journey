import React, { useContext, useLayoutEffect, useRef } from 'react';
import { Space } from 'antd';
import { useIntl } from 'react-intl';
import { Paths } from '@common/constants/Paths';
import { StyledAuthorLink, StyledFooter } from './styled';
import { StyledColorTextLink } from '@common/components/Link/styled';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';

const Footer: React.FC = () => {
  const intl = useIntl();
  const contentRef = useRef<HTMLDivElement>(null);
  const { setFooterHeight } = useContext(ThemeContext);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (contentRef?.current?.offsetHeight) {
        setFooterHeight(contentRef.current.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setFooterHeight]);

  return (
    <StyledFooter ref={contentRef}>
      <Space direction="vertical" size={4}>
        <span>
          <span>©2022 - 2023 {intl.formatMessage({ id: 'footer.credits' })} </span>
          <StyledAuthorLink as="a" href="mailto:tutaj.anna.93@gmail.com">Anna Tutaj—Lamentowicz</StyledAuthorLink>
        </span>
        <Space size={10}>
          <StyledColorTextLink to={Paths.Support}>{intl.formatMessage({ id: 'footer.help' })}</StyledColorTextLink>
          <span>•</span>
          <StyledColorTextLink
            as="a"
            href="https://www.freeprivacypolicy.com/live/5ff9b681-264b-4e29-bdf8-0ecd766df5d9"
            target="_blank"
            rel="noreferrer"
          >
            {intl.formatMessage({ id: 'footer.privacyPolicy' })}
          </StyledColorTextLink>
        </Space>
      </Space>
    </StyledFooter>
  );
};

export default Footer;
