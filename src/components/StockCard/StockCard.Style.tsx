import styled from '@emotion/styled';
import { ImgDiv } from '@components/Common/Common';
import { media, theme } from '../../styles/themes';

const StockCardItemContainer = styled.div({
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '3em',
  borderRadius: '18px',
  padding: '27px 33px',
  background: theme.colors.grayscale100,
  cursor: 'pointer',
  width: '100%',

  [media[0]]: {
    borderRadius: '12px',
    padding: '9px 11px',
    gap: '0.5em',
  },
});

const StockCardItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '20px 0',
  gap: '12px',
  fontSize: '1.6em',
  fontWeight: '700',
  color: 'white',
  lineHeight: '1.0',
  width: '100%',

  [media[0]]: {
    padding: '10px 0',
    gap: '8px',
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
  gap: '16px',
  color: delta > 0 ? theme.colors.red : theme.colors.blue,
  fontSize: '1.6em',
  [media[0]]: {
    gap: '8px',
    fontSize: '1.0em',
  },
}));

const StockCardItemDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.8em',
  gap: '4px',
  background: 'white',
  padding: '0.2em 0.4em',
  borderRadius: '100px',
  ['svg']: {
    height: '12px',
    fill: delta > 0 ? theme.colors.red : theme.colors.blue,
  },
  [media[0]]: {
    gap: '2px',
    // fontSize: '0.4em',
    // padding: '0.4em 0.8em',
    ['svg']: {
      height: '6px',
    },
  },
}));

const ScoreImage = styled(ImgDiv)({
  width: '80%',
  borderRadius: '15px',
  marginLeft: 'auto',
});
export {
  StockCardItemContainer,
  StockCardItemTitle,
  StockCardItemText,
  StockCardItemScore,
  StockCardItemDeltaScore,
  ScoreImage,
};
