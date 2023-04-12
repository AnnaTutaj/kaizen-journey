import { Empty as AntDEmpty } from 'antd';
import styles from './Empty.module.less';
import { useIntl } from 'react-intl';
import HeaderText from '../HeaderText';
import ant01 from '@assets/ant_01.svg';

export interface IEmptyProps {
  description: string;
}

const Empty: React.FC<IEmptyProps> = ({ description }) => {
  const intl = useIntl();

  return (
    <AntDEmpty
      className={styles.Empty}
      image={<img src={ant01} className={styles.EmptyImage} alt="Kaizen Journey Mascot" />}
      description={
        <>
          <HeaderText text={intl.formatMessage({ id: 'common.empty' })} className={styles.EmptyTitle} />
          <div className={styles.EmptyDescription}>{description}</div>
        </>
      }
    />
  );
};

export default Empty;
