import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const HeaderContainer = styled.div({
  width: '100%',
  background: theme.colors.primary50,
});

const HeaderContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  height: '100%',
});

const HeaderLogo = styled.div({
  width: '100%',
  margin: '0 auto',
  padding: '64px',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',

  [media[0]]: {
    padding: '24px',
  },

  ['> svg']: {
    cursor: 'pointer',
    width: 'auto',
    height: '48px',
    margin: '0 auto',

    [media[0]]: {
      height: '24px',
      padding: '12px 0',
    },
  },

  ['iframe']: {
    background: 'transparent',
    ['div']: {
      background: 'red',
    },
  },
});

export { HeaderContainer, HeaderContents, HeaderLogo };
