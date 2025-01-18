import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

export const StockChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',

  [media[0]]: {
    gap: '12px',
  },
});

export const StockChartHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

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
    overflow: 'hidden',
    padding: '4px 8px',

    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    borderRadius: '8px',
    cursor: 'pointer',
  },
);

export const StockChartStyledCanvas = styled.canvas({
  position: 'absolute',

  width: '100%',
  height: '100%',
});

export const StockChartGridContainer = styled.div({
  display: 'grid',
  gridTemplateRows: '600px 40px',
  gridTemplateColumns: '42px auto 72px',

  fontSize: '15px',

  [media[0]]: {
    gridTemplateRows: '400px 19px',
    gridTemplateColumns: '28px auto 48px',

    fontSize: '11px',
  },

  '> div': {
    position: 'relative',

    overflow: 'hidden',
  },

  [media[0]]: {
    gridTemplateRows: '400px 19px',
    gridTemplateColumns: '28px auto 48px',

    fontSize: '11px',
  },
});

export const ChartLabelBase = styled.span({
  boxSizing: 'border-box',
  padding: '4px 12px',

  color: 'transparent',
  lineHeight: 1,
  whiteSpace: 'nowrap',

  borderColor: 'transparent',
  borderStyle: 'solid',
  borderWidth: '2px',

  [media[0]]: {
    padding: '4px 8px',
  },
});

export const ChartLabel = styled.span(
  {
    position: 'absolute',

    boxSizing: 'border-box',
    padding: '4px 12px',

    lineHeight: 1,
    whiteSpace: 'nowrap',

    borderStyle: 'solid',
    borderWidth: '2px',

    [media[0]]: {
      padding: '4px 8px',
    },
  },
  ({
    x,
    y,
    color,
    fillText,
    fillRect,
    strokeRect,
  }: {
    x?: number;
    y?: number;
    color?: themeColor;
    background?: themeColor;
    fillText?: true;
    fillRect?: true;
    strokeRect?: true;
  }) => ({
    top: y ?? '0px',
    left: x ?? '0px',

    width: typeof x == 'number' ? 'auto' : '100%',

    color: theme.colors[(fillText && color) ?? 'primary0'],

    background: theme.colors[strokeRect ? 'primary100' : ((fillRect && color) ?? 'transparent')],
    borderColor: theme.colors[(strokeRect && color) ?? 'transparent'],
    transform:
      'translate(' + (typeof x == 'number' ? '-50%' : '0') + ', ' + (typeof y == 'number' ? '-50%' : '0') + ')',
  }),
);

export const ExtremeLabel = styled.span(
  {
    position: 'absolute',

    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    padding: '16px',

    lineHeight: '1',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  ({ x, y, delta }: { x: number; y: number; delta?: boolean }) => ({
    top: y,
    left: x,

    flexDirection: delta ? 'column' : 'column-reverse',

    color: theme.colors[delta ? 'red' : 'blue'],

    transform: `translate(-50%, ${delta ? -100 : 0}%)`,

    svg: {
      fill: theme.colors[delta ? 'red' : 'blue'],
    },
  }),
);

export const StockChartCanvasRefContainer = styled.canvas({
  position: 'absolute',
  top: 0,
  left: 0,

  width: '100%',
  height: '100%',
});

export const StockChartViewContainer = styled.div({
  display: 'flex',

  fontSize: '15px',

  [media[0]]: {
    fontSize: '11px',
  },
});

export const StockChartItemContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
  },
  ({ grow }: { grow?: true }) =>
    grow && {
      flexGrow: 1,

      borderRight: `2px solid ${theme.colors.grayscale90}`,
    },
);

export const StockChartItemContent = styled.div(
  {
    position: 'relative',

    overflow: 'hidden',

    userSelect: 'none',
  },
  ({ type }: { type?: 'price' | 'score' }) => ({
    height: !type ? 'auto' : type == 'price' ? '500px' : '200px',

    borderBottom: type ? `2px solid ${theme.colors.grayscale90}` : '',

    [media[0]]: {
      height: !type ? 'auto' : type == 'price' ? '300px' : '100px',
    },
  }),
);

export const StockChartItemCanvasContainer = styled.div({
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

export const StockInfoDeltaLabel = styled.span(({ delta }: { delta?: number }) => ({
  color: theme.colors[!delta ? 'grayscale60' : delta > 0 ? 'red' : 'blue'],
}));

export const StockChartInfoHeaderItem = styled.div({
  display: 'flex',
  gap: '4px',
  width: 'auto',

  background: '#00000088',

  userSelect: 'none',
});

export const StockChartInfoHeader = styled.div({
  position: 'absolute',

  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'start',
  padding: '8px',
});
