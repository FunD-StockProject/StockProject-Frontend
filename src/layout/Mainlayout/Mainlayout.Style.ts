import styled from '@emotion/styled';

// 추후에 반응형 수정

const StyledMainlayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '100dvh',
  background: '#101010',
  maxWidth: '1280px',
});

const MainContent = styled.div(
  ({ isNavActive }: { isNavActive: boolean }) => ({
    marginBottom: isNavActive ? '96px' : '0px',
  }),
  {
    position: 'relative',
    width: '100%',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
  },
);

export { StyledMainlayout, MainContent };
