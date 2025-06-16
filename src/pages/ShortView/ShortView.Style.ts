import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const WrapperStyle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '80vh',
  background: theme.colors.primary50,
  margin: '0 auto',
});

export const CardWrapperStyle = styled.div({
  position: 'relative',
  width: '100%',
  maxWidth: '480px',
  height: '100%',
  margin: '0 auto',
});

export const CardStyle = styled.div({
  width: '100%',
  maxWidth: '480px',
  padding: '20px',
  boxSizing: 'border-box',
  border: '1px solid #888',
  backgroundColor: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  position: 'absolute', // ensure absolutely positioned for stacking
  top: 0,
  left: 0,
  right: 0,
  transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out',
  willChange: 'transform, opacity',
  opacity: 1,
});

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