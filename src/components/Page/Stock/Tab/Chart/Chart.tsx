import styled from '@emotion/styled';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { StockCountryKey } from '@ts/StockCountry';
import { formatMMDD } from '@utils/Date';
import { getDiffText, getPriceText } from '@utils/Number';
import { deltaToColor } from '@utils/ScoreConvert';
import StockChart from '@components/Search/StockChart/StockChart';
import { useStockChartQuery } from '@controllers/stocks/query';
import { StockDetailInfo } from '@controllers/stocks/types';
import { theme } from '@styles/themes';
import { StockItemContainer } from '../../Common.Style';
import StockItemTitle from '../../ItemTitle';

const ChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0px 20px',
});

const ChartTableContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',

  ['>button']: {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,
    backgroundColor: theme.colors.sub_gray11,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    padding: '10px 0',
    textAlign: 'center',
  },
});

const ChartTableGridContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',

  ['>p']: {
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',

    whiteSpace: 'nowrap',

    ['&.header-item']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
      marginBottom: '6px',
    },

    ['&.item']: {
      padding: '9px 0',
      ...theme.font.body14Bold,
      color: theme.colors.sub_white,

      ['&.date']: {
        ...theme.font.body14Medium,
      },
    },
  },

  ['>span.divider']: {
    gridColumn: '1 / -1',
    marginBottom: '6px',
    height: '1px',
    backgroundColor: theme.colors.sub_gray10,
  },
});

const ChartTableGridDeltaText = styled.span(
  ({ delta }: { delta: number }) => ({
    color: deltaToColor(delta) ?? theme.colors.sub_gray6,
  }),
  {
    ...theme.font.detail12Medium,
  },
);

type TableRow = {
  key: string;
  dateText: string;
  score: number | null;
  scoreDiff: number | null;
  price: number;
  priceDiffPerCent: number;
};

const MORE_VIEW_COUNT = 5;

const ChartTable = ({ stockId, country }: { stockId: number; country: StockCountryKey }) => {
  const [chartData] = useStockChartQuery(stockId, 'D');
  const [viewCount, setViewCount] = useState(MORE_VIEW_COUNT);

  const handleViewMore = useCallback(() => {
    setViewCount((prev) => prev + MORE_VIEW_COUNT);
  }, []);

  const tableData: TableRow[] = useMemo(() => {
    if (!chartData?.length) return [];

    const recent = chartData.slice(-viewCount).reverse();

    return recent.map((e: any, idx: number) => {
      const key = `CHART_TABLE_ITEM_${stockId}_${e.date instanceof Date ? e.date.getTime() : String(e.date)}_${idx}`;

      const dateObj: Date = e.date;
      const scoreValue = e.score?.value ?? null;
      const scoreDelta = e.score?.delta ?? null;

      return {
        key,
        dateText: formatMMDD(dateObj),
        price: e.price.close.value,
        priceDiffPerCent: e.price.close.delta * 100,
        score: scoreValue,
        scoreDiff: scoreDelta,
      };
    });
  }, [chartData, viewCount, stockId]);

  return (
    <ChartTableContainer>
      <ChartTableGridContainer>
        <p className="header-item">날짜</p>
        <p className="header-item">인간지표 점수</p>
        <p className="header-item">주식가격</p>

        {tableData.map((row, idx) => (
          <Fragment key={row.key}>
            {idx !== 0 && <span className="divider" />}

            <p className="item date">{row.dateText}</p>

            {row.score == null ? (
              <p className="item">-</p>
            ) : (
              <p className="item">
                {row.score}점
                <ChartTableGridDeltaText delta={row.scoreDiff ?? 0}>
                  ({getDiffText({ valueDiff: row.scoreDiff ?? 0 })}점)
                </ChartTableGridDeltaText>
              </p>
            )}

            <p className="item">
              {getPriceText(country, row.price)}
              <ChartTableGridDeltaText delta={row.priceDiffPerCent}>
                ({getDiffText({ percentDiff: row.priceDiffPerCent, option: { percentFixed: 0 } })})
              </ChartTableGridDeltaText>
            </p>
          </Fragment>
        ))}
      </ChartTableGridContainer>

      <button onClick={handleViewMore}>더보기 +</button>
    </ChartTableContainer>
  );
};

const StockChartPanel = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  return (
    <StockItemContainer>
      <StockItemTitle title="주식차트" country={stockInfo.country} />
      <ChartContainer>
        <StockChart stockId={stockInfo.stockId} symbolName={stockInfo.symbolName} country={stockInfo.country} />
        <ChartTable stockId={stockInfo.stockId} country={stockInfo.country} />
      </ChartContainer>
    </StockItemContainer>
  );
};

export default StockChartPanel;
