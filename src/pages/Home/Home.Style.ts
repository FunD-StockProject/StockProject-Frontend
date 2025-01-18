import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

const HomeContainer = styled.div({
  position: 'relative',

  width: '100%',
  marginBottom: 'auto',

  background: theme.colors.primary100,
});

const HomeContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '1280px',
  height: '100%',
  margin: '0 auto',
  padding: '90px 60px',

  [media[0]]: {
    gap: '48px',
    padding: '40px 0px',
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
  position: 'absolute',
  bottom: '100%',

  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'row',
  alignItems: 'center',
  maxWidth: '1280px',
  margin: 0,

  color: 'black',
  fontSize: '21px',

  listStyle: 'none',
  borderRadius: '8px 8px 0 0',

  paddingInlineStart: '0',

  '.focused': {
    color: theme.colors.primary0,

    backgroundColor: theme.colors.primary100,
  },

  '.submenu': {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: '12px 24px',

    color: theme.colors.grayscale50,
    fontWeight: 'bold',

    backgroundColor: theme.colors.grayscale100,
    cursor: 'pointer',
  },

  [media[0]]: {
    position: 'static',
    top: '0px',
    left: '0px',

    width: '100%',

    fontSize: '17px',

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
  margin: '0px 4px',

  color: theme.colors.grayscale60,
  fontWeight: '500',
  fontSize: '15px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  lineHeight: '1.5',

  [media[0]]: {
    margin: '-10px 4px',

    fontSize: '11px',
  },
});

export { HomeContainer, HomeContents, StyleTabMenuContainer, StyleTabMenu, StyledSpan, StyledText };
