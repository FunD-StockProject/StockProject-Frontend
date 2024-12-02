import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const CardListItemContainer = styled.div((props: { width: number }) => ({
  width: props.width ?? 0,
}));

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

const ArrowButton = styled.img(
  {
    display: 'flex',
    margin: '0 5px', // 좌우 간격 조정
    userSelect: 'none',
    padding: '5px', // 버튼 크기 조정
    borderRadius: '6px',
    backgroundColor: theme.colors.grayscale80, // 버튼 색상
    color: 'white',
    [':hover']: {
      backgroundColor: theme.colors.primary50, // 버튼 색상
    },
  },
  (props: { disabled: boolean }) => ({
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    display: props.disabled ? 'none' : '',
  }),
);

const HotItemButtonContainer = styled.div({
  display: 'flex',
  marginTop: '12px',
  gap: '8px',
  width: '100%',
});

const HotItemButton = styled.button({
  borderRadius: '32px',
  backgroundColor: 'black',
  padding: '0.2em 0.4em',
  color: 'white',
  flex: 1,
});

export { NoScrollbar, CardListItemContainer, ArrowButton, HotItemButtonContainer, HotItemButton };
