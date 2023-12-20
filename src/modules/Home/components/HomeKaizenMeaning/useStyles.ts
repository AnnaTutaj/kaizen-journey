import { createStyles } from 'antd-style';
import { homeBaseTextSize, homeBlockMaxWidth } from '../styledHelper';

export default createStyles(({ css, token }, { imageUrl }: { imageUrl: string }) => ({
  kanjiContainer: css`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: min(90vw, ${homeBlockMaxWidth});
    height: 300px;
    color: ${token.colorWhite};
    background-position: center;
    border-radius: ${token.layout.borderRadiusXL};
    background-image: url(${imageUrl});
  `,
  kanjiDivContainer: css`
    text-align: center;
  `,
  kanji: css`
    font-size: 100px;
    font-family: 'Ma Shan Zheng', cursive;
  `,
  kanjiMeaning: css`
    font-size: ${homeBaseTextSize};
    text-transform: lowercase;
  `,
  kaizenMeaningContainer: css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    width: min(90vw, ${homeBlockMaxWidth});
    font-size: ${homeBaseTextSize};
  `
}));
