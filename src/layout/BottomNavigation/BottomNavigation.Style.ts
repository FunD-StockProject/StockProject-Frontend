import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const NavContainer = styled('nav')({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '64px',
  backgroundColor: theme.colors.primary0,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  zIndex: 1000,
  fontFamily: 'Noto Sans KR',
});

export const NavItem = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Noto Sans KR',
  fontWeight: 500,
  fontSize: '10px',
  lineHeight: '150%',
  letterSpacing: '0.6px',
  color: '#333',
  cursor: 'pointer',
  transition: 'color 0.2s ease',

  '& svg path': {
    transition: 'fill 0.2s ease',
  },

  '&:hover': {
    color: theme.colors.primary50,

    '& svg path': {
      fill: theme.colors.primary50,
    },
  },
});
