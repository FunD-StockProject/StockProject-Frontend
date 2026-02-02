import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { StockDetailInfo } from '@controllers/stocks/types';
import { theme } from '@styles/themes';
import StockChartPanel from './Chart/Chart';
import StockInfoPanel from './Info/Info';
import StockKeywordPanel from './Keyword/Keyword';
import StockZipyoPanel from './Zipyo/Zipyo';

const StockInfoTabContainer = styled.div({ display: 'flex', flexDirection: 'column', gap: '36px' });

const StockInfoTabHeader = styled.div<{ activeIndex: number; count: number }>(
  ({ activeIndex, count }) => ({
    ['::after']: { transform: `translateX(calc(${activeIndex} * 100%))`, width: `calc((100% - 40px) / ${count})` },
  }),
  {
    position: 'relative',
    display: 'flex',
    padding: '0 20px',
    borderBottom: `1px solid ${theme.colors.sub_gray10}`,

    ['::after']: {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '20px',
      height: '2px',
      backgroundColor: theme.colors.sub_gray4,
      transition: 'transform 0.1s ease-in-out',
    },
  },
);

const StockInfoTabLabel = styled.label({
  cursor: 'pointer',
  padding: '12px 0',
  marginTop: '-12px',
  position: 'relative',
  flex: 1,
  textAlign: 'center',

  ['input']: { display: 'none' },

  ['>p']: { ...theme.font.body16Semibold, color: theme.colors.sub_gray7, margin: '0', transition: 'color 0.2s' },

  ['&:hover >p']: { color: theme.colors.sub_gray2 },

  ['>input[type="radio"]:checked ~p']: { color: theme.colors.sub_gray1 },
});

type TabKey = 'HUMAN_INDEX' | 'STOCK_CHART' | 'KEYWORD' | 'COMPANY_INFO';

const STOCK_INFO_TABS: { key: TabKey; text: string; Panel: React.FC<{ stockInfo: StockDetailInfo }> }[] = [
  { key: 'HUMAN_INDEX', text: '인간지표', Panel: StockZipyoPanel },
  { key: 'STOCK_CHART', text: '주식차트', Panel: StockChartPanel },
  { key: 'KEYWORD', text: '키워드', Panel: StockKeywordPanel },
  { key: 'COMPANY_INFO', text: '종목정보', Panel: StockInfoPanel },
];

const StockInfoTab = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nextIndex = Number(e.target.dataset.index);
    if (Number.isNaN(nextIndex)) return;
    setActiveIndex(nextIndex);
  }, []);

  const ActiveTabPanel = STOCK_INFO_TABS[activeIndex].Panel;

  return (
    <StockInfoTabContainer>
      <StockInfoTabHeader activeIndex={activeIndex} count={STOCK_INFO_TABS.length}>
        {STOCK_INFO_TABS.map(({ key, text }, idx) => (
          <StockInfoTabLabel key={`SEARCH_TAB_${key}`}>
            <input type="radio" value={key} checked={activeIndex === idx} data-index={idx} onChange={handleTabChange} />
            <p>{text}</p>
          </StockInfoTabLabel>
        ))}
      </StockInfoTabHeader>
      <ActiveTabPanel stockInfo={stockInfo} />
    </StockInfoTabContainer>
  );
};

export default StockInfoTab;
