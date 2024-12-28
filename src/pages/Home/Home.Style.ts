import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

const HomeContainer = styled.div({
  position: 'relative',
  background: theme.colors.primary100,
  width: '100%',
  marginBottom: 'auto',
});

const HomeContents = styled.div({
  boxSizing: 'border-box',
  width: '100%',
  margin: '0 auto',
  padding: '60px',
  height: '100%',
  gap: '48px',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1280px',

  [media[0]]: {
    gap: '32px',
    padding: '30px',
  },
});

const StyleTabMenuContainer = styled.div({
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 60px',
  [media[0]]: {
    padding: '0',
  },
});

const StyleTabMenu = styled.ul({
  maxWidth: '1280px',
  color: 'black',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  listStyle: 'none',
  paddingInlineStart: '0',
  fontSize: '21px',
  position: 'absolute',
  margin: 0,
  bottom: '100%',
  overflow: 'hidden',
  borderRadius: '8px 8px 0 0',

  // 하위 클래스 스타일 정의
  '.submenu': {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: '12px 24px',
    fontWeight: 'bold',
    color: theme.colors.grayscale50,
    backgroundColor: theme.colors.grayscale100,
    cursor: 'pointer',
  },

  '.focused': {
    backgroundColor: theme.colors.primary100,
    color: theme.colors.primary0,
  },

  [media[0]]: {
    position: 'static',
    fontSize: '17px',
    top: '0px',
    left: '0px',
    width: '100%',
    borderRadius: '0',
    '.submenu': {
      display: 'flex',
      flex: 1,
      padding: '8px 0',
    },
  },
});

const StyledSpan = styled.span((props: { color?: themeColor }) => ({
  color: props.color ? theme.colors[props.color] : '#000000',
}));

const StyledText = styled.div({
  color: theme.colors.grayscale60,
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '1.5',
  margin: '0px 4px',

  [media[0]]: {
    fontSize: '12px',
    margin: '-10px 4px',
  },
});

export { HomeContainer, HomeContents, StyleTabMenuContainer, StyleTabMenu, StyledSpan, StyledText };
