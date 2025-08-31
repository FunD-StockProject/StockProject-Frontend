import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const NotificationContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const NotificationItemContainer = styled.div(
  ({ readStatus }: { readStatus: boolean }) => ({
    background: readStatus ? '' : theme.colors.sub_gray11,
  }),
  {
    padding: '16px 24px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
);

const NotificationItemImage = styled.div({
  width: '48px',
  height: 'auto',
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  background: theme.colors.sub_gray11,
  flexShrink: '0',
  display: 'flex',
  overflow: 'hidden',

  ['>img']: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const NotificationItemContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.body14Semibold,
      color: theme.colors.sub_white,
      display: 'flex',
      gap: '4px',
      justifyContent: 'space-between',

      ['>span']: {
        ...theme.font.detail12Medium,
        color: theme.colors.sub_gray6,
      },
    },
    ['&.content']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_white,
    },
    ['&.description']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

const AlarmExampleWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  height: 'calc(100vh - 60px)',

  ['>img']: {
    width: '200px',
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: '50%',
    border: `1px solid ${theme.colors.sub_gray10}`,
  },
});

const AlarmExampleTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',

  ['>p']: {
    margin: '0',
    textAlign: 'center',
    whiteSpace: 'nowrap',

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

const NoLoginWrapper = styled.div({
  position: 'fixed',
  top: '60px',
  left: '0',
  right: '0',
  bottom: '0',
  background: 'linear-gradient(rgba(16, 16, 16, 0.4) 0%, #101010 55%)',
  color: 'white',
  zIndex: '100',
  backdropFilter: 'blur(2.5px)',
  padding: '24px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
});

const NoLoginTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',

  ['>p']: {
    margin: '0',
    textAlign: 'center',
    whiteSpace: 'nowrap',

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

const NoLoginButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '20px',

  ['>button']: {
    padding: '10px 28px',
    borderRadius: '500px',
    border: 'none',
    ...theme.font.body18Semibold,

    ['&.primary']: {
      background: theme.colors.sub_white,
      color: theme.colors.sub_gray11,
    },
    ['&.secondary']: {
      background: theme.colors.sub_gray9,
      color: theme.colors.sub_gray5,
    },
  },
});

export {
  NotificationContainer,
  NotificationItemContainer,
  NotificationItemImage,
  NotificationItemContent,
  AlarmExampleWrapper,
  AlarmExampleTextContainer,
  NoLoginWrapper,
  NoLoginTextContainer,
  NoLoginButtonContainer,
};
