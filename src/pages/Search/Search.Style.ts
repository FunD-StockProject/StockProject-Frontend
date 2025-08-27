import styled from '@emotion/styled';
import { media, theme } from '../../styles/themes';

const SearchResultContainer = styled.div({
  background: theme.colors.primary100,
  width: '100%',
  overflowX: 'hidden',
});

const SearchResultContents = styled.div({
  boxSizing: 'border-box',
  width: '100%',
  margin: '0 auto',
  padding: '120px 60px',
  height: '100%',
  gap: '60px',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1280px',

  [media[0]]: {
    padding: '20px 20px',
    gap: '32px',
    boxSizing: 'border-box',
  },
});

const StockRelevantContainer = styled.div({
  display: 'flex',
  gap: '28px',

  [media[0]]: {
    gap: '14px',
  },
});

const SearchResultInfo = styled.div({
  ...theme.font.detail12Semibold,
  display: 'flex',
  padding: '16px',

  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  borderRadius: '10px',
  backgroundColor: theme.colors.sub_gray11,
  color: theme.colors.sub_gray5,

});

const MockTradeButtonWrapper = styled.button({
  ...theme.font.body18Semibold,
  backgroundColor: theme.colors.primary50,
  color: theme.colors.sub_white,
  padding: '12px 24px',
  borderRadius: '12px',
  cursor: 'pointer',
  width: 'calc(100%- 40px)',
  textAlign: 'center',
});

export const Divider = styled.div({
  backgroundColor: theme.colors.sub_gray11,
  height: '4px',
  width: '100vw',
  marginLeft: '-10px',
  marginRight: '-10px',
});

export {
  SearchResultContainer,
  SearchResultContents,
  StockRelevantContainer,
  SearchResultInfo,
  MockTradeButtonWrapper,
};
