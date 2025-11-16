import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STOCK_COUNTRY_MAP } from '@ts/StockCountry';
import { diffToPercent, diffToValue } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import StockChart from '@components/Search/StockChart/StockChart';
import ArrowDropUpSVG from '@assets/icons/arrowDropUp.svg?react';
import MagnifierSVG from '@assets/icons/magnifier.svg?react';
import { StockCardShortview } from '../ShortView';
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

export interface TinderCardProps {
  handleClickNeverSeen: () => void;
  handleClickPurchase: () => void;
}
const TinderCardItem = forwardRef<
  TinderCardProps,
  { stock: StockCardShortview; isTop: boolean; neverseenAction?: () => void; purchaseAction?: () => void }
>(
  (
    {
      stock: { stockId, stockName, country, price, priceDiff, score, diff, keywords },
      isTop,
      neverseenAction,
      purchaseAction,
    },
    ref,
  ) => {
    const navigate = useNavigate();

    const [drag, setDrag] = useState<{
      x: number;
      startX: number;
      active: boolean;
      direction: 'right' | 'left' | 'none';
    }>({
      x: 0,
      startX: 0,
      active: false,
      direction: 'none',
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const aboutStockRef = useRef<HTMLDivElement>(null);

    const priceText = STOCK_COUNTRY_MAP[country].currency + price.toLocaleString();
    const priceDiffText = `${diffToValue(priceDiff)}(${diffToPercent(price, priceDiff, {
      fixed: 2,
      sign: false,
    })})`;

    const scoreText = `${score}점`;
    const scoreDiffText = `${diffToValue(diff)}점`;

    const width = containerRef.current?.clientWidth ?? 0;

    const cardX = drag.direction == 'right' ? width * 2 : drag.direction == 'left' ? -width * 2 : drag.x;
    const cardRotate =
      ((drag.direction === 'right' ? width * 2 : drag.direction === 'left' ? -width * 2 : drag.x) * 30) / width;
    const cardScale = drag.active ? '1.05' : '1';

    useImperativeHandle(ref, () => ({
      handleClickNeverSeen,
      handleClickPurchase,
    }));

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

    const handleClickNeverSeen = () => {
      setDrag({
        startX: 0,
        x: 0,
        active: false,
        direction: 'left',
      });

      setTimeout(() => {
        neverseenAction?.();
        setDrag((prev) => ({
          ...prev,
          direction: 'none',
        }));
      }, 100);
    };

    const handleClickPurchase = () => {
      console.log('purchase');
      setDrag({
        startX: 0,
        x: 0,
        active: false,
        direction: 'right',
      });

      setTimeout(() => {
        purchaseAction?.();
        setDrag((prev) => ({
          ...prev,
          direction: 'none',
        }));
      }, 100);
    };

    const onPointerDown = (e: React.PointerEvent) => {
      if (aboutStockRef.current?.contains(e.target as Node)) return;

      setDrag({
        startX: e.clientX,
        x: 0,
        active: true,
        direction: 'none',
      });
    };

    const onTouchMove = (e: React.TouchEvent) => {
      if (!drag.active) return;
      setDrag((prev) => ({
        ...prev,
        x: e.touches[0].clientX - drag.startX,
        active: true,
      }));
    };

    const onTouchEnd = () => {
      const direction = drag.x > width / 2 ? 'right' : drag.x < -width / 2 ? 'left' : 'none';

      if (direction === 'left') {
        handleClickNeverSeen();
        return;
      } else if (direction === 'right') {
        handleClickPurchase();
        return;
      }

      setDrag({
        startX: 0,
        x: 0,
        active: false,
        direction: direction,
      });
    };

    return (
      <TinderCardItemContainer
        isTop={isTop}
        ref={containerRef}
        onPointerDown={onPointerDown}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        cardX={cardX}
        cardRotate={cardRotate}
        cardScale={cardScale}
        active={drag.active}
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
              <TinderCardItemInfoAboutButton ref={aboutStockRef} onClick={handleClickAboutStock}>
                <MagnifierSVG />
              </TinderCardItemInfoAboutButton>
            </TinderCardItemInfoExtraContainer>
          </TinderCardItemInfoContents>
        </TinderCardItemInfo>
      </TinderCardItemContainer>
    );
  },
);

export default TinderCardItem;
