import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const NavContainer = styled('nav')({
  display: 'flex',
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '1280px',
  height: '64px',
  backgroundColor: theme.colors.sub_black,
  justifyContent: 'space-around',
  alignItems: 'center',
  zIndex: 10,
});

export const NavItem = styled('div')<{ isActive: boolean }>(({ isActive }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'color 0.2s ease',

  '& svg path': {
    transition: 'fill 0.2s ease',
    fill: isActive ? theme.colors.sub_white : '',
  },
}));
