import { Col, Row, Tooltip } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@common/util/firebase';
import { IGratitudeModel } from '@modules/Gratitude/models/GratitudeModel';
import { faEllipsisV, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import { DropdownMenuKey } from '@common/constants/DropdownMenuKey';
import { DropdownMenuItemProps } from '@common/components/Dropdown/Dropdown';
import { Visibility } from '@common/constants/Visibility';
import useConfirmModal from '@common/hooks/useConfirmModal';
import ImagePreview from '@common/components/ImagePreview';
import { useUserProfile } from '@common/contexts/UserProfile/UserProfileContext';
import { StyledEllipsisContainer } from '@common/styled';
import {
  StyledDate,
  StyledDescriptionParagraph,
  StyledDropDownCol,
  StyledDropdown,
  StyledDropdownIconContainer,
  StyledListItem,
  StyledListItemRow,
  StyledSmallText,
  StyledTitle,
  StyledVisibilityIcon,
  StyledVisibilityIconContainer
} from '@common/components/ListItem/styled';

interface IProps {
  gratitude: IGratitudeModel;
  removeGratitude?: (id: string) => void;
  updateGratitude?: (gratitude: IGratitudeModel) => void;
}

const GratitudeListItem: React.FC<IProps> = ({ gratitude, removeGratitude, updateGratitude }) => {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

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

  return (
    <>
      <StyledListItem $backgroundColor={gratitude.color}>
        <StyledListItemRow wrap={false}>
          <Col>
            <StyledDate>
              <StyledSmallText>{monthShort}</StyledSmallText>
              <div>{monthDay}</div>
              <StyledSmallText>{weekDayShort}</StyledSmallText>
            </StyledDate>
          </Col>
          <Col flex={1}>
            <StyledTitle level={5}>{gratitude.title}</StyledTitle>
            {gratitude.imageURLs.length ? <ImagePreview srcs={gratitude.imageURLs} /> : null}
            <StyledDescriptionParagraph>{gratitude.description}</StyledDescriptionParagraph>
            <Row gutter={10}>
              {gratitude.tags.map((tag) => (
                <StyledEllipsisContainer as={Col} key={tag}>
                  <small>#{tag}</small>
                </StyledEllipsisContainer>
              ))}
            </Row>
          </Col>
          <Col>
            <StyledVisibilityIconContainer>
              <Tooltip
                placement="left"
                title={intl.formatMessage({
                  id: `common.visibility.${gratitude.isPublic ? Visibility.public : Visibility.private}`
                })}
              >
                <StyledVisibilityIcon icon={gratitude.isPublic ? faGlobe : faLock} />
              </Tooltip>
            </StyledVisibilityIconContainer>
          </Col>

          {gratitude.createdByUid === userProfile.uid ? (
            <StyledDropDownCol>
              <StyledDropdown menuItems={menuItems}>
                <StyledDropdownIconContainer $colorHover={gratitude.color}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </StyledDropdownIconContainer>
              </StyledDropdown>
            </StyledDropDownCol>
          ) : null}
        </StyledListItemRow>
      </StyledListItem>
      {confirmModalContextHolder}
    </>
  );
};

export default GratitudeListItem;
