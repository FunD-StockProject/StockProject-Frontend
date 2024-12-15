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
  gap: '20px', // 각 항목 간 간격
  width: '100%', // 전체 너비 차지
  // '& > :first-child': {
  //   marginBottom: '-2px', // 첫 번째 자식 요소의 하단 간격 조정
  // },
});

const DetailItem = styled.div({
  display: 'flex',
  flexDirection: 'row', // 아이템 내부는 가로 정렬
  alignItems: 'center',
  gap: '16px', // 숫자, 텍스트, 이미지 간 간격
});

const DetailNumber = styled.div({
  width: '20px',
  height: '20px',
  fontSize: '12px',
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
  fontSize: '17px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '1.5',
  textAlign: 'left',
  flex: 1, // 텍스트 영역 확장
});

const DetailImage = styled.img({
  width: '100%', // 이미지 크기 조정
  marginBottom: '32px',
  display: 'block',
});

export { OrderContainer, HeaderText, DetailContainer, DetailItem, DetailNumber, DetailText, DetailImage };
