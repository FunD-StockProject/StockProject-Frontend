import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const ToastContent = styled.div({
  background: `${theme.colors.sub_blue6}CC`,
  display: 'flex',
  alignItems: 'center',
  borderRadius: '5px',
  border: '1px solid rgba(73, 80, 87, 0.5)',
  boxSizing: 'border-box',
  backdropFilter: 'blur(5px)',
  boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.5)',
  gap: '10px',
  width: '100%',
  padding: '12px 16px',

  ['>svg']: {
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_white,
  },

  ['>p']: {
    margin: '0',
    ...theme.font.detail12Semibold,
    color: theme.colors.sub_gray2,

    ['&.cancel']: {
      color: theme.colors.sub_gray5,
      textDecoration: 'underline',
      marginLeft: 'auto',
      cursor: 'pointer',
    },
  },
});

const ToastContainer = styled.div(
  ({ closing }: { closing: boolean }) => ({
    opacity: closing ? 0 : 1,
  }),
  {
    transition: 'opacity 0.3s ease-in-out',
    position: 'fixed',
    bottom: '0px',
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '1280px',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #101010 81.02%)',
    width: '100%',
    zIndex: '1000',
    padding: '96px 20px',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
);

export { ToastContent, ToastContainer };
