import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const CardListItemContainer = styled.div((props: { width?: number }) => ({
  width: props.width ?? '100%',
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
  // (props: { disabled: boolean }) => ({
  //   cursor: props.disabled ? 'not-allowed' : 'pointer',
  //   display: props.disabled ? 'none' : '',
  // }),
);

const ItemButtonContainer = styled.div({
  display: 'flex',
  marginTop: '12px',
  gap: '24px',
  width: '100%',
});

const ItemButton = styled.button({
  borderRadius: '32px',
  backgroundColor: 'black',
  border: `solid 2px ${theme.colors.grayscale50}`,
  padding: '0.5em 1em',
  color: 'white',
  flex: 1,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  cursor: 'pointer',
});

const IndicatorContainer = styled.div({
  display: 'flex',
  position: 'absolute',
  bottom: '100%',
  right: '-40px',
  gap: '8px',
  alignItems: 'center',
  borderRadius: '10px',
  margin: '0 0 40px 0',
  [media[0]]: {
    margin: '0 0 20px 0',
    right: '0px',
    gap: '4px',
  },
});

const Indicator = styled.div(({ isActive, name }: { isActive: boolean; name: string }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%', // 완전한 원
  backgroundColor: isActive ? (name === 'RISING' ? '#FD4821' : theme.colors.primary30) : theme.colors.primary5,
  transition: 'background-color 0.3s ease',
  border: 'none',
  cursor: 'pointer',
  [media[0]]: {
    width: '5px',
    height: '5px',
    borderRadius: '50%', // 완전한 원
  },
}));

export {
  NoScrollbar,
  CardListItemContainer,
  ArrowButton,
  ItemButtonContainer,
  ItemButton,
  IndicatorContainer,
  Indicator,
};
