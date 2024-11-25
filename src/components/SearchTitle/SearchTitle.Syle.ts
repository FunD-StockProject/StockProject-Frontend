import styled from '@emotion/styled';
import { media, theme } from '../../styles/themes';

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
  gap: '24px',
  [media[0]]: {
    padding: '30px 30px',
    gap: '18px',
  },
});

const SearchTitleButton = styled.div({
  padding: '16px 48px',
  borderRadius: '30px',
  border: 'none',
  background: theme.colors.primary50,
  [media[0]]: {
    padding: '12px 32px',
  },
});

export { SearchTitleContainer, SearchTitleContents, SearchTitleButton };
