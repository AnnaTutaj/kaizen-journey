import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalFuncProps } from 'antd';
import { useCallback } from 'react';
import mascotMapImage from '@assets/mascot_map.svg';
import mascotWelcomeImage from '@assets/mascot_welcome.svg';
import mascotTrashImage from '@assets/mascot_trash.svg';
import mascotFolderImage from '@assets/mascot_folder.svg';
import Image from '@common/components/Image/Image';
import { MascotImage } from '@common/constants/MascotImage';
import { createStyles } from 'antd-style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';

export interface IConfirmModalProps extends ModalFuncProps {
  imageMascot?: MascotImage | null;
}

const useConfirmModal = () => {
  const intl = useIntl();
  const { styles } = useStyles();
  const [modal, confirmModalContextHolder] = Modal.useModal();

  const renderTitle = useCallback(
    (title: IConfirmModalProps['title'], imageMascot: IConfirmModalProps['imageMascot']) => {
      if (!imageMascot) {
        return null;
      }

      let imageSrc: string;

      switch (imageMascot) {
        case MascotImage.trash:
          imageSrc = mascotTrashImage;
          break;

        case MascotImage.map:
          imageSrc = mascotMapImage;
          break;

        case MascotImage.welcome:
          imageSrc = mascotWelcomeImage;
          break;

        case MascotImage.folder:
          imageSrc = mascotFolderImage;
          break;
      }

      return (
        <div className={styles.titleContainer}>
          <div className={styles.iconContainer}>
            <Image width={120} src={imageSrc} alt="Kaizen Journey Mascot" preview={false} />
          </div>
          <>{title}</>
        </div>
      );
    },
    []
  );

  const confirmModal = useCallback(
    ({ imageMascot = MascotImage.trash, title, ...props }: IConfirmModalProps) => {
      modal.confirm({
        closeIcon: <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />,
        icon: null,
        cancelText: intl.formatMessage({ id: 'common.cancel' }),
        title: renderTitle(title, imageMascot),
        ...props
      });
    },
    [modal, renderTitle]
  );

  return {
    confirmModal,
    confirmModalContextHolder
  };
};

const useStyles = createStyles(({ css }) => ({
  closeIcon: css`
    font-size: 25px;
    vertical-align: -6px;
  `,
  titleContainer: css`
    display: flex;
    flex-flow: column;
  `,
  iconContainer: css`
    width: 100%;
    text-align: center;
  `
}));

export default useConfirmModal;
