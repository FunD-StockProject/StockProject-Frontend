import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const PopUpContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '568px',
  height: 'auto',
  background: theme.colors.grayscale30,
  color: theme.colors.primary100,
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  fontFamily: 'Pretendard',

  [media[0]]: {
    width: '90%',
    ['svg']: {
      width: '40%',
    },
  },
});

const PopUpTitle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '36px',
  fontWeight: '700',
  padding: '48px 32px 0 32px',

  ['svg']: {
    height: '36px',
    width: 'auto',
  },

  [media[0]]: {
    fontSize: '20px', // 모바일에서는 작은 글자 크기
    padding: '32px 32px 0 32px',
    ['svg']: {
      height: '18px',
      width: 'auto',
    },
  },
});

const PopUpContent = styled('div')({
  padding: '0 32px 32px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontFamily: 'Pretendard',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '1.5',
  color: theme.colors.grayscale100,
});

const StyledSpan = styled('span')({
  color: theme.colors.primary50,
  fontWeight: '700',
});
const ConfirmButton = styled('div')({
  textAlign: 'center',
  fontWeight: '500',
  fontSize: '16px',
  cursor: 'pointer',
  background: theme.colors.primary50,
  color: theme.colors.primary0,
  borderRadius: '0 0 12px 12px',
  padding: '27px 0',

  [media[0]]: {
    fontSize: '14px', // 모바일 글자 크기 축소
    padding: '16px 0', // 모바일 패딩 축소
  },
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
    top: '12px',
    right: '0px',
  },
});

export { PopUpContainer, PopUpTitle, PopUpContent, StyledSpan, Backdrop, ConfirmButton, CloseButton };
