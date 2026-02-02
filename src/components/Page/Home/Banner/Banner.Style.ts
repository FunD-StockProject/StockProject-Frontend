// ad
import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const BannerContainer = styled.div({
  display: 'flex',
  overflow: 'auto',
  width: '100%',
  height: '240px',
  scrollSnapType: 'x mandatory',

  msOverflowStyle: 'none',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },
});

const BannerItemContainer = styled.div(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    background: backgroundColor,
  }),
  {
    position: 'relative',
    flexShrink: '0',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '24px 24px 18px',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    scrollSnapAlign: 'start',
  },
);

const BannerItemContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'flex-start',
});

const BannerItemTextGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.heading24Semibold,
      color: theme.colors.sub_white,
      whiteSpace: 'pre',
    },
    ['&.sub']: {
      ...theme.font.title20Medium,
      color: theme.colors.sub_white,
    },
  },
});

const BannerItemButton = styled.button({
  ...theme.font.body14Medium,
  color: theme.colors.sub_white,
  borderRadius: '999px',
  padding: '6px 12px',
  background: `${theme.colors.sub_white}1f`,
  border: `1px solid ${theme.colors.sub_white}1a`,
  backdropFilter: 'blur(10px)',
});

const BannerItemIndex = styled.p({
  ...theme.font.body16Medium,
  color: theme.colors.sub_gray5,
  margin: '0px',

  ['>b']: {
    ...theme.font.body16Semibold,
    color: theme.colors.sub_white,
  },
});

const BannerItemDecoration = styled.span({
  position: 'absolute',

  [':nth-of-type(1)']: {
    bottom: '0px',
    left: '0px',
    width: '100%',
    height: '57px',
    background: `rgba(255, 255, 255, 0.05)`,
  },

  [':nth-of-type(2)']: {
    top: '0px',
    right: '0px',
    height: '100%',
    width: '57px',
    background: `rgba(255, 255, 255, 0.05)`,
  },

  [':nth-of-type(3)']: {
    top: '0px',
    right: '0px',
    height: '100%',
    width: '188.5px',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderWidth: '0px 0px 240px 131.5px',
    borderColor: 'transparent transparent rgba(255, 255, 255, 0.05) transparent ',
  },
});

export {
  BannerContainer,
  BannerItemContainer,
  BannerItemContent,
  BannerItemTextGroup,
  BannerItemButton,
  BannerItemIndex,
  BannerItemDecoration,
};
