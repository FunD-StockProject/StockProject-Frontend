import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { media, theme } from '@styles/themes';

const StockTableContainer = styled.div({
  width: '100%',
  boxSizing: 'border-box',

  [media[0]]: {
    padding: '0 20px', // 상하 여백 추가
  },
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
    fontSize: '24px',
    padding: '5px 0', // 상하 여백 추가

    ['span']: {
      fontSize: '13px',
    },
    ['svg']: {
      height: '0.9em',
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
    borderRadius: '8px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 12px',
    fontWeight: '500',
    color: theme.colors.primary0,
    backgroundColor: theme.colors.primary100,
    cursor: 'pointer',
  },

  '.focused': {
    backgroundColor: theme.colors.grayscale100,
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
  display: 'grid',
  gridTemplateColumns: '33% 33% 33%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px 0',
  color: theme.colors.primary0,
  borderBottom: `1px solid ${theme.colors.grayscale90}`, // 행 구분선 추가
  cursor: 'pointer',
  ':last-child': {
    borderBottom: 'none',
  },
});

const StockInfo = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'left',
  gap: '8px',
});

const StockLogo = styled.div({
  width: '1.5em',
  height: '1.5em',
  borderRadius: '64px',
});

const StockName = styled.div({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'keep-all',
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
