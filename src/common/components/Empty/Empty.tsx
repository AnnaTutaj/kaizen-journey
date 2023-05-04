import { Empty as AntDEmpty } from 'antd';
import styles from './Empty.module.less';
import { useIntl } from 'react-intl';
import HeaderText from '../HeaderText';
import image from '@assets/mascot_map.svg';

export interface IEmptyProps {
  description: string;
}

const Empty: React.FC<IEmptyProps> = ({ description }) => {
  const intl = useIntl();

  return (
    <AntDEmpty
      className={styles.Empty}
      image={<img src={image} className={styles.EmptyImage} alt="Kaizen Journey Mascot" />}
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
