import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const PWAInfoContainer = styled.div({
  display: 'flex',
  position: 'fixed',
  bottom: 'env(safe-area-inset-bottom, 0)', // Use safe-area to avoid iOS nav bar overlap
  borderRadius: '12px 12px 0 0',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  background: theme.colors.primary0,
  width: '100%',
  flexDirection: 'column',
  color: 'black',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  paddingBottom: 'calc(env(safe-area-inset-bottom, 0) + 10px)', // Add some padding from the safe area
});

const DetailContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'flex-start',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '15px',
  padding: '30px',
});

const TextArea = styled('div')({
  flexDirection: 'row',
  gap: '15px',
});

const HeaderText = styled('h2')({});

const NormalText = styled('div')({
  fontWeight: 500,
});

const ButtonContainer = styled('div')({
  display: 'flex',
  padding: '0 30px 30px 30px',
  justifyContent: 'center',
  gap: '20px',
  fontStyle: 'normal',
});

const StyledButton = styled('button')({
  fontSize: '15px',
  lineHeight: 1.5,
  width: '160px',
  borderRadius: '8px',
  padding: '16px',
  fontFamily: 'Pretendard',
  fontWeight: 700,
});

const Close24HourButton = styled(StyledButton)({
  backgroundColor: theme.colors.primary0,
  color: theme.colors.grayscale90,
  border: `1px solid ${theme.colors.grayscale10}`,
});

const ConfirmButton = styled(StyledButton)({
  backgroundColor: theme.colors.primary50,
  color: theme.colors.grayscale5,
  border: 'none',
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
  bottom: '100%',
  right: '0px',
  background: 'none',
  border: 'none',
  fontSize: '30px',
  cursor: 'pointer',
  color: theme.colors.primary0,
});

export {
  PWAInfoContainer,
  DetailContainer,
  HeaderText,
  NormalText,
  TextArea,
  ButtonContainer,
  Close24HourButton,
  ConfirmButton,
  Backdrop,
  CloseButton,
};
