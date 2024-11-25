import styled from '@emotion/styled';
import theme from '../../styles/themes';

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
});

const StockRelevantContainer = styled.div({
  display: 'flex',
  margin: '0 48px',
  gap: '28px',
});

export { SearchResultContainer, SearchResultContents, StockRelevantContainer };
