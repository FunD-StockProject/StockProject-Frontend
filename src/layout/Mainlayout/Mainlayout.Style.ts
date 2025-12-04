import styled from '@emotion/styled';

// 추후에 반응형 수정

export const StyledMainlayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '100dvh',
  background: '#101010',
  maxWidth: '1280px',
});

export const MainContent = styled.div(
  ({ isNavActive }: { isNavActive: boolean }) => ({
    marginBottom: isNavActive ? '96px' : '0px',
  }),
  {
    position: 'relative',
    overflow: 'auto',
    width: '100%',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
  },
);

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
