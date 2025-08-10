import styled from '@emotion/styled';
import { theme } from '@styles/themes';

// 추후에 반응형 수정

export const StyledMainlayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '100dvh',
  backgroundColor: theme.colors.grayscale100,
});

export const MainContent = styled.div({
  position: 'relative',
  overflow: 'auto',
  width: '100%',
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '72px',
});

export const BackButton = styled('img')({
  position: 'absolute',
  top: '20px',
  left: '20px',
  zIndex: 100,
  background: 'none',
  border: 'none',
  fontSize: '24px',
  width: '30px',
  height: '30px',
});
