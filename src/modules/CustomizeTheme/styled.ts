import { Space } from 'antd';
import { HexColorInput } from 'react-colorful';
import styled from 'styled-components';

export const StyledHexColorInput = styled(HexColorInput)`
  background-color: ${({ theme }) => theme.antd.colorBgContainer};
  border-color: ${({ theme }) => theme.antd.colorBorder};
  border-radius: ${({ theme }) => theme.antd.borderRadiusSM}px;
  height: ${({ theme }) => theme.antd.controlHeightSM}px;
  outline: ${({ theme }) => theme.antd.controlOutline};
  outline-width: ${({ theme }) => theme.antd.controlOutlineWidth}px;
  border-style: ${({ theme }) => theme.antd.lineType};
  border-width: ${({ theme }) => theme.antd.lineWidth}px;
  padding: ${({ theme }) => theme.antd.controlPaddingHorizontalSM}px;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.antd.colorPrimaryHover};
  }
`;

export const StyledTest = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.antd.colorPrimaryTextActive};
`;

export const StyledFormItemValue = styled.div`
  width: 100%;
  text-align: right;
`;

export const StyledColorContainer = styled(Space)`
  padding: 10px;
  background-color: ${({ theme }) => theme.antd.colorFillTertiary};
  border: 1px solid ${({ theme }) => theme.antd.colorBorder};
  border-radius: ${({ theme }) => theme.antd.borderRadiusSM}px;
  cursor: pointer;
`;

export const StyledColorBox = styled.div<{ $color: string }>`
  width: 48px;
  height: 32px;
  border-radius: ${({ theme }) => theme.antd.borderRadiusSM}px;
  background-color: ${({ $color }) => $color};
`;

export const StyledFormContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.antd.colorFillSecondary};
  border-radius: ${({ theme }) => theme.antd.borderRadiusLG}px;
`;
