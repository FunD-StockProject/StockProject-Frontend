import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const BannerContainer = styled.div({
  position: 'relative',
  display: 'flex',
  overflow: 'auto',
  width: '393px',
  maxWidth: '100%',
  height: '236px',
  scrollSnapType: 'x mandatory',

  msOverflowStyle: 'none',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },
});

const BannerItemContainer = styled.button({
  position: 'relative',
  flexShrink: '0',
  width: '100%',
  height: '100%',
  padding: '0px',
  border: 'none',
  background: 'transparent',
  overflow: 'hidden',
  scrollSnapAlign: 'start',
  cursor: 'pointer',
});

const BannerItemImage = styled.img({
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  userSelect: 'none',
  pointerEvents: 'none',
});

const BannerItemIndex = styled.p({
  ...theme.font.body16Medium,
  color: theme.colors.sub_gray5,
  margin: '0px',
  position: 'absolute',
  left: '35px',
  top: '187px',
  zIndex: '2',
  pointerEvents: 'none',
  textShadow: '0px 0px 6px rgba(0, 0, 0, 0.3)',

  ['>b']: {
    ...theme.font.body16Semibold,
    color: theme.colors.sub_white,
  },

  ['&.dark']: {
    color: '#9A9C9E',
    textShadow: 'none',

    ['>b']: {
      color: '#9A9C9E',
    },
  },
});

export { BannerContainer, BannerItemContainer, BannerItemImage, BannerItemIndex };
