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

const signedNumber = (value: number) => {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return sign + Math.abs(value);
};

const StockCard = ({ stockInfo, country }: { stockInfo: StockInfo; country: STOCK_COUNTRY }) => {
  const navigate = useNavigate();
  const { symbolName, score, diff, keywords } = stockInfo;
  const deltaSVG = !diff ? ' -' : diff > 0 ? <UpSVG /> : <DownSVG />;
  const scoreImage = scoreToImage(score);

  const handleClick = () => {
    navigate(webPath.search(), { state: { symbolName: symbolName, country: country } });
  };

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
              {signedNumber(diff)}점{deltaSVG}
            </span>
          </StockCardTitleScore>
        </StockCardTitleContents>
        <StockCardKeywords>
          {keywords?.map((e, i) => <span key={`Relevant_Keywords_${symbolName}_${i}`}>{e}</span>)}
        </StockCardKeywords>
      </StockCardTitle>
    </StockCardContainer>
  );
};

export default StockCard;
