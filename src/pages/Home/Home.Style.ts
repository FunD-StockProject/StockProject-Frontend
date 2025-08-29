import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const HomeContainer = styled.div({
  width: '100%',
  marginBottom: 'auto',
  background: theme.colors.primary100,
});

// header

const HomeHeaderContainer = styled.div({
  display: 'flex',
  padding: '8px 20px',
  width: '100%',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  alignItems: 'center',

  ['>svg']: {
    width: '100px',
    height: 'auto',
    fill: theme.colors.sub_white,
  },
});

const HomeHeaderButtonContainer = styled.div({
  display: 'flex',
  gap: '10px',

  ['>svg']: {
    width: '36px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: theme.colors.sub_gray7,
  },
});

// tabMenu

const HomeTabMenuContainer = styled.div({
  display: 'flex',
  gap: '4px',
  padding: '24px 20px 0px',
});

const HomeTabMenuLabel = styled.label({
  width: '92px',

  ['>input']: {
    display: 'none',
  },

  ['>.tab_text']: {
    ...theme.font.body18Semibold,
    color: theme.colors.sub_gray7,
    margin: '0px',

    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    justifyContent: 'center',
    alignItems: 'center',

    ['::after']: {
      content: '""',
      display: 'block',
      width: '100%',
      height: '2px',
    },
  },

  ['> input[type="radio"]:checked']: {
    ['~.tab_text']: {
      color: theme.colors.sub_gray1,
      ['::after']: {
        background: theme.colors.sub_gray1,
      },
    },
  },
});

const HomeContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '1280px',
  height: '100%',
  margin: '0 auto',
  padding: '90px 60px',

  [media[0]]: {
    gap: '52px',
    padding: '28px 0px 52px',
  },
});

export {
  HomeContainer,
  HomeHeaderContainer,
  HomeHeaderButtonContainer,
  HomeTabMenuContainer,
  HomeTabMenuLabel,
  HomeContents,
};
