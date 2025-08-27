import { useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY, STOCK_TYPE } from '@ts/Types';
import { scoreToImage, scoreToText } from '@utils/ScoreConvert';
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

const LargeStockCard = ({ stock: { symbolName, score }, country }: { stock: StockInfo; country: STOCK_COUNTRY }) => {
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

const SmallStockCard = ({
  stock: { symbolName, score, diff, keywords },
  country,
}: {
  stock: StockInfo;
  country: STOCK_COUNTRY;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(webPath.search(), { state: { symbolName: symbolName, country: country } });
  };

  const scoreImage = scoreToImage(score);

  const diffSign = diff > 0 ? '+' : diff < 0 ? '-' : '';
  const diffPercent = (Math.abs(score / (score - diff)) * 100).toFixed(1);

  return (
    <SmallStockCardContainer onClick={handleClick}>
      <img src={scoreImage} />
      <SmallStockCardContent>
        <SmallStockCardContentTitle>
          <p className="name">{symbolName}</p>
          <SmallStockCardContentScore delta={diff}>
            {score}점
            <span>
              {diffSign + Math.abs(diff)}점({diffSign + diffPercent}%)
            </span>
          </SmallStockCardContentScore>
        </SmallStockCardContentTitle>
        <SmallStockCardContentKeywords>{keywords?.map((e) => <p>#{e}</p>)}</SmallStockCardContentKeywords>
      </SmallStockCardContent>
    </SmallStockCardContainer>
  );
};

const StockCard = ({ type, country }: { type: STOCK_TYPE; country: STOCK_COUNTRY }) => {
  const [curStocks, suspend] = useQueryComponent({ query: useHomeStockFetchQuery(type, country) });

  if (suspend) return null;

  return (
    <StockCardContainer>
      {curStocks?.map((stock: StockInfo) =>
        type === 'HOT' ? (
          <LargeStockCard stock={stock} country={country} />
        ) : (
          <SmallStockCard stock={stock} country={country} />
        ),
      )}
    </StockCardContainer>
  );
};

export default StockCard;
