import { Col, List, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import Dropdown from '@common/components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CategoryColorType } from '@common/containers/App/ColorPalette';

export const StyledListItem = styled(List.Item)<{ $backgroundColor: CategoryColorType }>`
  &&& {
    margin-bottom: 16px;
    padding: 10px 16px;
    color: ${({ theme }) => theme.antd.colorWhite};
    background-color: ${({ theme, $backgroundColor }) => theme.layout.colorsCategory[$backgroundColor]};
    border-radius: ${({ theme }) => theme.antd.borderRadiusLG}px;
  }
`;

export const StyledListItemRow = styled(Row)`
  width: 100%;
`;

export const StyledDate = styled.div`
  margin-right: 16px;
  text-align: center;
`;

export const StyledSmallText = styled.small`
  font-size: 10px;
  text-transform: uppercase;
`;

export const StyledTitle = styled(Title)`
  && {
    margin-top: 0;
    color: ${({ theme }) => theme.antd.colorWhite};
  }
`;

export const StyledDescriptionParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.antd.colorWhite};
  white-space: pre-line;
`;

export const StyledDropDownCol = styled(Col)`
  text-align: right;
`;

export const StyledDropdown = styled(Dropdown)`
  margin-left: 8px;
`;

export const StyledDropdownIconContainer = styled.div<{ $colorHover: CategoryColorType }>`
  padding: 5px 10px;
  color: ${({ theme }) => theme.antd.colorWhite};
  font-size: 18px;
  text-align: center;
  border-radius: ${({ theme }) => theme.antd.borderRadiusSM}px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $colorHover }) => theme.layout.colorsCategoryHover[$colorHover]};
  }
`;

export const StyledVisibilityIconContainer = styled.div`
  padding: 6px 0 5px 16px;
`;

export const StyledVisibilityIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.antd.colorWhite};
  font-size: 16px;
`;
