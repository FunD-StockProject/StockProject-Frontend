import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/themes';

const SlotMachineItemContainer = styled.div({
  backgroundColor: theme.colors.grayscale90,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxHeight: '240px',
  border: '2px solid ' + theme.colors.grayscale40,
  borderRadius: '18px',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

const SlotMachineItemMotionDiv = styled(motion.div)({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export { SlotMachineItemContainer, SlotMachineItemMotionDiv };
