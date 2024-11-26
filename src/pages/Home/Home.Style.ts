import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const HomeContainer = styled.div({
  background: theme.colors.primary100,
  width: '100%',
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
  fontSize: '21px',

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
  [media[0]]: {
    fontSize: '17px',
    '.submenu': { padding: '8px 0' },
  },
});

export { HomeContainer, HomeContents, StyleTabMenu };
