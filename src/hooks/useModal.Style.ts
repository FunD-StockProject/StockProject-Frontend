import styled from '@emotion/styled';

const ModalOverlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  padding: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  backdropFilter: 'blur(4px)',
});

export { ModalOverlay };
