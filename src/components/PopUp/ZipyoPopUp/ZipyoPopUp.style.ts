import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

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
      height: '100%',
      width: '100%',
      borderRadius: '8px',
    },
  },

  [media[0]]: {
    ['div']: {
      height: '120px',
      ['img']: {
        height: '100%',
        width: '100%',
        borderRadius: '8px',
      },
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

  [media[0]]: {
    padding: '12px', // 모바일 내부 여백 축소
    marginTop: '8px',
  },
});

const PopUpDetail = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  ['span']: {
    fontSize: '14px',
    color: theme.colors.grayscale100,
  },

  [media[0]]: {
    ['span']: {
      fontSize: '9px',
    },
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

  [media[0]]: {
    width: '20px', // 모바일 크기 축소
    height: '20px',
    fontSize: '12px',
  },
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

export { PopUpContainer, PopUpImage, PopUpDetailContainer, PopUpDetail, PopUpDetailNumber, ConfirmButton, Backdrop, CloseButton };
