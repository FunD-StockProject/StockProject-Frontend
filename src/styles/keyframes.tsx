import { keyframes } from '@emotion/react';

const pop = keyframes`
  from {
    -webkit-transform: scale(0.0);
    transform: scale(0);
  }

  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  to {
    -webkit-transform: scale(1.0);
    transform: scale(1);
  }
`;

const slidein = keyframes`
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
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

export { pop, slidein, bounce };
