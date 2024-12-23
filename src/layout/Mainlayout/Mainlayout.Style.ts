import styled from '@emotion/styled';
import { theme } from '@styles/themes';

// 추후에 반응형 수정

const StyledMainlayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '100vh',
  backgroundColor: theme.colors.grayscale100,
});

export { StyledMainlayout };
