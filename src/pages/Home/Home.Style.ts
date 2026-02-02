import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const HomeContainer = styled.div({
  width: '100%',
  marginBottom: 'auto',
  background: theme.colors.primary100,
});

const HomeTabMenuContainer = styled.div({
  position: 'relative',
  display: 'flex',
  gap: '4px',
  padding: '20px 20px 0px',

  ['>span.underline']: {
    position: 'absolute',
    bottom: '0',
    width: '92px',
    height: '2px',
    background: theme.colors.sub_white,
    transform: 'translateX(0)',
    transition: 'transform 0.1s ease-in-out',
  },

  ['&:has(> label:last-of-type > input:checked) > span.underline']: {
    transform: 'translateX(calc(100% + 4px))',
  },
});

const HomeTabMenuLabel = styled.label({
  width: '92px',
  paddingBottom: '8px',

  ['>input']: {
    display: 'none',
  },

  ['>p']: {
    ...theme.font.body18Semibold,
    color: theme.colors.sub_gray7,
    textAlign: 'center',
    margin: '0px',
    transition: 'color 0.1s ease-in-out',
  },

  ['>input[type="radio"]:checked']: {
    ['~p']: {
      color: theme.colors.sub_gray1,
    },
  },
});

const HomeContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  margin: '0 auto',
  padding: '90px 60px',

  [media[0]]: {
    gap: '32px',
    padding: '28px 0px 52px',
  },
});

export { HomeContainer, HomeTabMenuContainer, HomeTabMenuLabel, HomeContents };
