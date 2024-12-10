import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '400px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '16px',
  backgroundColor: theme.colors.grayscale100,
});

export { Container };
