import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const LabTutorialContainer = styled.div({
  paddingTop: '28px',
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
});

const LabTutorialListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  padding: '0 20px',

  ['>p']: {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray8,
    wordBreak: 'keep-all',
    margin: '0',
  },

  ['>span.divider']: {
    height: '4px',
    width: '100%',
    background: theme.colors.sub_gray11,
  },
});

const LabTutorialItemContaienr = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '14px 16px',
  background: theme.colors.sub_gray11,
  borderRadius: '8px',
  alignItems: 'center',

  ['>img']: {
    height: '258px',
  },

  ['>p']: {
    margin: '0',
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray3,
    textAlign: 'center',
    wordBreak: 'keep-all',
    whiteSpace: 'nowrap',
  },
});

const TutorialItemTitleContainer = styled.div({
  padding: '8px 20px',
  background: theme.colors.sub_black,
  border: `1px solid ${theme.colors.sub_gray9}`,
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  borderRadius: '999px',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,

    ['&.index']: {
      color: theme.colors.sub_white,
      whiteSpace: 'nowrap',
    },

    ['&.text']: {
      color: theme.colors.sub_gray2,
      textAlign: 'center',
      wordBreak: 'keep-all',
      whiteSpace: 'nowrap',
    },
  },

  ['>span.divider']: {
    height: '12px',
    width: '1px',
    background: theme.colors.sub_gray8,
  },
});

export { LabTutorialContainer, LabTutorialListContainer, LabTutorialItemContaienr, TutorialItemTitleContainer };
