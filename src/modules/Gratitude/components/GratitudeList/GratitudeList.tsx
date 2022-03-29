import { Avatar, Button } from 'antd';
import React from 'react';
import { List, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';

const { Title } = Typography;

interface IProps {
  gratitudes: IGratitudeModel[];
  headerText: string;
  hideManageOptions?: boolean;
  removeGratitude?: (id: string) => void;
}

const GratitudeList: React.FC<IProps> = ({ gratitudes, headerText, hideManageOptions, removeGratitude }) => {
  const handleDelete = async (item: IGratitudeModel) => {
    if (removeGratitude) {
      await deleteDoc(doc(db, 'gratitude', item.id));
      removeGratitude(item.id);
    }
  };

  return (
    <List
      header={<Title level={5}>{headerText}</Title>}
      bordered
      dataSource={gratitudes}
      renderItem={(item) => {
        const date = moment(item.date.seconds * 1000).format('ll');

        return (
          <List.Item
            actions={
              !hideManageOptions
                ? [
                    <Button size="small" type="link" icon={<FontAwesomeIcon icon={faPen} />}></Button>,
                    <Button
                      size="small"
                      type="link"
                      danger
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      onClick={() => handleDelete(item)}
                    ></Button>
                  ]
                : []
            }
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} src={item?.createdByPictureURL} />}
              title={item.title}
              description={item.description}
            />
            <div>{date}</div>
          </List.Item>
        );
      }}
    />
  );
};

export default GratitudeList;
