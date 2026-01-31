import React, { useState } from 'react';
import { PERIOD_CODE_TEXT } from '@ts/Constants';
import { StockCountryKey } from '@ts/StockCountry';
import { PERIOD_CODE } from '@ts/Types';
import { useStockChartQuery } from '@controllers/stocks/query';
import StockChartView from './ChartView';
import { ChartContainer, ChartHeader, ChartHeaderContents, ChartHeaderItem } from './StockChart.Style';

const StockChart = ({
  stockId,
  symbolName,
  country,
  chartHeight,
  chartInteractive,
}: {
  stockId: number;
  symbolName: string;
  country: StockCountryKey;
  chartHeight?: { price: string; score: string };
  chartInteractive?: boolean;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PERIOD_CODE>('D');

  const [chartData, updateChartData] = useStockChartQuery(stockId, selectedPeriod);

  const handlePeriodClick = (period: PERIOD_CODE) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPeriod(period);
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartHeaderItem>{symbolName}</ChartHeaderItem>
        <ChartHeaderContents>
          {(Object.entries(PERIOD_CODE_TEXT) as [PERIOD_CODE, string][]).map(([key, value], i) => (
            <ChartHeaderItem
              key={i}
              background={key == selectedPeriod ? 'grayscale90' : 'transparent'}
              onPointerDown={handlePeriodClick(key)}
            >
              {value}
            </ChartHeaderItem>
          ))}
        </ChartHeaderContents>
      </ChartHeader>
      <StockChartView
        chartData={chartData}
        updateChart={updateChartData}
        period={selectedPeriod}
        country={country}
        chartInteractive={chartInteractive}
        chartHeight={chartHeight}
      />
    </ChartContainer>
  );
};

export default StockChart;
