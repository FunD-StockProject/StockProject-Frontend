import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const KeywordsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const TitleWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between', // 제목과 날짜 간 간격
  alignItems: 'center',
  fontFamily: 'Pretendard', // 폰트 지정

  ['span']: {
    fontSize: '16px', // 기준 텍스트 크기
    fontWeight: '500',
    color: theme.colors.grayscale60, // 기준 텍스트 색상
  },
  [media[0]]: {
    ['span']: {
      fontSize: '10px',
    },
  },
});

const Title = styled.div({
  color: theme.colors.grayscale10, // 제목 텍스트 색상
  fontSize: '32px', // 글자 크기
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '150%', // 줄 간격
  display: 'flex', // 텍스트와 아이콘 정렬을 위해 flex 사용
  alignItems: 'center', // 세로축 중앙 정렬

  ['svg']: {
    marginLeft: '8px', // 아이콘과 텍스트 간 간격
    width: '24px',
    height: '24px',
  },

  [media[0]]: {
    fontSize: '16px', // 작은 화면에서 글자 크기 조정

    ['svg']: {
      width: '20px', // 아이콘 크기 조정
    },
  },
});

const KeywordList = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '8px',
  alignSelf: 'stretch',
});

const KeywordItem = styled.div({
  color: theme.colors.primary0,
  backgroundColor: theme.colors.grayscale100,
  textAlign: 'right',
  fontFamily: 'Pretendard', // Corrected camelCase syntax
  fontSize: '19px', // Corrected camelCase syntax
  fontStyle: 'normal',
  fontWeight: 700,

  padding: '12px 20px',
  borderRadius: '30px',
  border: `1px solid ${theme.colors.grayscale100}`,

  [media[0]]: {
    fontSize: '16px',
  },
});

export { KeywordsContainer, TitleWrapper, Title, KeywordList, KeywordItem };
