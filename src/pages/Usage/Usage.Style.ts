import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const UsageContainer = styled('div')({
  position: 'relative',
  height: '100vh',
  padding: '30px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  background: theme.colors.primary100,
});

const BackButton = styled('img')({
  position: 'absolute',
  top: '16px',
  left: '16px',
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
});

export { UsageContainer, BackButton };
