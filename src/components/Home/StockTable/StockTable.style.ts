import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { media, theme } from '@styles/themes';

const StockTableContainer = styled.div({
  width: '100%',
});

const StockTableTitle = styled.div({
  display: 'flex', // 수평 정렬을 위해 flex 사용
  justifyContent: 'space-between', // 좌측 제목과 우측 기준 날짜를 양쪽에 배치
  alignItems: 'center', // 세로 중앙 정렬
  padding: '10px 0', // 상하 여백 추가
  margin: 0,
  fontFamily: 'Pretendard', // 통일된 폰트
  fontSize: '32px', // 기본 글자 크기
  fontWeight: '700', // 제목 강조
  lineHeight: '1.5',
  color: theme.colors.grayscale10, // 텍스트 색상

  ['div']: {
    display: 'flex',
    alignItems: 'center',
  },

  ['span']: {
    fontSize: '16px', // 기준 텍스트 크기
    fontWeight: '500',
    color: theme.colors.grayscale60, // 기준 텍스트 색상
  },

  ['svg']: {
    marginLeft: '8px', // 아이콘과 텍스트 간격
    height: '28px',
    width: 'auto',
  },

  [media[0]]: {
    fontSize: '20px',
    padding: '5px 0', // 상하 여백 추가

    ['span']: {
      fontSize: '12px',
    },
    ['svg']: {
      height: '18px',
    },
  },
});

const StyledTabMenu = styled.ul({
  display: 'flex',
  alignItems: 'center',
  padding: 0, // 기본 padding 제거
  margin: '0',
  backgroundColor: theme.colors.primary100,

  '.submenu': {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    padding: '14px',
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

  [media[0]]: {
    justifyContent: 'space-around',
    alignItems: 'center',
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
  padding: '10px 0',
  color: theme.colors.grayscale60,
  fontFamily: 'Pretendard', // 폰트 설정
  fontSize: '16px', // 글꼴 크기
  fontStyle: 'normal', // 일반 스타일
  fontWeight: 500, // 두께 설정
  lineHeight: '1.5', // 줄 높이 설정 (19.5px)

  [media[0]]: {
    padding: '5px 0',
    fontSize: '12px', // 글꼴 크기
  },
});

const TableRow = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  gap: '8px',
});

const StockLogo = styled.img({
  width: '26px',
  height: '26px',
});

const StockName = styled.div({
  width: '200px',
  alignItems: 'left',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  [media[0]]: {
    width: '100px',
  },
});

const StockData = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  color: theme.colors.primary0,
  fontFamily: 'Pretendard',
  fontSize: '17px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '1.5',
  gap: '0',
});

const DeltaScore = styled.span(({ delta }: { delta: number }) => ({
  gap: '8px',
  color: deltaScoreToColor(delta),
  fontSize: '13px',
}));

export {
  StockTableContainer,
  StockInfo,
  StockName,
  StockTableTitle,
  StyledTabMenu,
  TableHeaderContainer,
  HeaderItem,
  TableRow,
  StockLogo,
  StockData,
  DeltaScore,
};
