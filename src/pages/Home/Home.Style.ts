import styled from '@emotion/styled';
import { theme } from '../../styles/themes';

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
  maxWidth: '1280px',
  margin: '0 auto',
  backgroundColor: 'white',
  color: 'black',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  listStyle: 'none',
  paddingInlineStart: '0px',
  fontSize: theme.fontSize.Title.Large.Web,

  // 하위 클래스 스타일 정의
  '.submenu': {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    padding: '12px 0px',
    fontWeight: 'bold',
  },

  '.focused': {
    backgroundColor: theme.colors.primary100,
    color: 'white',
  },
});

export { StyledHome, StyledContainer, StyledImage, StyleTabMenu };
