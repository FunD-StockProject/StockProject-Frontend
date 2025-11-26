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
  gap: '24px',
  overflow: 'hidden auto',
});

const TutorialContent = styled.div({
  display: 'flex',
  flexShrink: '0',
  width: '100%',
  overflow: 'auto',
  scrollSnapType: 'x mandatory',
  padding: '0px 20px',
  gap: '24px',

  msOverflowStyle: 'none',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },
});

const TutorialItem = styled.div({
  flexShrink: '0',
  width: '100%',
  scrollSnapAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '56px',
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
  padding: '20px 0 0',
});

const TutorialItemTinderCard = styled.div({
  position: 'relative',
  width: '100%',
  boxSizing: 'border-box',
  maxWidth: '300px',
  display: 'flex',

  ['>img']: {
    position: 'relative',
    zIndex: '10',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0px 4px 40px 0px rgba(255, 255, 255, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    border: `1px solid ${theme.colors.sub_gray9}`,
  },
});

const TutorialItemTinderCardShadow1 = styled.div({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'calc(100% - 32px)',
  height: '100%',
  background: theme.colors.sub_black,
  borderRadius: '8px',
  boxShadow: '0px 4px 40px 0px rgba(255, 255, 255, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  border: `1px solid ${theme.colors.sub_gray9}`,
  bottom: '-16px',
  zIndex: '9',
});

const TutorialItemTinderCardShadow2 = styled.div({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'calc(100% - 64px)',
  height: '100%',
  background: theme.colors.sub_black,
  borderRadius: '8px',
  boxShadow: '0px 4px 40px 0px rgba(255, 255, 255, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  border: `1px solid ${theme.colors.sub_gray9}`,
  bottom: '-32px',
  zIndex: '8',
});

const TutorialItemSwipeHand = styled.img(
  ({ isLeft }: { isLeft?: boolean }) => ({
    left: isLeft ? '50%' : 'auto',
    right: isLeft ? 'auto' : '50%',
    transform: isLeft ? 'scaleX(1) translateX(-90%)' : 'scaleX(-1) translateX(-90%)',
  }),
  {
    width: '63%',
    bottom: '-10px',
    maxWidth: '250px',
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
  justifyContent: 'center',
  boxSizing: 'border-box',
  padding: '0px 20px 20px',

  ['>button']: {
    width: '100%',
    maxWidth: '300px',

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
  TutorialStep,
  TutorialItemContent,
  TutorialItemTinderCard,
  TutorialItemTinderCardShadow1,
  TutorialItemTinderCardShadow2,
  TutorialItemSwipeHand,
  TutorialItemCircleButtonContainer,
  ButtonContainer,
  TutorialTextContainer,
};
