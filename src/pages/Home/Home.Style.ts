import styled from '@emotion/styled';

const width = Math.min(600, window.innerWidth);

const StyledHome = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: '100px',
});

const StyledContainer = styled.div({
  width: `${width}px`,
});

const StyledImage = styled.img({
  padding: '10px 10px',
  width: '40%',
});

const StyleTabMenu = styled.ul({
  backgroundColor: 'white',
  color: 'black',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  listStyle: 'none',
  margin: '0px',
  paddingInlineStart: '0px',

  // 하위 클래스 스타일 정의
  '.submenu': {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    padding: '10px 0px',
    fontSize: '15px',
    fontWeight: 'bold',
  },

  '.focused': {
    backgroundColor: 'black',
    color: 'white',
  },
});

export { StyledHome, StyledContainer, StyledImage, StyleTabMenu };
