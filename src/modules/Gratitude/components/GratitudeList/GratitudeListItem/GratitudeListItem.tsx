import { Avatar, Col, Dropdown, Menu, Row, Space } from 'antd';
import React, { useState } from 'react';
import { List, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import styles from '@modules/Gratitude/components/GratitudeList/GratitudeListItem/GratitudeListItem.module.less';
import { faEllipsisV, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';

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
    backgroundColor: dropdownHover ? gratitude.colorLighten : 'unset'
  });

  const menu = (
    <Menu>
      <Menu.Item key={1} className={styles.DropdownMenuItem} onClick={() => handleUpdate()}>
        <Space size={16}>
          <FontAwesomeIcon icon={faPen} className={styles.DropdownMenuItemIcon} />
          {intl.formatMessage({ id: 'common.edit' })}
        </Space>
      </Menu.Item>
      <Menu.Item key={2} className={styles.DropdownMenuItem} onClick={() => handleDelete()}>
        <Space size={16}>
          <FontAwesomeIcon icon={faTrash} className={styles.DropdownMenuItemIcon} />
          {intl.formatMessage({ id: 'common.delete' })}
        </Space>
      </Menu.Item>
    </Menu>
  );

  const miliseconds = gratitude.date.seconds * 1000;
  const monthShort = moment(miliseconds).format('MMM');
  const monthDay = moment(miliseconds).format('D');
  const weekDayShort = moment(miliseconds).format('ddd');

  return (
    <List.Item
      className={styles.ListItem}
      style={{
        backgroundColor: gratitude.color
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
        </Col>
        {!hideManageOptions ? (
          <Col className={styles.DropDownCol}>
            <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']} className={styles.Dropdown}>
              <div
                className={styles.DropdownIconContainer}
                style={dropdownIconContainer()}
                onMouseEnter={() => setDropdownHover(true)}
                onMouseLeave={() => setDropdownHover(false)}
              >
                <FontAwesomeIcon icon={faEllipsisV} className={styles.DropdownIcon} />
              </div>
            </Dropdown>
          </Col>
        ) : null}
      </Row>
    </List.Item>
  );
};

export default GratitudeListItem;
