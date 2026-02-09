import React from 'react';
import { StockCountryKey } from '@ts/StockCountry';
import { getPriceText } from '@utils/Number';
import { getDiffText } from '@utils/Number';
import { SMA_PERIODS, SMA_STYLE } from './ChartView';
import { deltaToChartColor } from './StockChart.Style';
import {
  InfoHeader,
  InfoHeaderItemContainer,
  InfoHeaderItemContent,
  InfoHeaderItemValueText,
} from './StockChart.Style';

const CHART_PRICE_FIELDS = [
  {
    key: 'open',
    oldKey: 'openPrice',
    label: '시가',
  },
  {
    key: 'high',
    oldKey: 'highPrice',
    label: '고가',
  },
  {
    key: 'low',
    oldKey: 'lowPrice',
    label: '저가',
  },
  {
    key: 'close',
    oldKey: 'closePrice',
    label: '종가',
  },
];

const StockChartPriceInfo = ({
  pointerPriceInfo,
  country,
  isMobile,
}: {
  pointerPriceInfo: any;
  country: StockCountryKey;
  isMobile: boolean;
}) => {
  const { price, SMA } = pointerPriceInfo ?? {};
  const hasValue = price && SMA;

  return (
    <InfoHeader>
      {!isMobile && (
        <InfoHeaderItemContainer>
          {CHART_PRICE_FIELDS.map(({ key, label }) => (
            <InfoHeaderItemContent key={`CHART_PRICE_INFO_${key}`}>
              {label}
              {hasValue && (
                <InfoHeaderItemValueText color={deltaToChartColor(price[key].delta)}>
                  {getPriceText(country, price[key].value, { space: false })}
                  <b>{getDiffText({ percentDiff: price[key].delta * 100 })}</b>
                </InfoHeaderItemValueText>
              )}
            </InfoHeaderItemContent>
          ))}
        </InfoHeaderItemContainer>
      )}
      <InfoHeaderItemContainer>
        <p>이동평균선</p>
        {SMA_PERIODS.map((range) => (
          <InfoHeaderItemContent key={`CHART_MOVING_AVERAGE_INFO_${range}`} color={SMA_STYLE[range].color}>
            {range}
            {hasValue && (
              <InfoHeaderItemValueText color={deltaToChartColor(SMA[range].delta)}>
                {getPriceText(country, SMA[range].price, { space: false })}
              </InfoHeaderItemValueText>
            )}
          </InfoHeaderItemContent>
        ))}
      </InfoHeaderItemContainer>
    </InfoHeader>
  );
};

export default React.memo(StockChartPriceInfo);
