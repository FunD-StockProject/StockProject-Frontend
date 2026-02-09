import React from 'react';
import { getDiffText } from '@utils/Number';
import { InfoHeader, InfoHeaderItemContainer, InfoHeaderItemValueText } from './StockChart.Style';
import { deltaToChartColor } from './StockChart.Style';

const formatVolume = (volume: number) => {
  const unit = [
    {
      type: 'B',
      num: 1e9,
    },
    {
      type: 'M',
      num: 1e6,
    },
    {
      type: 'K',
      num: 1e3,
    },
    {
      type: '',
      num: 1,
    },
  ];
  const a = unit.find(({ num }) => volume >= num);

  return a && (volume / a.num).toFixed(2) + a.type;
};

const StockChartScoreInfo = ({ pointerScoreInfo }: { pointerScoreInfo: any }) => {
  const { trading, score } = pointerScoreInfo ?? {};

  return (
    <InfoHeader>
      <InfoHeaderItemContainer>
        <p>거래량</p>
        {trading && (
          <InfoHeaderItemValueText color={deltaToChartColor(trading.delta)}>
            {trading.value === 0 ? '-' : formatVolume(trading.value)}
            {isFinite(trading.delta) && <b>({getDiffText({ percentDiff: trading.delta * 100 })})</b>}
          </InfoHeaderItemValueText>
        )}
        <p>/ 인간지표</p>
        {score && (
          <InfoHeaderItemValueText color={deltaToChartColor(trading.delta)}>
            {!score.value ? '-' : `${score.value}점`}
            {!!score.delta && <b>({getDiffText({ valueDiff: score.delta })}점)</b>}
          </InfoHeaderItemValueText>
        )}
      </InfoHeaderItemContainer>
    </InfoHeader>
  );
};

export default React.memo(StockChartScoreInfo);
