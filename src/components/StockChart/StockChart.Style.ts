import styled from '@emotion/styled';
import { theme, themeColor } from '@styles/themes';

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

export const StockChartHeaderContents = styled.div({ display: 'flex', gap: '8px' });

export const StockChartHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StockChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const StockChartStyledCanvas = styled.canvas({
  width: '100%',
  height: '100%',
  position: 'absolute',
});

export const ChartLabel = styled.span(
  ({ x, y, color, background }: { x?: number; y?: number; color?: string; background?: themeColor }) => ({
    background: theme.colors[background ?? 'transparent'],
    color: color ?? 'white',
    top: y ?? '0px',
    left: x ?? '0px',
    transform:
      'translate(' + (typeof x == 'number' ? '-50%' : '0') + ', ' + (typeof y == 'number' ? '-50%' : '0') + ')',
  }),
  {
    padding: '6px 12px',
    lineHeight: '1',
    position: 'absolute',
    whiteSpace: 'nowrap',
  },
);
