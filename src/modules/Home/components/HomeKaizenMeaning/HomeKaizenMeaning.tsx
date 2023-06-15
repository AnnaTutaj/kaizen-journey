import React from 'react';
import { useIntl } from 'react-intl';
import fuji from '@assets/fuji.jpg';
import HomeSectionWrapper from '../HomeSectionWrapper/HomeSectionWrapper';
import Button from '@common/components/Button/Button';
import {
  StyledKaizenMeaningContainer,
  StyledKanji,
  StyledKanjiContainer,
  StyledKanjiDivContainer,
  StyledKanjiMeaning
} from './styled';
import { StyledHomeContainerTwoSections } from '../styled';

interface IProps {
  onClick: () => void;
}

const HomeFeature: React.FC<IProps> = ({ onClick }) => {
  const intl = useIntl();

  return (
    <HomeSectionWrapper coloredBg={false} title={intl.formatMessage({ id: 'home.kaizenMeaning.title' })}>
      <StyledHomeContainerTwoSections>
        <StyledKaizenMeaningContainer>
          <div>{intl.formatMessage({ id: 'home.kaizenMeaning' })}</div>
          <div>{intl.formatMessage({ id: 'home.kaizenMeaning.description' })}</div>
          <div>
            <Button
              type="primary"
              onClick={onClick}
              text={intl.formatMessage({ id: 'home.kaizenMeaning.takeFirstStep.button' })}
            />
          </div>
        </StyledKaizenMeaningContainer>
        <StyledKanjiContainer $imageUrl={fuji}>
          <StyledKanjiDivContainer>
            <StyledKanji>改</StyledKanji>
            <StyledKanjiMeaning>Kai = {intl.formatMessage({ id: 'home.change' })}</StyledKanjiMeaning>
          </StyledKanjiDivContainer>
          <StyledKanjiDivContainer>
            <StyledKanji>善</StyledKanji>
            <StyledKanjiMeaning>Zen = {intl.formatMessage({ id: 'home.forTheBetter' })}</StyledKanjiMeaning>
          </StyledKanjiDivContainer>
        </StyledKanjiContainer>
      </StyledHomeContainerTwoSections>
    </HomeSectionWrapper>
  );
};

export default HomeFeature;
