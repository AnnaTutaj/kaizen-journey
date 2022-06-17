import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Empty as AntDEmpty } from 'antd';
import styles from './Empty.module.less';
import { faCloudMoonRain } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import HeaderText from '../HeaderText';

export interface IEmptyProps {
  description: string;
}

const Empty: React.FC<IEmptyProps> = ({ description }) => {
  const intl = useIntl();

  return (
    <AntDEmpty
      image={<FontAwesomeIcon icon={faCloudMoonRain} className={styles.EmptyIcon} />}
      description={
        <>
          <div className={styles.EmptyTitle}>
            <HeaderText text={intl.formatMessage({ id: 'common.empty' })} />
          </div>
          <div className={styles.EmptyDescription}>{description}</div>
        </>
      }
    />
  );
};

export default Empty;
