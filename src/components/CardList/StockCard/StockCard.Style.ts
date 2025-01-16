import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

export const StockCardContainer = styled.div({
  background: theme.colors.grayscale100,
  borderRadius: '12px',
  padding: '24px 32px',
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '32px',
  cursor: 'pointer',
  lineHeight: 1,

  [':hover']: {
    background: theme.colors.grayscale90,
  },

  [media[0]]: {
    padding: '12px',
    flexDirection: 'row',
    gap: '18px',
  },
});

export const StockCardTitle = styled.div({
  display: 'flex',
  overflow: 'hidden',
  width: '100%',
  flexDirection: 'column',
  color: theme.colors.primary0,
  gap: '12px',

  [media[0]]: {
    gap: '12px',
    justifyContent: 'space-between',
  },
});

export const StockCardTitleContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 0',
  gap: '18px',

  [media[0]]: {
    padding: '8px 0',
    gap: '12px',
  },
});

export const StockCardTitleName = styled.span({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  fontSize: '24px',
  fontWeight: '700',

  [media[0]]: {
    fontSize: '15px',
  },
});

export const StockCardTitleScore = styled.div(
  {
    display: 'flex',
    fontSize: '32px',
    fontWeight: '700',
    alignItems: 'center',
    gap: '8px',

    ['span']: {
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      ['svg']: {
        height: '0.5em',
        width: '0.5em',
      },
    },

    [media[0]]: {
      fontSize: '21px',
      ['span']: {
        fontSize: '15px',
      },
    },
  },
  ({ diffColor }: { diffColor: themeColor }) => ({
    ['span']: {
      color: theme.colors[diffColor],
      ['svg']: {
        fill: theme.colors[diffColor],
      },
    },
  }),
);

export const StockCardKeywords = styled.div({
  display: 'flex',
  gap: '8px',

  fontSize: '15px',

  ['span']: {
    background: theme.colors.grayscale90,
    padding: '4px 12px',
    borderRadius: '32px',
  },
  '::after': {
    content: '""',
    display: 'inline-block',
    height: '1em',
    padding: '4px 0',
  },

  [media[0]]: {
    fontSize: '13px',
    ['span']: {
      padding: '4px 8px',
    },
  },
});

export const StockCardImage = styled.div({
  height: '160px',
  display: 'flex',
  justifyContent: 'end',

  ['img']: {
    height: '100%',
    borderRadius: '12px',
  },

  [media[0]]: {
    justifyContent: 'start',
    height: '100px',
  },
});
