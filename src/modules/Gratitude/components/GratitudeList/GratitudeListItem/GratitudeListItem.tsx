import { Col, List, Row, Tag, Tooltip } from 'antd';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import { faEllipsisV, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import Dropdown, { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import { Visibility } from '@common/constants/Visibility';
import useConfirmModal from '@common/hooks/useConfirmModal';
import ImagePreview from '@common/components/ImagePreview';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import useCommonStyles from '@common/useStyles';
import useListItemStyles from '@common/components/ListItem/useStyles';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { useTheme } from 'antd-style';
import { formatTime } from '@common/helpers/TimeHelper';

interface IProps {
  gratitude: IGratitudeModel;
  removeGratitude?: (id: string) => void;
  updateGratitude?: (gratitude: IGratitudeModel) => void;
}

const GratitudeListItem: React.FC<IProps> = ({ gratitude, removeGratitude, updateGratitude }) => {
  const intl = useIntl();
  const { styles: commonStyles } = useCommonStyles();
  const { styles } = useListItemStyles({ backgroundColor: gratitude.color, colorHover: gratitude.color });
  const { userProfile } = useUserProfile();
  const token = useTheme();

  const { confirmModal, confirmModalContextHolder } = useConfirmModal();

  const confirmDelete = async () => {
    confirmModal({
      centered: true,
      closable: true,
      title: intl.formatMessage({ id: 'gratitude.confirmModal.delete.title' }),
      content: intl.formatMessage({ id: 'gratitude.confirmModal.delete.content' }),
      okText: intl.formatMessage({ id: 'gratitude.confirmModal.delete.okText' }),
      cancelText: intl.formatMessage({ id: 'gratitude.confirmModal.delete.cancelText' }),
      onOk: async () => {
        await handleDelete();
      }
    });
  };

  const handleDelete = async () => {
    if (removeGratitude) {
      await deleteDoc(doc(db, 'gratitude', gratitude.id));
      removeGratitude(gratitude.id);
    }
  };

  const handleUpdate = async () => {
    if (updateGratitude) {
      updateGratitude(gratitude);
    }
  };

  const convertedImageURLs = useMemo(
    () =>
      gratitude.imageURLs.map((url) => {
        if (url.includes('https://drive.google.com/uc?id=')) {
          const splitText = url.split('/');
          const imageId = splitText[3].replace('uc?id=', '');
          return `https://drive.google.com/thumbnail?id=${imageId}&sz=w250`;
        }

        return url;
      }),
    [gratitude]
  );

  const menuItems: DropdownMenuItemProps = [
    {
      key: DropdownMenuKey.update,
      onClick: async () => handleUpdate()
    },
    {
      key: DropdownMenuKey.delete,
      onClick: () => confirmDelete()
    }
  ];

  const miliseconds = gratitude.date.seconds * 1000;
  const monthShort = dayjs(miliseconds).format('MMM');
  const monthDay = dayjs(miliseconds).format('D');
  const weekDayShort = dayjs(miliseconds).format('ddd');
  const year = dayjs(miliseconds).format('YYYY');
  const showYear = year !== dayjs().format('YYYY');

  return (
    <>
      <List.Item className={styles.listItem}>
        <Row className={styles.listItemRow} wrap={false}>
          <Col>
            <div className={styles.date}>
              <small className={styles.smallText}>{monthShort}</small>
              {showYear ? <small className={styles.smallText}>{year}</small> : null}
              <span>{monthDay}</span>
              <small className={styles.smallText}>{weekDayShort}</small>
            </div>
          </Col>
          <Col flex={1}>
            <Title className={styles.title} level={5}>
              {gratitude.title}
            </Title>
            {convertedImageURLs.length ? <ImagePreview srcs={convertedImageURLs} /> : null}
            <Paragraph className={styles.descriptionParagraph}>{gratitude.description}</Paragraph>
            <Row gutter={10}>
              {gratitude.tags.map((tag) => (
                <Col className={commonStyles.ellipsisContainer} key={tag}>
                  <small>#{tag}</small>
                </Col>
              ))}
            </Row>
            {gratitude.seconds > 0 ? (
              <Tag color={token.layout.colorsCategoryHover[gratitude.color]} className={styles.secondsTag}>
                <span>{intl.formatMessage({ id: 'gratitude.form.field.seconds' })}: </span>
                {formatTime(gratitude.seconds)}
              </Tag>
            ) : null}
          </Col>
          <Col>
            <div className={styles.visibilityIconContainer}>
              <Tooltip
                placement="left"
                title={intl.formatMessage({
                  id: `common.visibility.${gratitude.isPublic ? Visibility.public : Visibility.private}`
                })}
              >
                <FontAwesomeIcon className={styles.visibilityIcon} icon={gratitude.isPublic ? faGlobe : faLock} />
              </Tooltip>
            </div>
          </Col>

          {gratitude.createdByUid === userProfile.uid ? (
            <Col className={styles.dropDownCol}>
              <Dropdown className={styles.dropdown} menuItems={menuItems}>
                <div className={styles.dropdownIconContainer}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </div>
              </Dropdown>
            </Col>
          ) : null}
        </Row>
      </List.Item>
      {confirmModalContextHolder}
    </>
  );
};

export default GratitudeListItem;
