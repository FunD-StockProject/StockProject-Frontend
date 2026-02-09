import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const Backdrop = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
});

const PWAInfoContainer = styled.div({
  position: 'fixed',
  bottom: '0px',
  borderRadius: '12px 12px 0 0',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  background: theme.colors.primary0,
  width: '100%',
  flexDirection: 'column',
  color: 'black',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  pointerEvents: 'auto',
  padding: '32px 24px',
  boxSizing: 'border-box',
  gap: '24px',
  display: 'flex',

  ['>svg']: {
    position: 'absolute',
    bottom: '100%',
    right: '0px',
    margin: '4px',
    width: '36px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray5,
  },
});

const PWAInfoContents = styled.div({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  justifyContent: 'center',

  ['>img']: {
    maxWidth: '150px',
    width: '100%',
    minWidth: '0',
  },
});

const PWAInfoTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  flexShrink: '0',

  ['>p']: {
    margin: '0',
    color: theme.colors.sub_black,

    ['&.title']: {
      ...theme.font.heading24Bold,
    },

    ['&.description']: {
      ...theme.font.body16Medium,
    },
  },
});

const PWAInfoButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  fontStyle: 'normal',

  ['>button']: {
    width: '160px',
    borderRadius: '8px',
    padding: '12px 8px',
    fontFamily: 'Pretendard',
    ...theme.font.body14Semibold,
    wordBreak: 'keep-all',
    outline: 'none',
    cursor: 'pointer',
    border: `1px solid transparent`,

    ['&.white']: {
      background: theme.colors.sub_white,
      color: theme.colors.sub_gray8,
      borderColor: theme.colors.sub_gray2,
    },
    ['&.blue']: {
      background: theme.colors.sub_blue6,
      color: theme.colors.sub_white,
    },
  },
});

export { Backdrop, PWAInfoContainer, PWAInfoContents, PWAInfoTextContainer, PWAInfoButtonContainer };
