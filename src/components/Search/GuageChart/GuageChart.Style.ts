import styled from '@emotion/styled';
import { theme } from '@styles/themes';
import BalloonMaskPNG from '@assets/mask_balloon.png';

const ARC_COLORS = [
  theme.colors.sub_blue9,
  theme.colors.sub_blue8,
  theme.colors.sub_blue7,
  theme.colors.sub_blue6,
  theme.colors.sub_blue5,
];

const GuageChartContainer = styled.div({
  height: 'auto',
  width: '100%',
  aspectRatio: '7 / 4',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
});

const GuageChartContentsInner = styled.div({
  position: 'absolute',
  bottom: '0',
  transform: 'translateY(50%)',
  width: '100%',
  height: 'auto',
  aspectRatio: '1 / 1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const GuageChartItem = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const GuageChartItemArc = styled.span(
  ({ index, selected }: { index: number; selected: boolean }) => ({
    width: selected ? '80%' : '75%',
    opacity: selected ? 1 : 0.5,
    filter: selected ? `drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))` : 'none',

    ['::after']: {
      background: `conic-gradient(from ${-90 + index * 36}deg, ${selected ? theme.colors.sub_blue6 : ARC_COLORS[index]} 0deg, ${selected ? theme.colors.sub_blue6 : ARC_COLORS[index]} 36deg, transparent 36deg),
      radial-gradient(circle at center, transparent 50%, transparent 50%)`,
    },
  }),
  {
    position: 'absolute',
    height: 'auto',
    aspectRatio: '1 / 1',

    ['::after']: {
      content: '""',
      display: 'block',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      mask: `radial-gradient(closest-side, transparent calc(40%), #000 0)`,
    },
  },
);

const GuageChartItemText = styled.span(
  ({ index, selected }: { index: number; selected: boolean }) => ({
    left: `calc(50% + sin(-90deg + ${index} * 36deg + 18deg) * ${selected ? 0.56 : 0.525} * 50%)`,
    top: `calc(50% - cos(-90deg + ${index} * 36deg + 18deg) * ${selected ? 0.56 : 0.525} * 50%)`,
    ...theme.font[selected ? 'body18Semibold' : 'body16Semibold'],
    opacity: selected ? 1 : 0.5,
  }),
  {
    position: 'absolute',
    transform: `translate(-50%, -50%)`,
    margin: '0px',
    color: theme.colors.sub_white,
  },
);

const GuageChartItemBalloon = styled.div(
  ({ index }: { index: number }) => ({
    left: `calc(50% + sin(-90deg + ${index} * 36deg + 18deg) * 0.65 * 50%)`,
    top: `calc(50% - cos(-90deg + ${index} * 36deg + 18deg) * 0.65 * 50%)`,
    transform: `translate(-50%, calc(${index === 2 ? -100 : index === 1 || index === 3 ? -105 : -115}%))`,
  }),
  {
    zIndex: '4',
    position: 'absolute',

    width: '30%',
    height: 'auto',
    aspectRatio: '5 / 4',
    display: 'flex',
    filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.25))',

    ['>img']: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      maskImage: `url(${BalloonMaskPNG})`,
      maskSize: '100% 100%',
    },
  },
);

const GuageChartItemScorePlaceholder = styled.p(
  ({ index }: { index: number }) => ({
    left: `calc(50% + sin(-90deg + ${index} * 36deg) * 0.8 * 50%)`,
    top: `calc(50% - cos(-90deg + ${index} * 36deg) * 0.8 * 50%)`,
    transform: `translate(${index < 2 ? -100 : index < 4 ? -50 : 0}%, -100%)`,
  }),
  {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 4px',
    color: theme.colors.sub_white,
    ...theme.font.body16Medium,
    opacity: '0.2',
    margin: '0',
  },
);

const GuageChartItemScore = styled.p({
  position: 'absolute',
  bottom: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.colors.sub_blue6,
  ...theme.font.title20Semibold,
  marginBottom: '4px',
});

export {
  GuageChartContainer,
  GuageChartContentsInner,
  GuageChartItem,
  GuageChartItemArc,
  GuageChartItemText,
  GuageChartItemBalloon,
  GuageChartItemScorePlaceholder,
  GuageChartItemScore,
};
