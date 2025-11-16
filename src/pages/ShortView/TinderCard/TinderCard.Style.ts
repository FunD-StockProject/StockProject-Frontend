import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const TinderCardItemContainer = styled.div(
  ({
    isTop,
    active,
    cardX,
    cardRotate,
    cardScale,
  }: {
    isTop: boolean;
    active: boolean;
    cardX: number;
    cardRotate: number;
    cardScale: string;
  }) => ({
    zIndex: isTop ? '1' : 'auto',
    boxShadow: isTop ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 50px 0px rgba(255, 255, 255, 0.12)' : 'none',
    transform: `translate3d(${cardX}px, 0, 0) rotate(${cardRotate}deg)`,
    scale: cardScale,
    transition: `box-shadow 0.2s ease-in-out, scale 0.1s ease-in-out${!active ? ', transform 0.2s ease-in-out' : ''}`,
  }),
  {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: `1px solid ${theme.colors.sub_gray11}`,
    borderRadius: '10px',
    background: theme.colors.sub_black,
  },
);

const TinderCardItemInfo = styled.div({
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '20px 8px 20px 20px',
  boxSizing: 'border-box',
  alignItems: 'flex-start',
});

const TinderCardItemInfoTitle = styled.div({
  display: 'flex',
  gap: '10px',
  padding: '4px 6px',
  borderRadius: '10px',
  backdropFilter: 'blur(4px)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
  boxSizing: 'border-box',

  ['>img']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '999px',
  },

  ['>p']: {
    margin: '0',
    ...theme.font.heading24Semibold,
    color: theme.colors.sub_white,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const TinderCardItemInfoContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 6px',
  width: '100%',
  boxSizing: 'border-box',
});

const TinderCardItemInfoValueContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'flex-start',
});

const TinderCardItemInfoValueContents = styled.span(
  ({ delta }: { delta: number }) => ({
    ['>span']: {
      color: delta > 0 ? theme.colors.sub_red : theme.colors.sub_blue5,
    },

    ['>svg']: {
      fill: delta > 0 ? theme.colors.sub_red : theme.colors.sub_blue5,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',

    ...theme.font.body14Medium,
    color: theme.colors.sub_white,

    background: 'rgba(255, 255, 255, 0.1)',
    padding: '4px 10px',
    borderRadius: '999px',

    ['>svg']: {
      width: 'auto',
    },
  },
);

const TinderCardItemInfoExtraContainer = styled.span({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
});

const TinderCardItemInfoTagsContainer = styled.div({
  display: 'flex',
  gap: '6px',
  flexGrow: '1',
  overflow: 'hidden',
});

const TinderCardItemInfoTag = styled.p({
  margin: '0',
  ...theme.font.body14Medium,
  color: theme.colors.sub_gray5,
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '4px 10px',
  borderRadius: '999px',
  whiteSpace: 'nowrap',
});

const TinderCardItemInfoAboutButton = styled.div({
  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray6,
    borderRadius: '999px',

    padding: '12px',
    background: theme.colors.sub_gray11,
  },
});

const TinderCardChartContainer = styled.div({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  padding: '18px 10px',
  paddingBottom: '48px',
  boxSizing: 'border-box',
  mask: 'linear-gradient(to top, transparent 90px, #000 270px, #000 100%)',
});

export {
  TinderCardItemContainer,
  TinderCardItemInfo,
  TinderCardItemInfoTitle,
  TinderCardItemInfoContents,
  TinderCardItemInfoValueContainer,
  TinderCardItemInfoValueContents,
  TinderCardItemInfoExtraContainer,
  TinderCardItemInfoTagsContainer,
  TinderCardItemInfoTag,
  TinderCardItemInfoAboutButton,
  TinderCardChartContainer,
};
