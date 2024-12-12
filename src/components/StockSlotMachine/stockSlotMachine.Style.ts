import styled from '@emotion/styled';
import { motion } from 'framer-motion';
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
    },
  },
  ({ active }: { active?: boolean }) => active && { cursor: 'pointer' },
);

const SlotMachineItemContainer = styled.div(
  // (props) => ({
  //   backgroundColor: props.theme.colors.grayscale90,
  // }),
  {
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
  },
);

const ScoreSlotMachineContent = styled.div({
  display: 'flex',
  gap: '24px',
  [media[0]]: {
    gap: '12px',
  },
});

const SlotMachineItemMotionDiv = styled(motion.div)(
  ({ slotMachineType }: { slotMachineType: 'TITLE' | 'IMAGE' | 'SCORE' }) =>
    slotMachineType == 'TITLE'
      ? {
          fontSize: '72px',
          [media[0]]: {
            fontSize: '24px',
          },
        }
      : slotMachineType == 'SCORE'
        ? {
            fontSize: '96px',
            [media[0]]: {
              fontSize: '32px',
            },
          }
        : {},
  {
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
  },
);

export { ScoreSlotMachineContainer, SlotMachineItemContainer, ScoreSlotMachineContent, SlotMachineItemMotionDiv };
