import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const TutorialContainer = styled.div({
  width: '100%',
  height: '100%',
  position: 'fixed',
  background: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(4px)',
  zIndex: '1000',
  top: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    overflow: 'auto',
    overscrollBehavior: 'contain',
    padding: '20px',
    flexGrow: 1,
    justifyContent: 'center',
  },
});

const TutorialContent = styled.div({
  display: 'flex',
  flexShrink: '0',
  overflow: 'auto',
  scrollSnapType: 'x mandatory',
  gap: '24px',
  flexGrow: 1,
  maxHeight: '560px',

  msOverflowStyle: 'none',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },
});

const TutorialContentSlideButtonContainer = styled.div({
  position: 'absolute',
  height: '100px',
  left: '50%',
  bottom: '55%',
  transform: 'translateX(-50%)',
  width: '480px',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: '10',

  ['@media (max-width: 480px)']: {
    display: 'none',
  },

  ['>svg']: {
    width: '48px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',

    ['&.left']: {
      transform: 'scaleX(-1)',
    },
    ['&.right']: {
      transform: 'scaleX(1)',
    },
  },
});

const TutorialItem = styled.div({
  flexShrink: '0',
  width: '100%',
  scrollSnapAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
  padding: '0px 20px',
  boxSizing: 'border-box',
});

const TutorialStep = styled.div({
  display: 'flex',
  gap: '10px',

  ['>span']: {
    width: '8px',
    height: '8px',
    background: theme.colors.sub_gray4,
    borderRadius: '50%',
    opacity: '0.3',

    ['&.current']: {
      background: theme.colors.sub_blue6,
      opacity: '1',
    },
  },
});

const TutorialItemContent = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
  flexGrow: 1,
});

const TutorialItemTinderCard = styled.div({
  position: 'absolute',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  ['>img:first-of-type']: {
    position: 'relative',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0px 4px 40px 0px rgba(255, 255, 255, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    border: `1px solid ${theme.colors.sub_gray9}`,
    boxSizing: 'border-box',
    zIndex: '10',
  },
});

const TutorialItemTinderCardShadow = styled.span({
  position: 'absolute',
  height: '100%',
  background: theme.colors.sub_black,
  borderRadius: '8px',
  boxShadow: '0px 4px 40px 0px rgba(255, 255, 255, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  border: `1px solid ${theme.colors.sub_gray9}`,
  boxSizing: 'border-box',

  ['&:nth-of-type(1)']: {
    bottom: '-12px',
    width: '90%',
    zIndex: '9',
  },
  ['&:nth-of-type(2)']: {
    bottom: '-24px',
    width: '80%',
    zIndex: '8',
  },
});

const TutorialItemSwipeHand = styled.img(
  ({ isLeft }: { isLeft?: boolean }) => ({
    left: isLeft ? '40%' : 'auto',
    right: isLeft ? 'auto' : '40%',
    transform: isLeft ? 'scaleX(1) translateX(-90%)' : 'scaleX(-1) translateX(-90%)',
  }),
  {
    width: '75%',
    bottom: '0px',
    position: 'absolute',
    objectFit: 'contain',
    zIndex: '10',
  },
);

const TutorialItemCircleButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'center',
  position: 'absolute',

  bottom: '0px',
  transform: 'translateY(50%)',
  zIndex: '11',

  padding: '18px',
  borderRadius: '50%',

  ['>svg']: {
    width: '28px',
    height: '28px',
  },

  ['>span']: {
    position: 'absolute',
    bottom: 'calc(100% + 18px)',
    ...theme.font.detail10Medium,
    color: theme.colors.sub_white,
    padding: '4px 10px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',

    ['::before']: {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0',
      height: '0',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
    },
  },

  ['&.money']: {
    background: theme.colors.sub_blue6,

    ['>svg']: {
      fill: theme.colors.sub_white,
    },

    ['>span']: {
      background: theme.colors.sub_blue6,

      ['::before']: {
        borderTop: `8px solid ${theme.colors.sub_blue6}`,
      },
    },
  },

  ['&.cross']: {
    background: theme.colors.sub_gray10,

    ['>svg']: {
      fill: theme.colors.sub_gray5,
    },

    ['>span']: {
      background: theme.colors.sub_gray8,

      ['::before']: {
        borderTop: `8px solid ${theme.colors.sub_gray8}`,
      },
    },
  },
});

const ButtonContainer = styled.div({
  width: '100%',
  display: 'flex',
  boxSizing: 'border-box',
  padding: '0px 20px',
  justifyContent: 'center',
  maxWidth: '300px',

  ['>button']: {
    width: '100dvw',

    transition: 'opacity 0.3s ease-in-out',

    [':disabled']: {
      opacity: '0',
    },
  },
});

const TutorialTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'center',

  ['>p']: {
    margin: '0px',
    textAlign: 'center',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_white,
    },

    ['&.description']: {
      ...theme.font.body14Regular,
      color: theme.colors.sub_gray4,
      whiteSpace: 'pre',
    },
  },
});

export {
  TutorialContainer,
  TutorialContent,
  TutorialItem,
  TutorialItemTinderCardShadow,
  TutorialStep,
  TutorialItemContent,
  TutorialItemTinderCard,
  TutorialItemSwipeHand,
  TutorialItemCircleButtonContainer,
  ButtonContainer,
  TutorialTextContainer,
  TutorialContentSlideButtonContainer,
};
