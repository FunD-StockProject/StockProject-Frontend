import styled from '@emotion/styled';
import { ImgDiv } from '@components/Common/Common';
import { theme } from '@styles/themes';

const MobileStockCardItemContainer = styled.div({
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row', // 가로 정렬로 변경
  alignItems: 'center',
  // justifyContent: 'space-between', // 양쪽 정렬
  gap: '1em',
  borderRadius: '18px',
  padding: '1.6em',
  background: theme.colors.grayscale100,
  cursor: 'pointer',
  width: '100%',
  marginBottom: '12px',
});

const MobileStockCardItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2em',
  fontSize: '1.0em',
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

const MobileStockCardItemScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4em',
  color: delta > 0 ? theme.colors.red : theme.colors.blue,
  fontSize: '1.6em',
}));

const MobileStockCardItemDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.8em',
  gap: '4px',
  background: 'white',
  padding: '0 0.4em',
  borderRadius: '35px',

  ['svg']: {
    height: '0.5em',
    width: 'auto',
    fill: delta > 0 ? theme.colors.red : theme.colors.blue,
  },
}));

const MobileScoreImage = styled(ImgDiv)({
  width: '40%', // 크기 조정
  borderRadius: '7px',
});

export {
  MobileStockCardItemContainer,
  MobileStockCardItemTitle,
  MobileStockCardItemText,
  MobileStockCardItemScore,
  MobileStockCardItemDeltaScore,
  MobileScoreImage,
};
