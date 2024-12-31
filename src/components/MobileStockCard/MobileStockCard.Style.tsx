import styled from '@emotion/styled';
import { ImgDiv } from '@components/Common/Common';
import { theme } from '@styles/themes';

const MobileStockCardItemContainer = styled.div({
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row', // 가로 정렬로 변경
  alignItems: 'center',
  gap: '1em',
  borderRadius: '8px',
  padding: '12px',
  background: theme.colors.grayscale100,
  cursor: 'pointer',
  width: '100%',
  marginBottom: '0.5em',
});

const MobileStockCardItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '1em',
  fontSize: '0.8em',
  fontWeight: '700',
  color: 'white',
  lineHeight: '1.2',
  width: '100%',
  overflow: 'hidden',
});

const MobileStockCardItemText = styled.div({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
  fontSize: '1.2em',
});

const MobileStockCardItemScore = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.primary0,
  fontSize: '1.6em',
  marginTop: '-0.4em',
});

const MobileStockCardItemDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.8em',
  gap: '4px',
  color: delta > 0 ? theme.colors.red : theme.colors.blue,
  padding: '0 0.4em',

  ['svg']: {
    height: '0.5em',
    width: 'auto',
    fill: delta > 0 ? theme.colors.red : theme.colors.blue,
  },
}));

const KeywordContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5em',
});

const MobileStockCardKeyword = styled.div({
  display: 'flex',
  fontSize: '0.8em',
  backgroundColor: theme.colors.grayscale90,
  color: theme.colors.primary0,
  padding: '0.4em 0.8em',
  borderRadius: '24px',
});

const MobileScoreImage = styled(ImgDiv)({
  width: '40%',
  borderRadius: '7px',
});

export {
  MobileStockCardItemContainer,
  MobileStockCardItemTitle,
  MobileStockCardItemText,
  MobileStockCardItemScore,
  MobileStockCardItemDeltaScore,
  KeywordContainer,
  MobileStockCardKeyword,
  MobileScoreImage,
};
