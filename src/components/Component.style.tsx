import styled from '@emotion/styled';

const Container = styled.div({
  display: 'flex',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '16px',
  padding: '15%',

  ['svg']: {
    width: '100%',
  },
});

export { Container };
