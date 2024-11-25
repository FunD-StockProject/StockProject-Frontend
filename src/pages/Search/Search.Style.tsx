import styled from '@emotion/styled';
import { media, theme } from '../../styles/themes';

const SearchResultContainer = styled.div({
  background: theme.colors.primary100,
  width: '100%',
});

const SearchResultContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '60px 60px',
  height: '100%',
  gap: '48px',
  [media[0]]: {
    padding: '30px 30px',
    gap: '32px',
  },
});

const StockRelevantContainer = styled.div({
  display: 'flex',
  margin: '0 18px',
  gap: '28px',
  [media[0]]: {
    // padding: '30px 30px',
    margin: '0 8px',
    gap: '14px',
  },
});

export { SearchResultContainer, SearchResultContents, StockRelevantContainer };
