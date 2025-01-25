import { useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY } from '@ts/Types';
import { deltaColor } from '@utils/Delta';
import { scoreToImage } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import { StockInfo } from '@controllers/api.Type';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  StockCardContainer,
  StockCardImage,
  StockCardKeywords,
  StockCardTitle,
  StockCardTitleContents,
  StockCardTitleName,
  StockCardTitleScore,
} from './StockCard.Style';

const DeltaIcon = ({ diff }: { diff: number }) => {
  if (diff === 0) return null;
  return diff > 0 ? <UpSVG /> : <DownSVG />;
};

const StockCard = ({ stockInfo, country }: { stockInfo: StockInfo; country: STOCK_COUNTRY }) => {
  const { symbolName, score, diff, keywords = [] } = stockInfo;
  const navigate = useNavigate();
  const scoreImage = scoreToImage(score);
  const handleClick = () => navigate(webPath.search(), { state: { symbolName, country } });

  return (
    <StockCardContainer onClick={handleClick}>
      <StockCardImage>
        <img src={scoreImage} />
      </StockCardImage>
      <StockCardTitle>
        <StockCardTitleContents>
          <StockCardTitleName>{symbolName}</StockCardTitleName>
          <StockCardTitleScore diffColor={deltaColor(diff)}>
            {score}점
            <span>
              {Math.abs(diff)}점 <DeltaIcon diff={diff} />
            </span>
          </StockCardTitleScore>
        </StockCardTitleContents>
        <StockCardKeywords>
          {keywords.map((keyword, index) => (
            <span key={`Relevant_Keywords_${symbolName}_${index}`}>{keyword}</span>
          ))}
        </StockCardKeywords>
      </StockCardTitle>
    </StockCardContainer>
  );
};

export default StockCard;
