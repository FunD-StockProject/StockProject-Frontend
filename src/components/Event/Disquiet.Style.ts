import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const shiny = keyframes({
  ['0%, 45%']: {
    right: 250,
  },
  ['55%, 100%']: {
    right: -70,
  },
});

const elevator = keyframes({
  ['0%']: {
    transform: 'translateY(200%)',
  },
  ['5%, 95%']: {
    transform: 'translateY(0%)',
  },
  ['100%']: {
    transform: 'translateY(-200%)',
  },
});

export const DisquietViewStyled = styled.div({
  position: 'absolute',
  top: 0,
  right: 300,
  height: '100%',
  width: '30%',
  background:
    'linear-gradient(100deg, transparent 30%, rgba(255, 208, 67, 0.8) 40%, rgba(112, 179, 255, 0.6) 50%, transparent 60%)',
  filter: 'brightness(1.5) opacity(0.5) blur(2px)',
  mixBlendMode: 'color-dodge',
  animation: shiny + ' 12s ease-in-out 1s infinite',
});

export const DisquietViewContainer = styled.div({
  fontWeight: '500',
  cursor: 'pointer',

  overflow: 'hidden',
  position: 'absolute',
  boxShadow: '5px 4px 3px rgba(0, 0, 0, 0.5)',

  top: '0',
  right: '0',
  margin: '24px 60px',

  background: theme.colors.grayscale80,
  display: 'flex',
  alignItems: 'center',
  borderRadius: '18px',
  boxSizing: 'border-box',
  padding: '18px',
  gap: '18px',
  whiteSpace: 'nowrap',
  ['>svg']: {
    height: '48px',
    width: '48px',
    animation: elevator + ' 8s ease-in-out 0s infinite',
    filter: 'drop-shadow(5px 7px 0px rgba(0, 0, 0, 0.1));',
  },

  [media[0]]: {
    position: 'relative',
    margin: '0',
    borderRadius: '12px',
    padding: '12px',
    gap: '12px',
    ['>svg']: {
      height: '32px',
      width: '32px',
    },
  },
});

export const DisquietViewTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '12px',
  fontSize: '24px',
  lineHeight: '1',

  ['svg']: {
    height: '15px',
    width: 'auto',
  },

  [media[0]]: {
    gap: '8px',
    fontSize: '15px',
    ['svg']: {
      height: '11px',
      width: '48px',
    },
  },
});
