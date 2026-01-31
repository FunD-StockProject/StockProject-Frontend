import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

export const ChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  height: '100%',
  width: '100%',

  [media[0]]: {
    gap: '12px',
  },
});

// Header

export const ChartHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  fontSize: '17px',

  [media[0]]: {
    fontSize: '13px',
  },
});

export const ChartHeaderContents = styled.div({
  display: 'flex',
  gap: '8px',

  [media[0]]: {
    gap: '4px',
  },
});

export const ChartHeaderItem = styled.div(
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

// View

export interface ChartHeight {
  price: string;
  score: string;
}

export const ViewContainer = styled.div(
  ({ chartHeight }: { chartHeight: ChartHeight }) => {
    const { price, score } = chartHeight ?? {};

    return {
      gridTemplateRows: `${price ?? '1fr'} ${score ?? '200px'} auto`,

      [media[0]]: {
        gridTemplateRows: `${price ?? '1fr'} ${score ?? '100px'} auto`,
      },
    };
  },
  {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    width: '100%',

    flexGrow: '1',
    height: '700px',

    [media[0]]: {
      height: '400px',
    },
  },
);

export const ViewCanvasContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderBottom: `2px solid ${theme.colors.sub_gray10}`,
  borderRight: `2px solid ${theme.colors.sub_gray10}`,
  boxSizing: 'border-box',
});

export const ViewCanvas = styled.canvas(
  ({ type, expand }: { type?: 'POINTER' | 'GRID'; expand?: string }) => ({
    height: expand ? `calc(100% + ${expand})` : '100%',
    zIndex: type === 'GRID' ? 0 : type === 'POINTER' ? 2 : 1,
  }),
  {
    position: 'absolute',
    width: '100%',
    top: '0',
    left: '0',
  },
);

// Label

export const ChartLabelContainer = styled.div({
  position: 'relative',
  overflow: 'hidden',
  userSelect: 'none',
  borderBottom: `2px solid ${theme.colors.grayscale90}`,
  flexShrink: '0',
  boxSizing: 'border-box',
  height: '100%',
});

export const ChartLabel = styled.span(
  ({ type, y, x, color }: { type?: 'FILL' | 'STROKE' | 'MOCK'; y?: number; x?: number; color?: string }) =>
    ({
      visibility: type === 'MOCK' ? 'hidden' : 'visible',
      position: type === 'MOCK' ? 'static' : 'absolute',
      top: y ?? 0,
      left: x ?? 0,
      color: type === 'STROKE' ? (color ?? theme.colors.sub_gray11) : theme.colors.sub_gray1,
      backgroundColor: type === 'FILL' ? (color ?? theme.colors.blue) : 'transparent',
      borderColor: type === 'STROKE' ? (color ?? 'transparent') : 'transparent',
      transform: `translate3d(${x ? '-50%' : '0'}, ${y ? '-50%' : '0'}, 0)`,
      backdropFilter: type === 'STROKE' ? 'blur(10px)' : 'none',
      width: y ? '100%' : 'auto',
    }) as const,
  {
    boxSizing: 'border-box',
    padding: '2px 10px',

    ...theme.font.body14Medium,
    whiteSpace: 'nowrap',
    borderStyle: 'solid',
    borderWidth: '2px',

    [media[0]]: {
      padding: '0px 6px',
      ...theme.font.detail12Medium,
    },
  },
);

export const deltaToChartColor = (delta: number) => {
  return delta >= 0 ? '#EF4444' : '#2563EB';
};

export const InfoHeader = styled.div({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',

  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'start',
  padding: '8px',

  zIndex: 1,
  userSelect: 'none',

  overflow: 'hidden',
});

export const InfoHeaderItemContainer = styled.div({
  ...theme.font.body14Semibold,
  display: 'flex',
  gap: '4px',
  whiteSpace: 'nowrap',

  ['p']: {
    margin: '0',
  },

  [media[0]]: {
    ...theme.font.detail12Semibold,
  },
});

export const InfoHeaderItemContent = styled.span(
  ({ color }: { color?: string }) => ({
    color: color ?? theme.colors.sub_gray1,
  }),
  {
    display: 'flex',
    gap: '4px',
  },
);

export const InfoHeaderItemValueText = styled.p(
  ({ color }: { color?: string }) => ({
    ['>b']: {
      color: color ?? theme.colors.sub_gray1,
    },
  }),
  {
    display: 'flex',
    gap: '4px',
    color: theme.colors.sub_gray1,

    ['>b']: {
      fontWeight: 'inherit',
    },
  },
);

// ExtremePrice

export const ExtremePriceContainer = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  overflow: 'hidden',
});

export const ExtremePriceLabel = styled.span(
  ({ x, y, type }: { x: number; y: number; type: 'MAX' | 'MIN' }) =>
    ({
      top: y,
      left: x,
      flexDirection: type == 'MAX' ? 'column' : 'column-reverse',
      color: deltaToChartColor(type == 'MAX' ? 1 : -1) ?? theme.colors.sub_gray10,
      transform: `translate(-50%, ${type == 'MAX' ? -100 : 0}%)`,
      ['>svg']: {
        fill: deltaToChartColor(type == 'MAX' ? 1 : -1) ?? theme.colors.sub_gray10,
      },
    }) as const,
  {
    position: 'absolute',

    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    padding: '8px 16px',

    ['>p']: {
      ...theme.font.body14Semibold,
      whiteSpace: 'nowrap',
      margin: '0',
    },

    [media[0]]: {
      ['>p']: {
        ...theme.font.detail12Semibold,
      },
    },
  },
);

// DateLabel

export const DateLabelContainer = styled.div({
  position: 'relative',
  overflow: 'hidden',
  userSelect: 'none',
  flexShrink: '0',
  display: 'flex',
});
