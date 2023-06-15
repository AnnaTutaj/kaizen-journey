import { homeBaseTextSize, homeBlockMaxWidth } from '../styledHelper';
import styled from 'styled-components';

export const StyledKanjiContainer = styled.div<{ $imageUrl: string }>`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: min(90vw, ${homeBlockMaxWidth});
  height: 300px;
  color: ${({ theme }) => theme.antd.colorWhite};
  background-position: center;
  border-radius: ${({ theme }) => theme.layout.borderRadiusXL};
  background-image: url(${({ $imageUrl }) => $imageUrl});
`;

export const StyledKanjiDivContainer = styled.div`
  text-align: center;
`;

export const StyledKanji = styled.div`
  font-size: 100px;
  font-family: 'Ma Shan Zheng', cursive;
`;

export const StyledKanjiMeaning = styled.div`
  font-size: ${homeBaseTextSize};
  text-transform: lowercase;
`;

export const StyledKaizenMeaningContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  width: min(90vw, ${homeBlockMaxWidth});
  font-size: ${homeBaseTextSize};
`;
