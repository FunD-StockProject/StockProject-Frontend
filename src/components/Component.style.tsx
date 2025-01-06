import styled from '@emotion/styled';
import { media } from '@styles/themes';

const Container = styled.div({
  display: 'flex',
  boxSizing: 'border-box',
  width: '100%',
  height: '400px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '16px',

  [media[0]]: {
    height: '200px',
    ['svg']: {
      width: '30%',
    },
  },
});

export { Container };
