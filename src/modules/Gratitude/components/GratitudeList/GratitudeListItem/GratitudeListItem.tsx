import { Avatar, Col, Row, Tooltip } from 'antd';
import React, { useState } from 'react';
import { List, Typography } from 'antd';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import styles from '@modules/Gratitude/components/GratitudeList/GratitudeListItem/GratitudeListItem.module.less';
import { faEllipsisV, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import Dropdown from '@common/components/Dropdown';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import { Visibility } from '@common/constants/Visibility';
import useConfirmModal from '@common/hooks/useConfirmModal';
import ImagePreview from '@common/components/ImagePreview';
import { useAuth } from '@common/contexts/AuthContext';

const { Title, Paragraph } = Typography;

interface IProps {
  gratitude: IGratitudeModel;
  removeGratitude?: (id: string) => void;
  updateGratitude?: (gratitude: IGratitudeModel) => void;
}

const GratitudeListItem: React.FC<IProps> = ({ gratitude, removeGratitude, updateGratitude }) => {
  const intl = useIntl();
  const { userProfile } = useAuth();

  const { confirmModal, confirmModalContextHolder } = useConfirmModal();

  const [dropdownHover, setDropdownHover] = useState<boolean>(false);

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

  const dropdownIconContainer = () => ({
    backgroundColor: dropdownHover ? gratitude.colorLighten.value : 'unset'
  });

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

  const dropdownButton = (
    <div
      className={styles.DropdownIconContainer}
      style={dropdownIconContainer()}
      onMouseEnter={() => setDropdownHover(true)}
      onMouseLeave={() => setDropdownHover(false)}
    >
      <FontAwesomeIcon icon={faEllipsisV} />
    </div>
  );

  const miliseconds = gratitude.date.seconds * 1000;
  const monthShort = dayjs(miliseconds).format('MMM');
  const monthDay = dayjs(miliseconds).format('D');
  const weekDayShort = dayjs(miliseconds).format('ddd');

  return (
    <>
      <List.Item
        className={styles.ListItem}
        style={{
          backgroundColor: gratitude.color.value
        }}
      >
        <Row wrap={false} className={styles.ListItemRow}>
          <Col>
            <div className={styles.Date}>
              <small className={styles.SmallText}>{monthShort}</small>
              <div>{monthDay}</div>
              <small className={styles.SmallText}>{weekDayShort}</small>
            </div>
          </Col>
          <Col flex={1}>
            <Title level={5} className={styles.Title}>
              {gratitude.title}
            </Title>
            {gratitude.imageURLs.length ? <ImagePreview srcs={gratitude.imageURLs} /> : null}
            <Paragraph className={styles.Description}>{gratitude.description}</Paragraph>
            <Row gutter={10}>
              {gratitude.tags.map((tag) => (
                <Col key={tag} className={styles.TagContainer}>
                  <small>#{tag}</small>
                </Col>
              ))}
            </Row>
          </Col>
          <Col>
            <div className={styles.VisibilityIconContainer}>
              <Tooltip
                placement="left"
                title={intl.formatMessage({
                  id: `common.visibility.${gratitude.isPublic ? Visibility.public : Visibility.private}`
                })}
              >
                <FontAwesomeIcon className={styles.HabitIcon} icon={gratitude.isPublic ? faGlobe : faLock} />
              </Tooltip>
            </div>
          </Col>

          {gratitude.createdByUid === userProfile.uid ? (
            <Col className={styles.DropDownCol}>
              <Dropdown menuItems={menuItems} className={styles.Dropdown}>
                {dropdownButton}
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
