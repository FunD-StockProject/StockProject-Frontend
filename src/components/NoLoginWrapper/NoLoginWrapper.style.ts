import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const Overlay = styled.div(
  ({ hasHeader, hasNavbar }: { hasHeader?: boolean; hasNavbar?: boolean }) => ({
    top: hasHeader ? '60px' : 0,
    bottom: hasNavbar ? '96px' : 0,
  }),
  {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    right: 0,
    zIndex: 50,
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    gap: '20px',
    maxWidth: '1280px',
    width: '100%',
    background: 'linear-gradient(180deg, rgba(16, 16, 16, 0.4) 0%, #101010 44.56%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    ['>div']: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto',
      overscrollBehavior: 'contain',
      padding: '100px 20px',
    },
  },
);

export const TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',

  ['>p']: {
    margin: '0',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_gray2,
    },

    ['&.description']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray4,
    },
  },
});

export const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  width: '220px',

  ['>button']: {
    ...theme.font.body18Semibold,
    appearance: 'none',
    border: 0,
    padding: '10px 28px',
    borderRadius: '999px',
    boxSizing: 'border-box',
    width: '100%',

    ['&.primary']: {
      color: theme.colors.sub_gray11,
      background: theme.colors.sub_white,
    },

    ['&.secondary']: {
      color: theme.colors.sub_gray5,
      background: theme.colors.sub_gray9,
    },
  },
});
