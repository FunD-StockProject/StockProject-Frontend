import styled from '@emotion/styled';
import { ImgDiv } from '@components/Common/Common';
import { media, theme } from '@styles/themes';

const StockCardItemContainer = styled.div({
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '4em',
  borderRadius: '18px',
  padding: '1.6em 2.0em',
  background: theme.colors.grayscale100,
  cursor: 'pointer',
  width: '100%',

  [media[0]]: {
    padding: '0.4em 0.5em',
    gap: '0.5em',
  },
});

const StockCardItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '0.6em',
  fontSize: '1.6em',
  fontWeight: '700',
  color: 'white',
  lineHeight: '1.0',
  width: '100%',
  padding: '0.5em',

  [media[0]]: {
    gap: '0.4em',
    fontSize: '0.8em',
  },
});

const StockCardItemText = styled.div({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
});

const StockCardItemScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
  color: delta > 0 ? theme.colors.red : theme.colors.blue,

  fontSize: '1.0em',
  [media[0]]: {
    // gap: '8px',
  },
}));

const StockCardItemDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.7em',
  gap: '4px',
  background: 'white',
  padding: '0.2em 0.4em',
  borderRadius: '100px',

  ['svg']: {
    height: '0.5em',
    width: 'auto',
    fill: delta > 0 ? theme.colors.red : theme.colors.blue,
  },
  [media[0]]: {
    gap: '2px',
    ['svg']: {
      // height: '6px',
    },
  },
}));

const ScoreImage = styled(ImgDiv)({
  width: '80%',
  borderRadius: '15px',
  marginLeft: 'auto',

  [media[0]]: {
    width: '100%',
  },
});
export { StockCardItemContainer, StockCardItemTitle, StockCardItemText, StockCardItemScore, StockCardItemDeltaScore, ScoreImage };
