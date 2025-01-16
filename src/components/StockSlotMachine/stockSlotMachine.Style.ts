import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { media, theme } from '@styles/themes';

const ScoreSlotMachineContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: '700',
    lineHeight: '1',
    gap: '24px',

    [media[0]]: {
      gap: '13px',
      marginBottom: '0.5em',
    },
    [':hover > div > div']: {
      backgroundColor: theme.colors.grayscale90,
    },
  },
  ({ active }: { active?: boolean }) => active && { cursor: 'pointer' },
);

const ScoreSlotMachineTitle = styled.span({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
  fontSize: '24px',
  [media[0]]: {
    fontSize: '17px',
  },
});

const ScoreSlotMachineContent = styled.div({
  display: 'flex',
  gap: '12px',
  [media[0]]: {
    gap: '12px',
  },
});

const SlotMachineItemContainer = styled.div({
  backgroundColor: theme.colors.grayscale100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  height: '320px',

  [media[0]]: {
    height: '100px',
    borderRadius: '8px',
  },
});

const SlotMachineItemMotionDiv = styled(motion.div)({
  fontSize: '72px',
  color: theme.colors.primary0,
  fontWeight: '700',
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ['img']: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  [media[0]]: {
    fontSize: '24px',
  },
});

const StockCardItemScore = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.colors.primary0,

  fontSize: '1.0em',
  gap: '0.25em',
});
const StockCardItemDeltaScore = styled.div(({ delta }: { delta: number }) => ({
  display: 'flex',
  alignItems: 'center',

  fontSize: '0.8em',
  gap: '4px',
  color: deltaScoreToColor(delta),
  padding: '0 0.4em',

  ['svg']: {
    height: '0.5em',
    width: 'auto',
    fill: deltaScoreToColor(delta),
  },
}));
export {
  ScoreSlotMachineContainer,
  SlotMachineItemContainer,
  ScoreSlotMachineContent,
  SlotMachineItemMotionDiv,
  ScoreSlotMachineTitle,
  StockCardItemScore,
  StockCardItemDeltaScore,
};
