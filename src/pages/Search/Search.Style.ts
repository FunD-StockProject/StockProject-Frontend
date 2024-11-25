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
  padding: '60px',
  height: '100%',
  gap: '48px',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1280px',

  [media[0]]: {
    gap: '32px',
    padding: '30px',
  },
});

const StockRelevantContainer = styled.div({
  display: 'flex',
  margin: '0 18px',
  gap: '28px',

  [media[0]]: {
    gap: '14px',
    // padding: '30px 30px',
    margin: '0 8px',
  },
});

export { SearchResultContainer, SearchResultContents, StockRelevantContainer };
