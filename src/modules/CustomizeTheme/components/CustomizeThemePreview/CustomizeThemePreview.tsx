import React from 'react';
import { Space } from 'antd';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@common/components/Button/Button';
import { createStyles } from 'antd-style';
import CustomizeThemeCarousel from '../CustomizeThemeCarousel';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    gap: ${token.padding}px;
  `
}));

const CustomizeThemePreview: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Space size={[10, 10]} wrap>
        <Button
          type="primary"
          icon={<FontAwesomeIcon icon={faPlus} />}
          text={intl.formatMessage({ id: 'customizeTheme.primaryButton' })}
        />
        <Button type="primary" ghost>
          {intl.formatMessage({ id: 'customizeTheme.primaryButton' })}
        </Button>
      </Space>
      <CustomizeThemeCarousel />
    </div>
  );
};

export default CustomizeThemePreview;
