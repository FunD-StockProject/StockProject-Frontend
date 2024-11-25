import { theme } from '../../styles/themes';
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
  padding: '10px',
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
  paddingInlineStart: '0',
  fontSize: theme.fontSize.Title.Large.Web,

  // 하위 클래스 스타일 정의
  '.submenu': {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',

    padding: '12px 0',

    fontWeight: 'bold',
  },

  '.focused': {
    color: 'white',
    backgroundColor: theme.colors.primary100,
  },
});

export { StyledHome, StyledContainer, StyledImage, StyleTabMenu };
