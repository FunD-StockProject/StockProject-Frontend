import styled from '@emotion/styled';
import { media } from '@styles/themes';

const NoScrollbar = styled.div({
  borderRadius: '10px',
  position: 'relative',

  '& .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar': {
    display: 'none',
  },

  '& .react-horizontal-scrolling-menu--scroll-container': {
    scrollbarWidth: 'none',

    overflowX: 'auto',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
    [media[0]]: {
      gap: '12px',
    },

    width: '100%',
    height: 'auto',

    msOverflowStyle: 'none',
  },

  '& .react-horizontal-scrolling-menu--arrow-left': {
    position: 'absolute',
    top: '50%',
    left: '-50px',
    transform: 'translateY(-50%)',
    [media[0]]: {
      display: 'none',
    },
  },

  '& .react-horizontal-scrolling-menu--arrow-right': {
    position: 'absolute',
    top: '50%',
    right: '-50px',
    transform: 'translateY(-50%)',
    [media[0]]: {
      display: 'none',
    },
  },
});

const ArrowButton = styled.img<{ disabled: boolean }>((props) => ({
  cursor: props.disabled ? 'not-allowed' : 'pointer',
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
