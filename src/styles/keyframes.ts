import { keyframes } from '@emotion/react';

const pop = keyframes({
  ['from']: {
    transform: 'scale(0)',
  },
  ['50%']: {
    transform: 'scale(1.2)',
  },
  ['to%']: {
    transform: 'scale(1)',
  },
});

const popOut = keyframes`
  from {
    -webkit-transform: scale(1.0);
    transform: scale(1);
  }

  to {
    -webkit-transform: scale(0.0);
    transform: scale(0);
  }
`;

const slidein = keyframes`
  from {
    transform: translate3d(3000px, 0, 0);
  }

  10% {
  transform: translate3d(0, 0, 0);
  }
  
  90% {
  transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-3000px, 0, 0);
  }
`;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const marquee = keyframes`
  0%, 30% {
    left: 0;
    transform: translateX(0%);
  }

  70%, 100% {
    left: 100%;
    transform: translateX(-100%);
  }
`;

export { pop, popOut, slidein, bounce, marquee };
