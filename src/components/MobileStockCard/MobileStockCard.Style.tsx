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
  alignItems: 'start',
  gap: '1em',
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
  borderRadius: '35px',

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

  gap: '1em', // 요소 간격 추가
});

const MobileStockCardKeyword = styled.div({
  display: 'flex',
  fontSize: '0.8em',
  color: theme.colors.primary0,
  padding: '5px 10px',
  borderRadius: '20px',
  border: '1px solid white',
});

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
  KeywordContainer,
  MobileStockCardKeyword,
  MobileScoreImage,
};
