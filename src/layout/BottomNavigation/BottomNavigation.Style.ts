import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const NavContainer = styled('nav')({
  display: 'flex',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '64px',
  backgroundColor: theme.colors.sub_black,
  justifyContent: 'space-around',
  alignItems: 'center',
  zIndex: 10,
  fontFamily: 'Noto Sans KR',
});

export const NavItem = styled('div')<{ isActive: boolean }>(({ isActive }) => ({

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Noto Sans KR',
  fontWeight: 500,
  fontSize: '10px',
  lineHeight: '150%',
  letterSpacing: '0.6px',
  cursor: 'pointer',
  transition: 'color 0.2s ease',

  '& svg path': {
    transition: 'fill 0.2s ease',
    fill: isActive ? theme.colors.sub_white : '',
  },
}));
