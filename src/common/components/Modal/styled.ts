import styled from 'styled-components';
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: ${({ theme }) => theme.antd.borderRadiusLG}px;
  }

  .ant-modal-header {
    border-top-left-radius: ${({ theme }) => theme.antd.borderRadiusLG}px;
    border-top-right-radius: ${({ theme }) => theme.antd.borderRadiusLG}px;

    .ant-modal-title {
      margin-right: 20px;
      font-size: 20px;
      text-align: center;
    }
  }
`;

export const StyledCloseIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  vertical-align: -6px;
`;
