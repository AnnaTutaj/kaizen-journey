import React, { useContext, useLayoutEffect, useRef } from 'react';
import { Layout, Space } from 'antd';
import { useIntl } from 'react-intl';
import { Paths } from '@common/constants/Paths';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import useCommonStyles from '@common/useStyles';
import { Link } from 'react-router-dom';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  footer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: ${token.layout.colorHeaderBg};

    .ant-space-item {
      font-size: 14px;
    }
  `,
  authorLink: css`
    white-space: pre;
  `
}));

const Footer: React.FC = () => {
  const intl = useIntl();
  const contentRef = useRef<HTMLDivElement>(null);
  const { setFooterHeight } = useContext(ThemeContext);
  const { styles: commonStyles } = useCommonStyles();
  const { styles, cx } = useStyles();

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
    <Layout.Footer className={styles.footer} ref={contentRef}>
      <Space orientation="vertical" size={4}>
        <span>
          <span>©2022 - 2026 {intl.formatMessage({ id: 'footer.credits' })} </span>
          <a className={cx(commonStyles.colorTextLink, styles.authorLink)} href="mailto:tutaj.anna.93@gmail.com">
            Anna Tutaj—Lamentowicz
          </a>
        </span>
        <Space size={10}>
          <Link className={commonStyles.colorTextLink} to={Paths.Support}>
            {intl.formatMessage({ id: 'footer.help' })}
          </Link>
          <span>•</span>
          <a
            className={commonStyles.colorTextLink}
            href="https://www.freeprivacypolicy.com/live/5ff9b681-264b-4e29-bdf8-0ecd766df5d9"
            target="_blank"
            rel="noreferrer"
          >
            {intl.formatMessage({ id: 'footer.privacyPolicy' })}
          </a>
        </Space>
      </Space>
    </Layout.Footer>
  );
};

export default Footer;
