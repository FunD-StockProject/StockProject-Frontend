import { useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY_MAP } from '@ts/StockCountry';
import { diffToPercent, diffToValue } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
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

  const navigate = useNavigate();

  const handleClickAboutStock = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(webPath.search(), {
      state: {
        symbolName: stockName,
        country: country,
      },
    });
  };

  const priceText = STOCK_COUNTRY_MAP[country].currency + price.toLocaleString();
  const priceDiffText = `${diffToValue(priceDiff)}(${diffToPercent(price, priceDiff, {
    fixed: 2,
    sign: false,
  })})`;

  const scoreText = `${score}점`;
  const scoreDiffText = `${diffToValue(diff)}점`;

  return (
    <TinderCardItemContainer
      style={{
        ...transform,
        zIndex: zIndex,
      }}
    >
      <TinderCardChartContainer>
        <StockChart
          stockId={stockId}
          symbolName={stockName}
          country={country}
          chartHeight={{ price: 'calc(100% - 160px)', score: '160px' }}
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
