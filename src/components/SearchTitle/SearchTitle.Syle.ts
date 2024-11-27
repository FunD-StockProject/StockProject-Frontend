import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const SearchTitleLayout = styled.div({
  background: theme.colors.grayscale100,
  width: '100%',
});

const SearchTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '60px 60px',
  height: '100%',
  gap: '24px',
  fontSize: '19px',
  color: theme.colors.grayscale30,
  [media[0]]: {
    padding: '30px 24px',
    gap: '12px',
    fontSize: '13px',
  },
});

const SearchTitleCountryButton = styled.div({
  background: theme.colors.grayscale70,
  padding: '12px 24px',
  width: 'fit-content',
  borderRadius: '64px',
  fontSize: '15px',
  color: theme.colors.primary0,
  [media[0]]: {
    fontSize: '11px',
    padding: '6px 16px',
  },
});

const SearchTitleContent = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const SearchTitleText = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: theme.colors.grayscale10,
  fontSize: '40px',
  fontWeight: '700',
  ['svg']: {
    fill: theme.colors.primary40,
  },
  [media[0]]: {
    fontSize: '21px',
    gap: '8px',
    ['svg']: {
      height: '21px',
      width: 'auto',
    },
  },
});

const SearchTitleButton = styled.div({
  padding: '12px 42px',
  borderRadius: '30px',
  background: theme.colors.primary50,
  fontSize: '19px',
  color: theme.colors.grayscale5,
  fontWeight: '700',
  [media[0]]: {
    padding: '6px 24px',
    fontSize: '13px',
  },
});

export {
  SearchTitleLayout,
  SearchTitleContainer,
  SearchTitleCountryButton,
  SearchTitleContent,
  SearchTitleText,
  SearchTitleButton,
};
