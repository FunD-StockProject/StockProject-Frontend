import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { STOCK_TYPE } from '@ts/Types';
import { diffToValue, scoreToImage, scoreToText } from '@utils/ScoreConvert';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import { useHomeStockFetchQuery } from '@controllers/stocks/query';
import { StockInfo } from '@controllers/stocks/types';
import {
  LargeStockCardContainer,
  LargeStockCardContent,
  LargeStockCardContentTextContainer,
  LargeStockCardHeader,
  SmallStockCardContainer,
  SmallStockCardContent,
  SmallStockCardContentKeywords,
  SmallStockCardContentScore,
  SmallStockCardContentTitle,
  StockCardContainer,
  StockCardItem,
} from './StockCard.Style';

export const LargeStockCard = ({
  stock: { stockId, symbolName, score },
  country,
}: {
  stock: StockInfo;
  country: StockCountryKey;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(webPath.search(), { state: { symbolName: symbolName, country: country } });
  };

  const scoreImage = scoreToImage(score);
  const scoreText = scoreToText(score);

  return (
    <LargeStockCardContainer onClick={handleClick}>
      <LargeStockCardHeader>
        <StockImage stockId={stockId} alt={symbolName} />
        <p>{symbolName}</p>
      </LargeStockCardHeader>
      <hr />
      <LargeStockCardContent>
        <img src={scoreImage} />
        <LargeStockCardContentTextContainer>
          <div>
            <p className="title">민심 키워드</p>
            <p className="content">{scoreText}</p>
          </div>
          <div>
            <p className="title">민심 점수</p>
            <p className="content">{score}점</p>
          </div>
        </LargeStockCardContentTextContainer>
      </LargeStockCardContent>
    </LargeStockCardContainer>
  );
};

export const SmallStockCard = ({
  stock: { stockId, symbolName, score, diff, keywords },
  country,
}: {
  stock: StockInfo;
  country: StockCountryKey;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(webPath.search(), { state: { symbolName: symbolName, country: country } });
  };

  const scoreImage = scoreToImage(score);

  return (
    <SmallStockCardContainer onClick={handleClick}>
      <img src={scoreImage} />
      <SmallStockCardContent>
        <SmallStockCardContentTitle>
          <p className="name">{symbolName}</p>
          <SmallStockCardContentScore delta={diff} isNew={score == diff}>
            {score}점<span>{score != diff ? `${diffToValue(diff)}점` : 'NEW!'}</span>
          </SmallStockCardContentScore>
        </SmallStockCardContentTitle>
        <SmallStockCardContentKeywords>
          {keywords?.map((e) => <p key={`STOCK_${stockId}_KEYWORD_${e}`}>#{e}</p>)}
        </SmallStockCardContentKeywords>
      </SmallStockCardContent>
    </SmallStockCardContainer>
  );
};

const StockCard = ({ type, country }: { type: STOCK_TYPE; country: StockCountryKey }) => {
  const [curStocks, suspend] = useQueryComponent({ query: useHomeStockFetchQuery(type, country) });

  return (
    suspend || (
      <StockCardContainer>
        <div>
          {curStocks?.map((stock: StockInfo) => (
            <StockCardItem key={`STOCK_CARD_${type}_${stock.stockId}`}>
              {type === 'HOT' ? (
                <LargeStockCard stock={stock} country={country} />
              ) : (
                <SmallStockCard stock={stock} country={country} />
              )}
            </StockCardItem>
          ))}
        </div>
      </StockCardContainer>
    )
  );
};

export default StockCard;
