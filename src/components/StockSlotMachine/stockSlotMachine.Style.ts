import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { media, theme } from '../../styles/themes';

const ScoreSlotMachineContainer = styled.div({
  display: 'flex',
  margin: '0 18px',
  padding: '32px',
  background: theme.colors.grayscale100,
  borderRadius: '24px',
  gap: '24px',
  [media[0]]: {
    margin: '0 8px',
    padding: '12px',
    borderRadius: '12px',
    gap: '12px',
  },
});

const SlotMachineItemContainer = styled.div({
  backgroundColor: theme.colors.grayscale90,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxHeight: '240px',
  // border: '2px solid ' + theme.colors.grayscale40,
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

const SlotMachineItemMotionDiv = styled(motion.div)({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export { ScoreSlotMachineContainer, SlotMachineItemContainer, SlotMachineItemMotionDiv };
