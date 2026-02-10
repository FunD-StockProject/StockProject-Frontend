import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const NavContainer = styled('nav')({
  display: 'flex',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  maxWidth: '1280px',
  backgroundColor: theme.colors.sub_black,
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 33px',
  paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
  boxSizing: 'border-box',
  zIndex: '10',
  boxShadow: '0px -2px 10px 0px rgba(255, 255, 255, 0.05)',
  // 웹뷰 최적화
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden',
  transform: 'translateZ(0)', // GPU 가속
  willChange: 'transform',
});

const NavItem = styled('div')<{ isActive: boolean }>(({ isActive }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'color 0.2s ease',

  '& svg path': { transition: 'fill 0.2s ease', fill: isActive ? theme.colors.sub_white : '' },
}));

export { NavContainer, NavItem };
