import React from 'react';
import { Layout, Space } from 'antd';
import { useIntl } from 'react-intl';
import styles from './Footer.module.less';
import { Link } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';

const Footer: React.FC = () => {
  const intl = useIntl();

  return (
    <Layout.Footer className={styles.Footer}>
      <div>
        <span>
          <span className={styles.CreditsText}>©2022 {intl.formatMessage({ id: 'footer.credits' })} </span>
          <a className={styles.Link} href="mailto:tutaj.anna.93@gmail.com">
            Anna Tutaj
          </a>
        </span>
      </div>
      <div>
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
      </div>
    </Layout.Footer>
  );
};

export default Footer;
