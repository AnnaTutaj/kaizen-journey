import { useIntl } from 'react-intl';
import image from '@assets/mascot_map.svg';
import { Empty as AntEmpty } from 'antd';
import useStyles from './useStyles';
import useCommonStyles from '@common/useStyles';

export interface IEmptyProps {
  description: string;
}

const Empty: React.FC<IEmptyProps> = ({ description }) => {
  const intl = useIntl();
  const { styles, cx } = useStyles();
  const { styles: commonStyles } = useCommonStyles();

  return (
    <AntEmpty
      className={styles.empty}
      image={<img className={styles.emptyImage} src={image} alt="Kaizen Journey Mascot" />}
      description={
        <>
          <span className={cx(commonStyles.headerText, styles.emptyHeaderText)}>
            {intl.formatMessage({ id: 'common.empty' })}
          </span>
          <div>{description}</div>
        </>
      }
    />
  );
};

export default Empty;
