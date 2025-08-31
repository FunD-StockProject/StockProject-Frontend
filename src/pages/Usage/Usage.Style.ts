import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const UsageContainer = styled('div')({
  position: 'relative',
  padding: '48px 20px',
  background: theme.colors.sub_black,

  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

const UsageTitle = styled.p({
  ...theme.font.heading24Semibold,
  color: theme.colors.sub_white,
  margin: '0',
});

const UsageStepContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
});

const UsageStepItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',

  ['>img']: {
    maxWidth: '320px',
    minWidth: '0',
    width: '100%',
  },
});

const UsageStepItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px',

  ['>p']: {
    margin: '0',

    ['&.index']: {
      width: '20px',
      height: '20px',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
      background: theme.colors.primary50,

      ...theme.font.body16Semibold,
      color: theme.colors.primary0,
    },

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.primary0,
    },
  },
});

export { UsageContainer, UsageTitle, UsageStepContainer, UsageStepItemContainer, UsageStepItemTitle };
