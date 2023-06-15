import styled, { css } from 'styled-components';
import Table from '@common/components/Table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'antd';

const streakColumnsMaxWidth = '400px';
const hoverIconSize = 12;
const hoverBiggerIconSize = hoverIconSize + 2;

export const CnDateCol = 'CnDateCol';
export const CnStreakCol = 'CnStreakCol';
export const CnNameCol = 'CnNameCol';

export const StyledHeader = styled.div`
  margin-bottom: 10px;
`;

export const StyledHabitTable = styled(Table)`
  &&&& {
    .${CnDateCol} {
      min-width: 55px;
      height: 60px;
      padding: 0;
    }

    .${CnStreakCol} {
      padding: 0;
    }

    .${CnNameCol} {
      max-width: 400px;
      padding: 16px 8px 16px 10px;
      @media (max-width: 768px) {
        max-width: 140px;
      }
    }

    .ant-table-cell-row-hover {
      background-color: ${({ theme }) => theme.layout.colorHeaderBgTertiary};
    }
    .ant-table-thead > tr > th {
      font-weight: 500;
    }
  }
` as typeof Table;

export const StyledDateInfoIcon = styled(FontAwesomeIcon)<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 22px;
`;

export const StyledDateHoverIcon = styled(FontAwesomeIcon)<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: ${hoverIconSize}px;
  display: none;
`;

export const StyledDateHoverText = styled.small<{ $color: string }>`
  display: none;
  color: ${({ $color }) => $color};
  text-transform: lowercase;
`;

export const StyledDateSelectContainer = styled.div<{
  $skipped: boolean;
  $borderColor: string;
  $backgroundColor: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  @media (hover: hover) {
    &:hover {
      ${({ $skipped }) =>
        $skipped &&
        css`
          ${StyledDateHoverIcon} {
            font-size: ${hoverBiggerIconSize}px;
          }
        `}

      background-color: unset;
      border: dashed 1px ${({ $borderColor }) => $borderColor};

      ${StyledDateInfoIcon} {
        display: none;
      }

      ${StyledDateHoverIcon},
      ${StyledDateHoverText} {
        display: block;
      }
    }
  }
`;

export const StyledDateHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 4px 0;
`;

export const StyledDate = styled.div<{ $isToday: boolean }>`
  text-align: center;

  ${({ $isToday }) =>
    $isToday &&
    css`
      margin: 0 10px;
      padding: 8px 34px;
      color: ${({ theme }) => theme.antd.colorWhite};
      background-color: ${({ theme }) => theme.antd.colorPrimary};
      border-radius: 50%;
      scroll-margin-right: ${streakColumnsMaxWidth};
    `}
`;

export const StyledSmallText = styled.small`
  font-size: 12px;
  text-transform: uppercase;
`;

export const StyledMonthDay = styled.div`
  font-size: 22px;
`;

export const StyledStreakValue = styled.div`
  padding: 0 10px;
`;

export const StyledStreakHeader = styled.div`
  margin-left: auto;
  padding: 10px 5px;
  text-align: center;
  text-transform: lowercase;
  text-orientation: mixed;
  writing-mode: vertical-rl;
`;

export const StyledHabitName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledDropdownCol = styled(Col)`
  padding-left: 8px;
  text-align: right;
`;

export const StyledDropdownIconContainer = styled.div`
  padding: 4px 8px;
  font-size: 15px;
  text-align: center;
  border-radius: ${({ theme }) => theme.antd.borderRadiusSM}px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.layout.colorHeaderBgSecondary};
  }
`;

export const StyledVisibilityIconContainer = styled.div`
  padding: 4px 0 4px 8px;
`;

export const StyledHabitIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.antd.colorTextTertiary};
  font-size: 13px;
`;

export const StyledSettingsIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.antd.colorTextTertiary};
`;

export const StyledPopoverTitle = styled.div`
  margin: 8px 0;
`;