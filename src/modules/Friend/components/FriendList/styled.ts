import styled from 'styled-components';
import { List } from 'antd';

export const StyledList = styled(List)`
  .ant-list-header {
    padding-top: 0;
    border: none;
  }

  .ant-list-item {
    border: none;
  }
` as typeof List;
