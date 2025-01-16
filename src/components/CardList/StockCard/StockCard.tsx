import { useNavigate } from 'react-router-dom';
import { scoreToImage } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  KeywordContainer,
  ScoreImage,
  StockCardItemContainer,
  StockCardItemDeltaScore,
  StockCardItemScore,
  StockCardItemText,
  StockCardItemTitle,
  StockCardKeyword,
} from './StockCard.Style';

const StockCardItem = ({
  name,
  score,
  delta,
  country,
  keywords,
}: {
  name: string;
  score: number;
  delta: number;
  country: string;
  keywords: string[];
}) => {
  const navigate = useNavigate();
  const scoreImage = scoreToImage(score);
  const deltaSVG = !delta ? ' -' : delta > 0 ? <UpSVG /> : <DownSVG />;

  const handleClick = () => {
    navigate(webPath.search(), { state: { symbolName: name, country: country } });
  };

  return (
    <StockCardItemContainer onClick={handleClick}>
      <StockCardItemTitle>
        <StockCardItemText>{name}</StockCardItemText>
        <StockCardItemScore>
          {score}점
          <StockCardItemDeltaScore delta={delta}>
            {Math.abs(delta)}점{deltaSVG}
          </StockCardItemDeltaScore>
        </StockCardItemScore>
        <KeywordContainer>
          {keywords.map((keyword, i) => (
            <StockCardKeyword key={`StockCardKeyword_${name}_${i}`}>{keyword}</StockCardKeyword>
          ))}
        </KeywordContainer>
      </StockCardItemTitle>
      <ScoreImage src={scoreImage} />
    </StockCardItemContainer>
  );
};

export default StockCardItem;
