import styled from '@emotion/styled';
import { theme, themeColor } from '@styles/themes';

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
});

const PopUpTitle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '40px',
  fontWeight: '700',

  padding: '48px 32px 0 32px',
  ['svg']: {
    height: '36px',
    width: 'auto',
  },
});

const PopUpContent = styled('div')({
  padding: '0 48px 32px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontSize: '16px',
  lineHeight: '1.5',
  color: theme.colors.grayscale100,
});

const PopUpImage = styled('ul')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
  padding: 0,
  listStyle: 'none',

  ['div']: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'space-between',
    gap: '8px',
    flex: 1,
    height: '160px',

    ['p']: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: '16px',
      margin: 0,
      background: theme.colors.grayscale90,
      color: theme.colors.primary0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      borderRadius: '8px',
      width: '100%',
    },

    ['img']: {
      width: '100%',
      objectFit: 'contain',
      borderRadius: '8px',
    },
  },
});

const PopUpDetailContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  background: theme.colors.grayscale10,
  borderRadius: '8px',
  padding: '16px',
  marginTop: '12px',
});

const PopUpDetail = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  ['span']: {
    fontSize: '14px',
    color: theme.colors.grayscale100,
  },
});

const PopUpDetailNumber = styled.div(({ color }: { color?: themeColor }) => ({
  width: '24px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '14px',
  fontWeight: '700',
  borderRadius: '4px',
  background: color ? theme.colors[color] : theme.colors.primary40,
  color: theme.colors.primary0,
}));

const ConfirmButton = styled('div')({
  textAlign: 'center',
  fontWeight: '500',
  fontSize: '16px',
  cursor: 'pointer',
  background: theme.colors.primary50,
  color: theme.colors.primary0,
  borderRadius: '0 0 12px 12px',
  padding: '27px 0',
  // '&:hover': {
  //   textDecoration: 'underline',
  // },
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
});

export {
  PopUpContainer,
  PopUpTitle,
  PopUpContent,
  PopUpImage,
  PopUpDetailContainer,
  PopUpDetail,
  PopUpDetailNumber,
  ConfirmButton,
  Backdrop,
  CloseButton,
};
