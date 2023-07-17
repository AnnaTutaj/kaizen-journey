import styled, { css } from 'styled-components';
import Table from '@common/components/Table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'antd';
import { CategoryColorType } from '@common/containers/App/ColorPalette';

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
      padding: 16px 4px 16px 10px;
      @media (width <= 768px) {
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

export const StyledDateInfoIcon = styled(FontAwesomeIcon)<{ $color: CategoryColorType }>`
  color: ${({ theme, $color }) => theme.layout.colorsCategory[$color]};
  font-size: 22px;
`;

export const StyledDateHoverIcon = styled(FontAwesomeIcon)<{ $color: CategoryColorType }>`
  color: ${({ theme, $color }) => theme.layout.colorsCategoryHover[$color]};
  font-size: ${hoverIconSize}px;
  display: none;
`;

export const StyledDateHoverText = styled.small<{ $color: CategoryColorType }>`
  display: none;
  color: ${({ theme, $color }) => theme.layout.colorsCategoryHover[$color]};
  text-transform: lowercase;
`;

export const StyledDateSelectContainer = styled.div<{
  $skipped: boolean;
  $borderColor: CategoryColorType;
  $backgroundColor: CategoryColorType | 'unset';
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor === 'unset' ? 'unset' : theme.layout.colorsCategory[$backgroundColor]};

  &:hover {
    @media (hover: hover) and (pointer: fine) {
      ${({ $skipped }) =>
        $skipped &&
        css`
          ${StyledDateHoverIcon} {
            font-size: ${hoverBiggerIconSize}px;
          }
        `}
      background-color: unset;
      border: dashed 1px ${({ theme, $borderColor }) => theme.layout.colorsCategory[$borderColor]};

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
  text-align: right;
`;

const ClickableIconContainerStyle = css`
  text-align: center;
  border-radius: ${({ theme }) => theme.antd.borderRadiusSM}px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.layout.colorHeaderBgSecondary};
  }
`;
export const StyledSettingsIconContainer = styled.div`
  ${ClickableIconContainerStyle}
  padding: 4px 8px;
`;

export const StyledEllipsisIconContainer = styled.div`
  ${ClickableIconContainerStyle}
  margin-top: -2px;
  padding: 2px 8px;
`;

export const StyledHabitIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.antd.colorTextTertiary};
  font-size: 15px;
`;

export const StyledSettingsIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: ${({ theme }) => theme.antd.colorTextTertiary};
`;

export const StyledPopoverTitle = styled.div`
  margin: 8px 0;
`;

export const StyledTooltipDescription = styled.div`
  margin-top: 10px;
  white-space: pre-line;
`;
