import { useRef } from 'react';
import React from 'react';
import StockChartGridLabel from './GridLabel';
import { ChartLabel, ChartLabelContainer } from './StockChart.Style';

const StockChartScoreLabel = ({ scoreGrid, pointerScore }: any) => {
  const scoreLabelRef = useRef<HTMLDivElement>(null);

  return (
    <ChartLabelContainer ref={scoreLabelRef}>
      <StockChartGridLabel name="score" gridItems={scoreGrid} baseText="100" />
      {pointerScore && (
        <ChartLabel type="FILL" y={pointerScore.pos.y}>
          {pointerScore.text}
        </ChartLabel>
      )}
    </ChartLabelContainer>
  );
};

export default React.memo(StockChartScoreLabel);
