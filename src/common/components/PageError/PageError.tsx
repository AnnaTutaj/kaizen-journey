import React from 'react';
import { useIntl } from 'react-intl';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import Button from '@common/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCommonStyles from '@common/useStyles';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  pageErrorContainer: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: ${token.colorBgLayout};
  `,
  pageErrorIcon: css`
    font-size: 60px;
  `
}));

interface IProps {
  onClick: () => void;
}
const PageError: React.FC<IProps> = ({ onClick }) => {
  const intl = useIntl();
  const { styles, cx } = useStyles();
  const { styles: commonStyles } = useCommonStyles();

  return (
    <div className={styles.pageErrorContainer}>
      <FontAwesomeIcon className={styles.pageErrorIcon} icon={faHeartBroken} />
      <span className={cx(commonStyles.headerText, commonStyles.headerTextSmall)}>
        {intl.formatMessage({ id: 'pageError.title' })}
      </span>
      <Button type="primary" onClick={onClick}>
        {intl.formatMessage({ id: 'pageError.button' })}
      </Button>
    </div>
  );
};

export default PageError;
