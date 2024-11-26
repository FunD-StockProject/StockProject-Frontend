import styled from '@emotion/styled';
import { theme } from '@styles/themes';

// 추후 분리
// const width = Math.min(600, window.innerWidth);

const StyledContainer = styled.div(({ width }: { width: number }) => ({
  width: `${width}px`,
  borderRadius: '24px',
  backgroundColor: theme.colors.grayscale100,
}));

// 카드 컴포넌트 스타일
const StyledCard = styled.div({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-around',
  color: 'white', // 텍스트 색상 흰색
  padding: '10px',
  borderRadius: '8px',
  height: '60%',
  gap: '10px',

  '& > *': {
    flex: 1,

    width: '30%',
    height: 'auto',

    textAlign: 'center',

    border: '1px solid white',
    borderRadius: '12px',
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

export { StyledContainer, StyledCard, StyledImage, StyledText };
