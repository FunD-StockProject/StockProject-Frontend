import React, { useMemo } from 'react';
import { ChartLabel } from './StockChart.Style';

export type GridItem = {
  pos: {
    x?: number;
    y?: number;
  };
  value: string | number;
  text: string;
  delta?: number;
};

const StockChartGridLabel = React.memo(
  ({ name, gridItems, baseText }: { name: string; gridItems: GridItem[]; baseText: string }) => {
    const labels = useMemo(
      () =>
        gridItems.map((e) => (
          <ChartLabel key={`CHART_GRID_LABEL_${name}_${e.value}`} y={e.pos.y} x={e.pos.x}>
            {e.text}
          </ChartLabel>
        )),
      [gridItems],
    );

    return (
      <>
        <ChartLabel type="MOCK">{baseText}</ChartLabel>
        {labels}
      </>
    );
  },
);

export default StockChartGridLabel;
