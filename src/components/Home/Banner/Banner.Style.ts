// ad
import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const HomeAdContainer = styled.div({
  display: 'flex',
  overflow: 'auto',
  width: '100%',
  height: '240px',
  scrollSnapType: 'x mandatory',
});

const HomeAdItem = styled.div({
  position: 'relative',
  flexShrink: '0',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '24px 24px 18px',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  background: `#3457FD`,
  scrollSnapAlign: 'start',

  ['>span']: {
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
  },
});

const HomeAdItemContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'flex-start',
});

const HomeAdItemTitle = styled.p({
  ...theme.font.heading24Semibold,
  color: theme.colors.sub_white,
  margin: '0px',
});

const HomeAdItemDescription = styled.p({
  ...theme.font.title20Medium,
  color: theme.colors.sub_white,
  margin: '0px',
});

const HomeAdItemButton = styled.button({
  ...theme.font.body14Medium,
  color: theme.colors.sub_white,
  borderRadius: '999px',
  padding: '6px 12px 6px 12px',
  background: 'rgba(255, 255, 255, 0.12)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
});

const HomeAdItemIndex = styled.p({
  ...theme.font.body16Medium,
  color: theme.colors.sub_gray5,
  margin: '0px',

  ['>b']: {
    ...theme.font.body16Semibold,
    color: theme.colors.sub_white,
  },
});

export {
  HomeAdContainer,
  HomeAdItem,
  HomeAdItemContent,
  HomeAdItemTitle,
  HomeAdItemDescription,
  HomeAdItemButton,
  HomeAdItemIndex,
};
