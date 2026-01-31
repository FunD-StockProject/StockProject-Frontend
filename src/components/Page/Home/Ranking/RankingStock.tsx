import { diffToPercent, diffToValue } from '@utils/ScoreConvert';
import StockImage from '@components/Common/StockImage';
import { StockTableInfo } from '@controllers/stocks/types';
import { RankingStockContainer, RankingStockPrice, RankingStockScore, RankingStockSymbol } from './Ranking.Style';

const RankingStock = ({
  stock,
  handleClickStock,
  currencySymbol,
}: {
  stock: StockTableInfo;
  handleClickStock: (symbolName: string) => () => void;
  currencySymbol: string;
}) => {
  const priceText = `${currencySymbol}${stock.price.toLocaleString()}`;
  const priceDiffText = `${diffToValue(stock.priceDiff)}(${diffToPercent(stock.price, stock.priceDiff, {
    fixed: 2,
    sign: false,
  })})`;

  const scoreText = `${stock.score}점`;
  const scoreDiffText = `(${diffToValue(stock.scoreDiff)}점)`;

  return (
    <RankingStockContainer onClick={handleClickStock(stock.symbolName)}>
      <RankingStockSymbol>
        <StockImage stockId={stock.stockId} alt={stock.symbolName} />
        <p>{stock.symbolName}</p>
      </RankingStockSymbol>
      <RankingStockPrice delta={stock.priceDiff}>
        <p className="price">{priceText}</p>
        <p className="diff">{priceDiffText}</p>
      </RankingStockPrice>
      <RankingStockScore delta={stock.scoreDiff}>
        <p className="score">{scoreText}</p>
        <p className="diff">{scoreDiffText}</p>
      </RankingStockScore>
    </RankingStockContainer>
  );
};

export default RankingStock;
