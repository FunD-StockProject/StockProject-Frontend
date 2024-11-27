import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { FlexDiv } from '@components/Common/Common';
import { theme } from '@styles/themes';

const sample = [123];

const SearchResultChartContainer = styled.div({
  display: 'flex',
  margin: '0 48px',
  gap: '28px',
  height: '640px',
  background: theme.colors.grayscale90,
});

const StockChart = ({ stockId }: { stockId: number }) => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [stockChart, setStockChart] = useState<any>();

  const getStockChart = async (stockId: number) => {
    // const res = await Promise.resolve(fetchRelevant(stockId));
    // if (!res) return null;
    // setStockRelevantList(res);
    stockId;
    setStockChart(sample);
  };

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
    getStockChart(stockId);
  }, [didMount]);

  return stockChart ? (
    <FlexDiv flexDirection="column" width="100%">
      <FlexDiv flexDirection="column" gap="24px" width="100%">
        <SearchResultChartContainer
          style={{
            margin: 0,
            display: 'flex',
          }}
        />
      </FlexDiv>
    </FlexDiv>
  ) : (
    ''
  );
};

export default StockChart;
