import { STOCK_COUNTRY_MAP } from '@ts/StockCountry';
import { diffToPercent, diffToValue } from '@utils/ScoreConvert';
import useRouter from '@router/useRouter';
import StockImage from '@components/Common/StockImage';
import StockChart from '@components/Search/StockChart/StockChart';
import { ShortViewItem } from '@controllers/shortview/api';
import ArrowDropUpSVG from '@assets/icons/arrowDropUp.svg?react';
import MagnifierSVG from '@assets/icons/magnifier.svg?react';
import {
  TinderCardChartContainer,
  TinderCardItemContainer,
  TinderCardItemInfo,
  TinderCardItemInfoAboutButton,
  TinderCardItemInfoContents,
  TinderCardItemInfoExtraContainer,
  TinderCardItemInfoTag,
  TinderCardItemInfoTagsContainer,
  TinderCardItemInfoTitle,
  TinderCardItemInfoValueContainer,
  TinderCardItemInfoValueContents,
} from './TinderCard.Style';

const TinderCard = ({
  stock,
  transform,
  zIndex,
}: {
  stock: ShortViewItem;
  transform: { transform?: string; scale?: string; opacity?: string; transition?: string };
  zIndex: number;
}) => {
  const { stockId, stockName, country, price, priceDiff, score, diff, keywords } = stock;

  const { navToStock } = useRouter();

  const handleClickAboutStock = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navToStock(stockName, country);
  };

  const priceText = STOCK_COUNTRY_MAP[country].currency + price.toLocaleString();
  const priceDiffText = `${diffToValue(priceDiff)}(${diffToPercent(price, priceDiff, { fixed: 2, sign: false })})`;

  const scoreText = `${score}점`;
  const scoreDiffText = `${diffToValue(diff)}점`;

  console.log(transform);

  return (
    <TinderCardItemContainer zIndex={zIndex} style={{ ...transform }}>
      <TinderCardChartContainer>
        <StockChart
          stockId={stockId}
          symbolName={stockName}
          country={country}
          chartHeight={{ price: '1fr', score: '160px' }}
          chartInteractive={false}
        />
      </TinderCardChartContainer>
      <TinderCardItemInfo>
        <TinderCardItemInfoTitle>
          <StockImage stockId={stockId} alt={stockName} />
          <p>{stockName}</p>
        </TinderCardItemInfoTitle>
        <TinderCardItemInfoContents>
          <TinderCardItemInfoValueContainer>
            <TinderCardItemInfoValueContents delta={priceDiff}>
              {priceText}
              <span>{priceDiffText}</span>
            </TinderCardItemInfoValueContents>
            <TinderCardItemInfoValueContents delta={diff}>
              {scoreText}
              <span>{scoreDiffText}</span>
              <ArrowDropUpSVG />
            </TinderCardItemInfoValueContents>
          </TinderCardItemInfoValueContainer>
          <TinderCardItemInfoExtraContainer>
            <TinderCardItemInfoTagsContainer>
              {keywords.map((e) => (
                <TinderCardItemInfoTag key={`SHORT-VIEW-ITEM-TAG-${e}`}>#{e}</TinderCardItemInfoTag>
              ))}
            </TinderCardItemInfoTagsContainer>
            <TinderCardItemInfoAboutButton onClick={handleClickAboutStock}>
              <MagnifierSVG />
            </TinderCardItemInfoAboutButton>
          </TinderCardItemInfoExtraContainer>
        </TinderCardItemInfoContents>
      </TinderCardItemInfo>
    </TinderCardItemContainer>
  );
};

export default TinderCard;
