import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const PopUpContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  background: theme.colors.grayscale30,
  color: theme.colors.primary100,
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  fontFamily: 'Pretendard',
  overflow: 'hidden',

  [media[0]]: {
    ['svg']: {
      width: '40%',
    },
  },
});

const PopUpContent = styled('div')({
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '1.5',
  whiteSpace: 'break-spaces',
  color: theme.colors.grayscale100,
});

const PopUpTitle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  ...theme.font.body18Semibold,
  color: theme.colors.primary100,

  ['>svg']: {
    width: '72px',
    height: 'auto',
  },
});

const ConfirmButton = styled('div')({
  textAlign: 'center',
  cursor: 'pointer',
  background: theme.colors.sub_blue6,
  color: theme.colors.primary0,
  padding: '12px 0',
  ...theme.font.body18Semibold,
});

const StyledSpan = styled('span')({
  color: theme.colors.primary50,
  fontWeight: '700',
});

const Backdrop = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
});

const CloseButton = styled('button')({
  position: 'absolute',
  top: '12px',
  right: '12px',
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  color: theme.colors.grayscale100,

  [media[0]]: {
    top: '8px',
    right: '8px',
  },
});

export { PopUpContainer, PopUpTitle, PopUpContent, StyledSpan, Backdrop, ConfirmButton, CloseButton };
