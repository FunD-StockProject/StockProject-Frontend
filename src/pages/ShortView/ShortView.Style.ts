import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const WrapperStyle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  background: theme.colors.primary50,
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
});

interface CardStyleProps {
  isVisible: boolean;
  isCurrent: boolean;
}

export const CardStyle = styled.div<CardStyleProps>(({ isVisible, isCurrent }) => ({
  width: '100%',
  maxWidth: '480px',
  // height: 'calc(100vh - 68px - 64px)',
  padding: '20px',
  boxSizing: 'border-box',
  border: '1px solid #888',
  backgroundColor: '#000',
  display: isVisible ? 'flex' : 'none',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  right: 0,
  transition: isCurrent ? 'transform 0.3s ease-in-out' : 'none',
  willChange: 'transform, opacity',
  opacity: isVisible ? 1 : 0,
  pointerEvents: isCurrent ? 'auto' : 'none',
  transform: isCurrent ? 'translate(-50%, 0%) scale(1)' : 'translate(-50%, 0%) scale(0.97)',
}));

export const LogoStyle = styled.div({
  width: '100%',
  textAlign: 'center',
  fontSize: '12px',
  fontWeight: 'normal',
  borderBottom: '1px solid #666',
  paddingBottom: '6px',
  color: '#ccc',
});

export const TitleStyle = styled.h2({
  marginTop: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  alignSelf: 'flex-start',
  marginBottom: '8px',
});

export const PriceWrapperStyle = styled.div({
  alignSelf: 'flex-start',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  border: '1px solid #aaa',
  borderRadius: '10px',
  backgroundColor: '#111',
  color: '#fff',
  marginTop: '0px',
});

export const ImagePlaceholderStyle = styled.div({
  width: '100%',
  height: '160px',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#999',
  fontSize: '14px',
});

export const ScoreStyle = styled.div({
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  gap: '6px',
  alignSelf: 'flex-start',
});

export const CategoryTagListStyle = styled.div({
  display: 'flex',
  gap: '16px',
  alignSelf: 'flex-start',
});

export const CategoryTagItemStyle = styled.div({
  border: '1px solid #FFF',
  borderRadius: '16px',
  padding: '10px 12px'
});

export const ButtonGroupStyle = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',

  button: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
});

export const IconButtonGroupStyle = styled.div({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  marginTop: '16px',
  touchAction: 'manipulation',

  button: {
    border: 'none',
    background: 'transparent',
    fontSize: '12px',
    color: 'white',
    cursor: 'pointer',
  },
});

export const ToastStyle = styled.div({
  marginTop: '20px',
  padding: '8px 16px',
  background: '#333',
  color: 'white',
  borderRadius: '6px',
  zIndex: '1000',
});

export const EndMessageStyle = styled.div({
  fontSize: '16px',
  marginTop: '40px',
  color: '#666',
});