import styled from '@emotion/styled';
import { media, theme } from '../../styles/themes';

const StockCardItemContainer = styled.div({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '18px',
  width: '100%',
  background: theme.colors.grayscale100,
  cursor: 'pointer',
  [media[0]]: {
    borderRadius: '12px',
  },
});

const StockCardItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 0',
  width: '100%',
  height: '100%',
  background: theme.colors.grayscale10,
  gap: '12px',
  fontSize: '40px',
  fontWeight: '700',
  color: theme.colors.grayscale90,
  lineHeight: '1.0',
  [media[0]]: {
    padding: '12px 0',
    gap: '8px',
    fontSize: '17px',
  },
});

const StockCardItemScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 24px',
  background: delta > 0 ? theme.colors.red : theme.colors.blue,
  borderRadius: '100px',
  color: theme.colors.grayscale0,
  fontSize: '19px',
  [media[0]]: {
    padding: '6px 12px',
    gap: '4px',
    fontSize: '13px',
  },
}));

const StockCardItemDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '17px',
  gap: '4px',
  ['svg']: {
    height: '11px',
    fill: delta > 0 ? theme.colors.yellow : theme.colors.cyan,
  },
  [media[0]]: {
    gap: '2px',
    fontSize: '11px',
    ['svg']: {
      height: '6px',
    },
  },
}));

export { StockCardItemContainer, StockCardItemTitle, StockCardItemScore, StockCardItemDeltaScore };
