import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { media, theme } from '@styles/themes';

const ScoreSlotMachineContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
    background: theme.colors.grayscale100,
    borderRadius: '24px',
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '1',
    gap: '21px',

    [media[0]]: {
      fontSize: '17px',
      padding: '12px',
      borderRadius: '12px',
      gap: '13px',
      marginBottom: '0.5em',
    },
  },
  ({ active }: { active?: boolean }) => active && { cursor: 'pointer' },
);

const SlotMachineItemContainer = styled.div({
  backgroundColor: theme.colors.grayscale90,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxHeight: '240px',
  border: `1px solid ${theme.colors.grayscale40}`,
  borderRadius: '16px',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  height: '240px',

  [media[0]]: {
    height: '80px',
    borderRadius: '8px',
  },
});

const ScoreSlotMachineContent = styled.div({
  display: 'flex',
  gap: '24px',
  [media[0]]: {
    gap: '12px',
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

const StockCardItemText = styled.div({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
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
  StockCardItemText,
  StockCardItemScore,
  StockCardItemDeltaScore,
};
