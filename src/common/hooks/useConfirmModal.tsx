import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalFuncProps } from 'antd';
import { useCallback } from 'react';

import styles from './useConfirmModal.module.less';

const useConfirmModal = () => {
  const [modal, confirmModalContextHolder] = Modal.useModal();

  const confirmModal = useCallback(
    (props: ModalFuncProps) => {
      modal.confirm({
        className: styles.ConfirmModal,
        closeIcon: <FontAwesomeIcon icon={faTimes} className={styles.CloseIcon} />,
        ...props
      });
    },
    [modal]
  );

  return {
    confirmModal,
    confirmModalContextHolder
  };
};

export default useConfirmModal;
