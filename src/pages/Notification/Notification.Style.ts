import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const NotificationContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const NotificationItemContainer = styled.div(
  ({ readStatus }: { readStatus: boolean }) => ({
    background: readStatus ? '' : theme.colors.sub_gray10,
    opacity: readStatus ? 0.4 : 1,
  }),
  {
    padding: '16px 24px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',

    ['>img']: {
      width: '48px',
      height: 'auto',
      objectFit: 'cover',
      aspectRatio: '1 / 1',
      borderRadius: '50%',
      overflow: 'hidden',
      background: theme.colors.sub_gray11,
    },
  },
);

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

export {
  NotificationContainer,
  NotificationItemContainer,
  NotificationItemContent,
  AlarmExampleWrapper,
  AlarmExampleTextContainer,
};
