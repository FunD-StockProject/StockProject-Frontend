import styled from '@emotion/styled';
import { theme } from '../../styles/themes';

const HeaderContainer = styled.div({
  background: theme.colors.primary50,
  width: '100%',
});

const HeaderContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '0 60px',
  height: '100%',
  gap: '32px',
  cursor: 'pointer',
});

const HeaderLogo = styled.div({
  margin: '0 auto',
  padding: '24px',
});

export { HeaderContainer, HeaderContents, HeaderLogo };
