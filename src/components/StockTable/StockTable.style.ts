import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const StockTableContainer = styled.div({
  width: '100%',
  marginTop: '20px',
});

const StockTableTitle = styled.div({
  display: 'flex',
  fontFamily: 'Pretendard',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '1.5',
  justifyContent: 'space-between', // 제목과 기준 시간 오른쪽 정렬
  alignItems: 'center',
  color: theme.colors.grayscale10,

  ['svg']: {
    height: '18px',
    width: 'auto',
  },

  div: {
    fontSize: '21px',
    color: theme.colors.primary0,
  },
});

const StyledTabMenu = styled.ul({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: 0, // 기본 padding 제거
  backgroundColor: theme.colors.primary100,

  '.submenu': {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    padding: '12px 14px',
    fontWeight: '500',
    color: theme.colors.primary0,
    backgroundColor: theme.colors.primary100,
    cursor: 'pointer',
  },

  '.focused': {
    backgroundColor: theme.colors.grayscale100,
    borderRadius: '10px',
    fontWeight: '700',
  },
});

const HeaderItem = styled.div({
  flex: 1, // 동일한 비율로 공간 차지
  textAlign: 'center', // 텍스트 중앙 정렬
});

const TableHeaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between', // 열 간 간격 균등
  alignItems: 'center', // 세로 중앙 정렬
  padding: '12px 0',
  color: theme.colors.grayscale60,
  fontFamily: 'Pretendard', // 폰트 설정
  fontSize: '13px', // 글꼴 크기
  fontStyle: 'normal', // 일반 스타일
  fontWeight: 500, // 두께 설정
  lineHeight: '1.5', // 줄 높이 설정 (19.5px)
});

const TableRow = styled.div({
  display: 'flex',
  justifyContent: 'space-between', // 열 간 간격 균등
  alignItems: 'center', // 세로 중앙 정렬
  padding: '12px 0',
  color: theme.colors.primary0,
  borderBottom: `1px solid ${theme.colors.grayscale90}`, // 행 구분선 추가
  ':last-child': {
    borderBottom: 'none',
  },
});

const StockInfo = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
});

const StockLogo = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
});

const StockData = styled.div({
  flex: 1,
  textAlign: 'center', // 텍스트 중앙 정렬
  fontSize: '15px',
});

const ChangeValue = styled.span<{ isPositive: boolean }>(({ isPositive }) => ({
  color: isPositive ? theme.colors.red : theme.colors.blue,
  fontSize: '13px',
}));

export { StockTableContainer, StockInfo, StockTableTitle, StyledTabMenu, TableHeaderContainer, HeaderItem, TableRow, StockLogo, StockData, ChangeValue };
