import styled from '@emotion/styled';

const NoScrollbar = styled.div({
  padding: '10px',
  borderRadius: '10px',
  position: 'relative',

  '& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar': {
    display: 'none',
  },
  '& .react-horizontal-scrolling-menu--scroll-container': {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    width: '100%',
    height: 'auto',
    overflowX: 'auto',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'row',
  },
  '& .react-horizontal-scrolling-menu--arrow-left': {
    position: 'absolute',
    top: '50%',
    left: '-40px',
  },
  '& .react-horizontal-scrolling-menu--arrow-right': {
    position: 'absolute',
    top: '50%',
    right: '-40px',
  },
});

const ArrowButton = styled.img<{ disabled: boolean }>((props) => ({
  cursor: 'pointer',
  display: 'flex',
  margin: '0 5px', // 좌우 간격 조정
  opacity: props.disabled ? 0 : 1, // props로 opacity 설정
  userSelect: 'none',
  borderRadius: '6px',
  borderWidth: '1px',
  padding: '5px', // 버튼 크기 조정
  backgroundColor: '#2e2e2e', // 버튼 색상
  color: 'white',
}));

export { NoScrollbar, ArrowButton };
