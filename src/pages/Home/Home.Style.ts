import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

const HomeContainer = styled.div({
  width: '100%',
  marginBottom: 'auto',
  background: theme.colors.primary100,
});

// header

const HomeHeaderContainer = styled.div({
  display: 'flex',
  padding: '8px 20px',
  width: '100%',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  alignItems: 'center',

  ['>svg']: {
    width: '100px',
    height: 'auto',
    fill: theme.colors.sub_white,
  },
});

const HomeHeaderButtonContainer = styled.div({
  display: 'flex',
  gap: '10px',

  ['>svg']: {
    width: '36px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: theme.colors.sub_gray7,
  },
});

// tabMenu

const HomeTabMenuContainer = styled.div({
  display: 'flex',
  gap: '4px',
  padding: '0 20px',
});

const HomeTabMenuLabel = styled.label({
  width: '92px',

  ['>input']: {
    display: 'none',
  },

  ['>.tab_text']: {
    ...theme.font.body18Semibold,
    color: theme.colors.sub_gray7,
    margin: '0px',

    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    justifyContent: 'center',
    alignItems: 'center',

    ['::after']: {
      content: '""',
      display: 'block',
      width: '100%',
      height: '2px',
    },
  },

  ['> input[type="radio"]:checked']: {
    ['~.tab_text']: {
      color: theme.colors.sub_gray1,
      ['::after']: {
        background: theme.colors.sub_gray1,
      },
    },
  },
});

// ad

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

const HomeContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '1280px',
  height: '100%',
  margin: '0 auto',
  padding: '90px 60px',

  [media[0]]: {
    gap: '52px',
    padding: '28px 0px 52px',
  },
});

const StyledSpan = styled.span((props: { color?: themeColor }) => ({
  color: props.color ? theme.colors[props.color] : '#000000',
}));

const StyledText = styled.div({
  margin: '0px 4px',

  color: theme.colors.grayscale60,
  fontWeight: '500',
  fontSize: '15px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  lineHeight: '1.5',

  [media[0]]: {
    margin: '-10px 4px',

    fontSize: '11px',
  },
});

export {
  HomeContainer,
  HomeHeaderContainer,
  HomeHeaderButtonContainer,
  HomeTabMenuContainer,
  HomeTabMenuLabel,
  HomeAdContainer,
  HomeAdItem,
  HomeAdItemContent,
  HomeAdItemTitle,
  HomeAdItemDescription,
  HomeAdItemButton,
  HomeAdItemIndex,
  HomeContents,
  StyledSpan,
  StyledText,
};
