import styled from '@emotion/styled';
import { theme } from '../../styles/themes';

const SearchTitleContainer = styled.div({
  background: theme.colors.grayscale100,
  width: '100%',
});

const SearchTitleContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '60px 60px',
  height: '100%',
  gap: '32px',
});

export { SearchTitleContainer, SearchTitleContents };
