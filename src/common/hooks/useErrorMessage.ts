import { useIntl } from 'react-intl';
import { FirebaseError } from 'firebase/app';
import { message } from 'antd';

const useErrorMessage = () => {
  const intl = useIntl();

  const showError = (error: any) => {
    if (error instanceof FirebaseError) {
      const errorMessage = intl.formatMessage({
        id: error.code,
        defaultMessage: intl.formatMessage({ id: 'common.defaultErrorMessage' })
      });
      message.error(errorMessage);
    } else {
      message.error(intl.formatMessage({ id: 'common.defaultErrorMessage' }));
    }
  };

  return {
    showError
  };
};

export default useErrorMessage;
