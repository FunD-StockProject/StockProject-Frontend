import styled from '@emotion/styled';

const width = Math.min(600, window.innerWidth);

const StyledCard = styled.div({
  margin: '0 5px',
  borderRadius: '12px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column', // 세로 방향으로 배치
  width: `${(width - 60) / 3}px`,
  height: '240px',

  img: {
    flex: 3,
    width: '100%', // 가로 너비를 부모에 맞춤
    objectFit: 'cover' // 이미지의 크기 비율을 유지하며 영역을 채움
  },

  '& > *': {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    fontSize: '1em',
    fontWeight: 'bold',
    lineHeight: '1',
    color: 'black',
    textAlign: 'center',

    backgroundColor: 'white',
  },
});

const StyledScore = styled.div<{ backgroundColor: string }>(({ backgroundColor }) => ({
  backgroundColor,
  color: 'white',
  fontSize: '1em',
  padding: '10px 20px',
  borderRadius: '40px',
}));

const StyledChangedScore = styled.span<{ color: string }>(({ color }) => ({
  color,
  fontSize: '0.5em',
  padding: '2.5px',
  verticalAlign: 'middle',

  img: {
    width: '1em' // 텍스트 크기에 맞춤
  },
}));

const StyledText = styled.div({
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '80%',
});

export { StyledCard, StyledScore, StyledChangedScore, StyledText };
