import styled from '@emotion/styled';

// 추후 분리
const width = Math.min(600, window.innerWidth);

const StyledContainer = styled.div({
  height: '200px',
  width: `${width - 60}px`,
  minWidth: '360px',
  margin: '0px 10px 0px 0px',
  borderRadius: '10px',
  backgroundColor: '#1D1E1F',
});

const StyledTitle = styled.h2({
  padding: '10px 0px 0px 10px',
  margin: '0px',
});

// 카드 컴포넌트 스타일
const StyledCard = styled.div({
  backgroundColor: '#303033',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-around',
  color: 'white', // 텍스트 색상 흰색
  padding: '10px',
  borderRadius: '8px',
  height: '60%',
  gap: '10px',

  '& > *': {
    width: '30%',
    height: 'auto',
    flex: 1,
    border: '1px solid white',
    borderRadius: '12px',
    textAlign: 'center',
  },
});

const StyledImage = styled.img({
  objectFit: 'cover',
});

const StyledText = styled.div({
  fontSize: '1.5em',
  fontWeight: 'bold',
  textAlign: 'center',
  display: 'flex', // Flexbox 사용
  alignItems: 'center', // 세로 중앙 정렬
  justifyContent: 'center', // 가로 중앙 정렬
  width: '100%', // 부모 요소의 높이를 모두 차지
});

export { StyledContainer, StyledTitle, StyledCard, StyledImage, StyledText };
