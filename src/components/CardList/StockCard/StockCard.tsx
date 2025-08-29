import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { STOCK_TYPE } from '@ts/Types';
import { diffToPercent, diffToValue, scoreToImage, scoreToText } from '@utils/ScoreConvert';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { webPath } from '@router/index';
import { StockInfo } from '@controllers/api.Type';
import { useHomeStockFetchQuery } from '@controllers/query';
import {
  LargeStockCardContainer,
  LargeStockCardContent,
  LargeStockCardContentTextContainer,
  LargeStockCardHeader,
  LargeStockCardHeaderImage,
  SmallStockCardContainer,
  SmallStockCardContent,
  SmallStockCardContentKeywords,
  SmallStockCardContentScore,
  SmallStockCardContentTitle,
  StockCardContainer,
} from './StockCard.Style';

export const LargeStockCard = ({
  stock: { symbolName, score },
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
        <LargeStockCardHeaderImage>
          <img src={''} />
        </LargeStockCardHeaderImage>
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
          <SmallStockCardContentScore delta={diff}>
            {score}점
            <span>
              {diffToValue(diff)}점({diffToPercent(score, diff, { fixed: 1 })})
            </span>
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
        {curStocks?.map((stock: StockInfo) =>
          type === 'HOT' ? (
            <LargeStockCard key={`LARGE_STOCK_CARD_${stock.stockId}`} stock={stock} country={country} />
          ) : (
            <SmallStockCard key={`SMALL_STOCK_CARD_${stock.stockId}`} stock={stock} country={country} />
          ),
        )}
      </StockCardContainer>
    )
  );
};

export default StockCard;
