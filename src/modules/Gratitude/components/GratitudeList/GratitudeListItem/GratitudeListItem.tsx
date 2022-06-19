import { Avatar, Col, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { List, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import styles from '@modules/Gratitude/components/GratitudeList/GratitudeListItem/GratitudeListItem.module.less';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import Dropdown from '@common/components/Dropdown';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';

const { Title, Paragraph } = Typography;

interface IProps {
  gratitude: IGratitudeModel;
  hideManageOptions?: boolean;
  removeGratitude?: (id: string) => void;
  updateGratitude?: (gratitude: IGratitudeModel) => void;
}

const GratitudeListItem: React.FC<IProps> = ({ gratitude, hideManageOptions, removeGratitude, updateGratitude }) => {
  const intl = useIntl();

  const [dropdownHover, setDropdownHover] = useState<boolean>(false);

  const confirmDelete = async () => {
    Modal.confirm({
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

  const menuItems = [
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
  const monthShort = moment(miliseconds).format('MMM');
  const monthDay = moment(miliseconds).format('D');
  const weekDayShort = moment(miliseconds).format('ddd');

  return (
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
        {hideManageOptions ? (
          <Col>
            <Avatar
              icon={<UserOutlined />}
              size="large"
              src={gratitude?.createdByPictureURL}
              className={styles.Avatar}
            />
          </Col>
        ) : null}
        <Col flex={1}>
          <Title level={5} className={styles.Title}>
            {gratitude.title}
          </Title>
          <Paragraph className={styles.Description}>{gratitude.description}</Paragraph>
          <Row gutter={10}>
            {gratitude.tags.map((tag) => (
              <Col key={tag} className={styles.TagContainer}>
                <small>#{tag}</small>
              </Col>
            ))}
          </Row>
        </Col>
        {!hideManageOptions ? (
          <Col className={styles.DropDownCol}>
            <Dropdown menuItems={menuItems} className={styles.Dropdown}>
              {dropdownButton}
            </Dropdown>
          </Col>
        ) : null}
      </Row>
    </List.Item>
  );
};

export default GratitudeListItem;
