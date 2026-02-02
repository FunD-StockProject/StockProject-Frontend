import React, { useEffect, useRef } from 'react';
import StockChartGridLabel from './GridLabel';
import { ChartLabel, ChartLabelContainer, deltaToChartColor } from './StockChart.Style';

const StockChartPriceLabel = ({
  priceGrid,
  recentPrice,
  lastPrice,
  chartMaxPrice,
  pointerPrice,
  handlePriceZoom,
}: any) => {
  const priceLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const priceLabel = priceLabelRef.current;
    if (!priceLabel) return;

    priceLabel.addEventListener('wheel', handlePriceZoom, { passive: false });

    return () => {
      priceLabel.removeEventListener('wheel', handlePriceZoom);
    };
  }, [handlePriceZoom]);

  return (
    <ChartLabelContainer ref={priceLabelRef}>
      <StockChartGridLabel name="PRICE" gridItems={priceGrid} baseText={chartMaxPrice.toLocaleString()} />
      {lastPrice && (
        <ChartLabel type="STROKE" y={lastPrice.pos.y!} color={deltaToChartColor(lastPrice.delta)}>
          {lastPrice.text}
        </ChartLabel>
      )}
      {recentPrice && (
        <ChartLabel type="FILL" y={recentPrice.pos.y!} color={deltaToChartColor(recentPrice.delta)}>
          {recentPrice.text}
        </ChartLabel>
      )}
      {pointerPrice && (
        <ChartLabel type="FILL" y={pointerPrice.pos.y}>
          {pointerPrice.text}
        </ChartLabel>
      )}
    </ChartLabelContainer>
  );
};

export default React.memo(StockChartPriceLabel);
