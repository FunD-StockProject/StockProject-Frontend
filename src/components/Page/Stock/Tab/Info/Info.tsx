import styled from '@emotion/styled';
import GuideBanner from '@components/Common/GuideBanner/GuideBanner';
import { useStockSummaryQuery } from '@controllers/stocks/query';
import { StockDetailInfo } from '@controllers/stocks/types';
import { theme } from '@styles/themes';
import { StockItemContainer } from '../../Common.Style';
import StockItemTitle from '../../ItemTitle';

const InfoContainer = styled.div({
  padding: '0px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const InfoTextGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minHeight: '160px',

  ['>p']: {
    margin: '0',
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray4,
    textIndent: '1em',
  },
});

const StockInfoPanel = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const { data: summary = [], isLoading } = useStockSummaryQuery(stockInfo.symbol, stockInfo.country);

  if (isLoading) return null;

  return (
    <StockItemContainer>
      <StockItemTitle title="종목정보" country={stockInfo.country} />
      <InfoContainer>
        <InfoTextGroup>
          {summary.map((text, index) => (
            <p key={`SUMMARY_${index}`}>{text}</p>
          ))}
        </InfoTextGroup>
        <GuideBanner />
      </InfoContainer>
    </StockItemContainer>
  );
};

export default StockInfoPanel;
