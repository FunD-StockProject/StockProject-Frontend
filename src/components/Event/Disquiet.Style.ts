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

  width: '30%',
  height: '100%',

  background:
    'linear-gradient(100deg, transparent 30%, rgba(255, 208, 67, 0.8) 40%, rgba(112, 179, 255, 0.6) 50%, transparent 60%)',
  filter: 'brightness(1.5) opacity(0.5) blur(2px)',
  mixBlendMode: 'color-dodge',

  animation: shiny + ' 12s ease-in-out 1s infinite',
});

export const DisquietViewContainer = styled.div({
  position: 'absolute',
  top: '0',
  right: '0',

  display: 'flex',
  overflow: 'hidden',
  gap: '18px',
  alignItems: 'center',
  boxSizing: 'border-box',
  margin: '24px 60px',
  padding: '18px',

  fontWeight: '500',
  whiteSpace: 'nowrap',

  background: theme.colors.grayscale80,
  borderRadius: '18px',
  boxShadow: '5px 4px 3px rgba(0, 0, 0, 0.5)',
  cursor: 'pointer',

  [media[0]]: {
    position: 'relative',

    gap: '12px',
    margin: '0',
    padding: '12px',

    borderRadius: '12px',

    ['>svg']: {
      width: '32px',
      height: '32px',
    },
  },

  ['>svg']: {
    width: '48px',
    height: '48px',

    filter: 'drop-shadow(5px 7px 0px rgba(0, 0, 0, 0.1));',

    animation: elevator + ' 8s ease-in-out 0s infinite',
  },
});

export const DisquietViewTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'start',

  fontSize: '24px',
  lineHeight: '1',

  [media[0]]: {
    gap: '8px',

    fontSize: '15px',

    ['svg']: {
      width: '48px',
      height: '11px',
    },
  },

  ['svg']: {
    width: 'auto',
    height: '15px',
  },
});
