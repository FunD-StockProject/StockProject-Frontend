import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const MarqueeContainer = styled.div({
  position: 'relative',
  overflow: 'hidden',
  whiteSpace: 'nowrap',

  ['>div.hidden']: {
    visibility: 'hidden',
  },
});

const MarqueeContent = styled(motion.div)({
  willChange: 'transform',
  position: 'absolute',
  top: 0,
  left: 0,
});

export { MarqueeContainer, MarqueeContent };
