import React from 'react';
import StockChartGridLabel, { GridItem } from './GridLabel';
import { ChartLabel, DateLabelContainer } from './StockChart.Style';

const StockChartDateLabel = ({ dateGrid, pointerDate }: { dateGrid: GridItem[]; pointerDate?: GridItem }) => {
  return (
    <DateLabelContainer>
      <StockChartGridLabel name="DATE" gridItems={dateGrid} baseText="9999-99-99" />
      {pointerDate && (
        <ChartLabel type="FILL" x={pointerDate.pos.x}>
          {pointerDate.value}
        </ChartLabel>
      )}
    </DateLabelContainer>
  );
};

export default React.memo(StockChartDateLabel);
