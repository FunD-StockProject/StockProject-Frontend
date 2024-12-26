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
    bottom: '-50px', // 컨테이너의 하단에서 20px 위로 배치
    right: '30px', // 오른쪽에서 왼쪽으로 60px 간격
    transform: 'none', // 중앙 정렬 보정 제거
    [media[0]]: {
      display: 'none',
    },
  },

  '& .react-horizontal-scrolling-menu--arrow-right': {
    position: 'absolute',
    bottom: '-50px', // 컨테이너의 하단에서 20px 위로 배치
    right: '0px', // 오른쪽에서 왼쪽으로 60px 간격
    transform: 'none', // 중앙 정렬 보정 제거
    [media[0]]: {
      display: 'none',
    },
  },
});

const ArrowButton = styled.img<{ disabled?: boolean }>(({ disabled }) => ({
  display: 'flex',
  userSelect: 'none',
  borderRadius: '6px',
  color: 'white',
  cursor: disabled ? 'not-allowed' : 'pointer', // 비활성화 시 커서 변경
  opacity: disabled ? 0.5 : 1, // 비활성화 시 투명도 낮춤
  filter: disabled ? 'grayscale(100%)' : 'none', // 비활성화 시 회색 필터 적용
  transition: 'opacity 0.2s, filter 0.2s', // 스타일 변경 시 애니메이션 추가
}));

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
  backgroundColor: isActive ? (name === 'RISING' ? theme.colors.red : theme.colors.primary30) : theme.colors.primary5,
  transition: 'background-color 0.3s ease',
  border: 'none',
  cursor: 'pointer',
  [media[0]]: {
    width: '5px',
    height: '5px',
    borderRadius: '50%', // 완전한 원
  },
}));

export { NoScrollbar, CardListItemContainer, ArrowButton, ItemButtonContainer, ItemButton, IndicatorContainer, Indicator };
