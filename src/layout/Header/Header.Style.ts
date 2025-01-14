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
  gap: '32px',

  [media[0]]: {
    gap: '18px',
  },
});

const HeaderLogo = styled.div({
  margin: '0 auto',
  padding: '32px',

  [media[0]]: {
    padding: '24px',
  },

  ['svg']: {
    cursor: 'pointer',
    width: 'auto',
    height: '48px',

    [media[0]]: {
      height: '24px',
    },
  },
});

export { HeaderContainer, HeaderContents, HeaderLogo };
