import styled from 'styled-components';
import { Empty } from 'antd';
import { StyledHeaderText } from '../HeaderText/styled';

export const StyledEmpty = styled(Empty)`
  .ant-empty-image {
    height: max-content;
  }
`;

export const StyledEmptyImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: cover;

  @media (width <= 1600px) {
    max-height: 350px;
  }
`;

export const StyledEmptyHeaderText = styled(StyledHeaderText)`
  display: block;
  margin-bottom: 20px;
`