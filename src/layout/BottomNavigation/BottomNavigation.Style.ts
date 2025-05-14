import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const NavContainer = styled('nav')({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '64px',
  backgroundColor: theme.colors.primary50,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  zIndex: 1000,
});

export const NavItem = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '12px',
  color: '#333',
});
