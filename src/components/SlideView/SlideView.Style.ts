import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

export const SlideContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const SlideItemContainer = styled.div({
  width: '100%',
  boxSizing: 'border-box',
  padding: '0px 24px',
  scrollBehavior: 'auto',
  overflowX: 'scroll',
  overflowY: 'hidden',
  scrollSnapType: 'x mandatory',
  msOverflowStyle: 'none',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },
  [media[0]]: {
    padding: '0px 16px',
  },
});

export const SlideItemContents = styled.div(
  {
    width: '100%',
    position: 'relative',
    ['>div:last-child:after']: {
      content: '""',
      display: 'block',
      position: 'absolute',
      right: '-100%',
      width: '20px',
      height: '20px',
    },
  },
  ({ height }: { height: number }) => ({ height }),
);

export const SlideItem = styled.div(
  {
    scrollSnapAlign: 'center',
    position: 'absolute',
    top: 0,
    transition: 'left .5s',
    padding: '0 8px',
    boxSizing: 'border-box',
    minHeight: '10px',
    [media[0]]: {
      padding: '0px 4px',
    },
  },
  ({ idx, count }: { idx: number; count: number }) => ({
    width: `calc(100%/${count})`,
    left: `calc((100%*${idx / count}))`,
  }),
);

export const SlideArrowContainer = styled.div(
  {
    position: 'relative',
    width: '100%',
  },
  ({ visible }: { visible: boolean }) => ({
    display: visible ? 'block' : 'none',
  }),
);

export const SlideArrowContents = styled.div(
  {
    position: 'absolute',
    top: '18px',
    right: '0',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    fontSize: '19px',
    color: theme.colors.grayscale60,
    gap: '4px',
    ['svg']: {
      height: '1.5em',
      cursor: 'pointer',
      fill: theme.colors.primary0,
    },
  },
  ({ idx, length }: { idx: number; length: number }) => ({
    ['svg']: {
      [':first-of-type']: {
        fill: theme.colors[!idx ? 'grayscale60' : 'primary0'],
      },
      [':last-of-type']: {
        fill: theme.colors[idx == length ? 'grayscale60' : 'primary0'],
      },
    },
  }),
);
