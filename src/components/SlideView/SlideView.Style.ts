import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

export const SlideContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const SlideItemContainer = styled.div({
  overflowX: 'scroll',
  overflowY: 'hidden',
  boxSizing: 'border-box',
  width: '100%',
  // padding: '0px 24px',

  msOverflowStyle: 'none',
  scrollBehavior: 'auto',
  scrollSnapType: 'x mandatory',
  WebkitOverflowScrolling: 'touch',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  [media[0]]: {
    // padding: '0px 16px',
  },
});

export const SlideItemContents = styled.div(
  {
    position: 'relative',

    width: '100%',

    ['>div:last-child:after']: {
      position: 'absolute',
      right: '-100%',

      display: 'block',
      width: '20px',
      height: '20px',

      content: '""',
    },
  },
  ({ height }: { height: number }) => ({
    height,
  }),
);

export const SlideItem = styled.div(
  {
    position: 'absolute',
    top: 0,

    boxSizing: 'border-box',
    minHeight: '10px',
    padding: '0 8px',

    transition: 'left .5s',

    [media[0]]: {
      padding: '0px 4px',
    },
  },
  ({ idx, count }: { idx: number; count: number }) => ({
    left: `calc((100%*${idx / count}))`,

    width: `calc(100%/${count})`,

    scrollSnapAlign: idx % count == Math.floor(count / 2) ? 'center' : 'none',
  }),
);

export const SlideArrowContainer = styled.div(
  {
    position: 'relative',

    width: '100%',
    height: '10px',
  },
  ({ visible }: { visible: boolean }) => ({
    display: visible ? 'block' : 'none',
  }),
);

export const SlideArrowContents = styled.div(
  {
    position: 'absolute',
    top: '18px',
    right: '24px',

    display: 'flex',
    gap: '4px',
    alignItems: 'center',

    color: theme.colors.grayscale60,
    fontSize: '19px',
    lineHeight: '1',

    ['svg']: {
      height: '1.5em',

      fill: theme.colors.primary0,
    },
  },
  ({ idx, length }: { idx: number; length: number }) => ({
    ['svg']: {
      [':first-of-type']: {
        cursor: !idx ? 'not-allowed' : 'pointer',

        fill: theme.colors[!idx ? 'grayscale60' : 'primary0'],
      },

      [':last-of-type']: {
        cursor: idx == length - 1 ? 'not-allowed' : 'pointer',

        fill: theme.colors[idx == length - 1 ? 'grayscale60' : 'primary0'],
      },
    },
  }),
);
