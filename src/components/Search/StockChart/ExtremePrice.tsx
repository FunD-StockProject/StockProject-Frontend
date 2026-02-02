import { useMemo } from 'react';
import React from 'react';
import { StockCountryKey } from '@ts/StockCountry';
import { getPriceText } from '@utils/Number';
import { getDiffText } from '@utils/Number';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import { ExtremePriceContainer, ExtremePriceLabel } from './StockChart.Style';

const EXTREME = {
  MAX: {
    label: '최대',
  },
  MIN: {
    label: '최소',
  },
};

type ExtremeKey = 'MAX' | 'MIN';
type Extreme = {
  key: ExtremeKey;
  price: number;
  pos: { x: number; y: number } | undefined;
  delta: number;
};

const StockChartExtremePrice = ({
  priceCanvasSize,
  chartItems,
  indexToX,
  priceToY,
  recentPrice,
  country,
}: {
  priceCanvasSize: any;
  chartItems: any[];
  indexToX: any;
  priceToY: any;
  recentPrice: any;
  country: StockCountryKey;
}) => {
  const extremePrice: Extreme[] = useMemo(() => {
    if (!chartItems?.length) return [];

    const width = priceCanvasSize.width;
    const recent = recentPrice.value;

    const MIN: Extreme = {
      key: 'MIN',
      price: Infinity,
      pos: undefined,
      delta: 0,
    };
    const MAX: Extreme = {
      key: 'MAX',
      price: -Infinity,
      pos: undefined,
      delta: 0,
    };

    for (const item of chartItems) {
      const x = indexToX(item.idx);
      if (x <= 0 || x >= width) continue;

      const low = item.price.low.value;
      const high = item.price.high.value;

      if (low < MIN.price) {
        MIN.price = low;
        MIN.pos = { x, y: priceToY(low) };
        MIN.delta = (recent / low - 1) * 100;
      }

      if (high > MAX.price) {
        MAX.price = high;
        MAX.pos = { x, y: priceToY(high) };
        MAX.delta = (recent / high - 1) * 100;
      }
    }

    const out: Extreme[] = [];
    if (MIN.pos) out.push(MIN);
    if (MAX.pos) out.push(MAX);
    return out;
  }, [chartItems, priceToY, recentPrice]);

  return (
    <ExtremePriceContainer>
      {extremePrice.map(({ pos, price, delta, key }) => {
        if (!pos) return null;
        return (
          <ExtremePriceLabel key={`EXTREME_PRICE_${key}`} x={pos.x} y={pos.y} type={key}>
            <p>
              {`${EXTREME[key].label} : ${getPriceText(country, price, { currencyText: true })} 
                (${getDiffText({ percentDiff: delta })})`}
            </p>

            {key == 'MAX' ? <DownSVG /> : <UpSVG />}
          </ExtremePriceLabel>
        );
      })}
    </ExtremePriceContainer>
  );
};

export default React.memo(StockChartExtremePrice);
