import styled from '@emotion/styled';
import { media, theme } from '../../styles/themes';

const SearchResultContainer = styled.div({
  background: theme.colors.primary100,
  width: '100%',
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
    gap: '32px',
    padding: '60px 0px',
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
  display: 'flex',
  padding: '16px',

  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  borderRadius: '10px',
  backgroundColor: theme.colors.grayscale100,

  margin: '0 32px',
  color: theme.colors.grayscale20,
  fontSize: '17px',
  fontWeight: '500',

  [media[0]]: {
    height: '25px',
    fontSize: '11px',
    padding: '12px',
    margin: '0 20px',
  },
});

const MockTradeButtonWrapper = styled.div({
  position: 'fixed',
  bottom: '100px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.colors.primary50,
  color: theme.colors.primary0,
  padding: '12px 24px',
  borderRadius: '12px',
  cursor: 'pointer',
  width: 'calc(100% - 80px)',
  textAlign: 'center',
});

export {
  SearchResultContainer,
  SearchResultContents,
  StockRelevantContainer,
  SearchResultInfo,
  MockTradeButtonWrapper,
};
