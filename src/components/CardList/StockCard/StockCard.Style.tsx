import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { ImgDiv } from '@components/Common/Common';
import { media, theme } from '@styles/themes';

const StockCardItemContainer = styled.div({
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '2em',
  borderRadius: '18px',
  padding: '1.6em 2.0em',
  background: theme.colors.grayscale100,
  cursor: 'pointer',
  width: '100%',

  [media[0]]: {
    padding: '0.4em 0.5em',
    gap: '0.5em',
  },
  '&:hover': {
    background: theme.colors.grayscale90,
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

const StockCardItemScore = styled.div({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.primary0,

  fontSize: '1.0em',
});

const StockCardItemDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.8em',
  gap: '4px',
  color: deltaScoreToColor(delta),
  padding: '0 0.4em',

  ['svg']: {
    height: '0.5em',
    width: 'auto',
    fill: deltaScoreToColor(delta),
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

const KeywordContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5em',
});

const StockCardKeyword = styled.div({
  display: 'flex',
  fontSize: '15px',
  backgroundColor: theme.colors.grayscale90,
  color: theme.colors.primary0,
  padding: '0.4em 0.8em',
  borderRadius: '24px',
  maxWidth: '100px',
  alignItems: 'left',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

export {
  StockCardItemContainer,
  StockCardItemTitle,
  StockCardItemText,
  StockCardItemScore,
  StockCardItemDeltaScore,
  ScoreImage,
  KeywordContainer,
  StockCardKeyword,
};
