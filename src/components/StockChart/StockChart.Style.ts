import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

export const StockChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',

  [media[0]]: {
    gap: '12px',
  },
});

export const StockChartHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '17px',

  [media[0]]: {
    fontSize: '13px',
  },
});

export const StockChartHeaderContents = styled.div({
  display: 'flex',
  gap: '8px',
  [media[0]]: {
    gap: '4px',
  },
});

export const StockChartHeaderItem = styled.div(
  ({ background }: { background?: themeColor }) => ({
    background: background ? theme.colors[background] : theme.colors.transparent,
  }),
  {
    padding: '4px 8px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
);

export const StockChartStyledCanvas = styled.canvas({
  width: '100%',
  height: '100%',
  position: 'absolute',
});

export const StockChartGridContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: '42px auto 72px',
  gridTemplateRows: '600px 40px',
  fontSize: '15px',

  [media[0]]: {
    gridTemplateColumns: '28px auto 48px',
    gridTemplateRows: '400px 19px',
    fontSize: '11px',
  },

  '> div': {
    position: 'relative',
    overflow: 'hidden',
  },
});

export const ChartLabel = styled.span(
  {
    padding: '6px',
    lineHeight: '1',
    position: 'absolute',
    whiteSpace: 'nowrap',
    borderWidth: '2px',
    borderStyle: 'solid',
  },
  ({
    x,
    y,
    color,
    align,
    fillText,
    fillRect,
    strokeRect,
  }: {
    x?: number;
    y?: number;
    color?: themeColor;
    background?: themeColor;
    align?: 'left' | 'right';
    fillText?: true;
    fillRect?: true;
    strokeRect?: true;
  }) => ({
    top: y ?? '0px',
    left: typeof x == 'number' ? x : align == 'left' ? '0px' : 'auto',
    right: typeof x == 'number' ? 'auto' : align == 'right' ? '0px' : 'auto',
    width: typeof x == 'number' ? 'auto' : '100%',
    boxSizing: 'border-box',
    textAlign: align ?? 'left',
    transform:
      'translate(' + (typeof x == 'number' ? '-50%' : '0') + ', ' + (typeof y == 'number' ? '-50%' : '0') + ')',

    background: theme.colors[strokeRect ? 'primary100' : ((fillRect && color) ?? 'transparent')],
    color: theme.colors[(fillText && color) ?? 'primary0'],
    borderColor: theme.colors[(strokeRect && color) ?? 'transparent'],
  }),
);

export const ExtremeLabel = styled.span(
  {
    position: 'absolute',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
  },
  ({ x, y, delta }: { x: number; y: number; delta?: boolean }) => ({
    left: x,
    top: y,
    flexDirection: delta ? 'column' : 'column-reverse',
    transform: `translate(-50%, ${delta ? -100 : 0}%)`,
    color: theme.colors[delta ? 'red' : 'blue'],

    svg: {
      fill: theme.colors[delta ? 'red' : 'blue'],
    },
  }),
);
