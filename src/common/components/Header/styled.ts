import styled from 'styled-components';

export const StyledHeaderContainer = styled.div<{
  $smallMargin?: boolean;
  $justifyContent?: string;
  $flexWrap?: string;
}>`
  display: flex;
  flex-wrap: ${({ $flexWrap }) => $flexWrap || 'wrap-reverse'};
  gap: 20px;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'space-between'};
  margin-bottom: ${({ $smallMargin }) => ($smallMargin ? 8 : 20)}px;
`;

export const StyledHeaderFilterContainer = styled.div<{ $showFilters: boolean }>`
  display: ${({ $showFilters }) => ($showFilters ? 'block' : 'none')};
`;
