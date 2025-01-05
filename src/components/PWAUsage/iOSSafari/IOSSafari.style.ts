import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const OrderContainer = styled.div({
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',

  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  marginTop: '30px',
});

const HeaderText = styled.h2({
  color: theme.colors.primary0,
  fontFamily: 'Pretendard',
  fontSize: '25px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '1.5',
  textAlign: 'left',
});

const DetailContainer = styled.div({
  display: 'flex',
  flexDirection: 'column', // 세로 정렬로 변경
  gap: '50px', // 각 항목 간 간격
  width: '100%', // 전체 너비 차지
});

const DetailItem = styled.div({
  display: 'flex',
  width: '100%', // 전체 너비 차지
  flexDirection: 'column', // 아이템 내부는 가로 정렬
  alignItems: 'flex-start',
  gap: '22px',

  ['div']: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
  },

  ['svg']: {
    width: '100%',
    height: 'auto',
  },
});

const DetailNumber = styled.div({
  width: '20px',
  height: '20px',
  fontSize: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 700,
  borderRadius: '4px',
  background: theme.colors.primary50,
  color: theme.colors.primary0,
});

const DetailText = styled.div({
  color: theme.colors.primary0,
  fontFamily: 'Pretendard',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '1.5',
  textAlign: 'left',
  flex: 1, // 텍스트 영역 확장
});

export { OrderContainer, HeaderText, DetailContainer, DetailItem, DetailNumber, DetailText };
