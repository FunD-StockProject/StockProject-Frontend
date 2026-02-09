import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const StepHeaderContainer = styled.div(
  ({ stepPercent }: { stepPercent: number }) => ({
    ['>span.divider']: {
      ['::after']: {
        width: `${stepPercent}%`,
      },
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    ['>span.divider']: {
      background: theme.colors.sub_gray11,
      height: '4px',
      position: 'relative',

      ['::after']: {
        content: '""',
        background: theme.colors.sub_gray9,
        height: '4px',
        position: 'absolute',
      },
    },
  },
);

const StepHeaderContents = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 20px',
  gap: '12px',

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: theme.colors.sub_gray5,
  },

  ['>p']: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    ...theme.font.body18Semibold,
    color: theme.colors.sub_white,
    margin: '0',
  },
});

const StepContainer = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0px',
  flexGrow: '1',
});

const StepTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '0 20px',

  ['>p']: {
    margin: '0',
    whiteSpace: 'pre-line',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_white,
    },

    ['&.description']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

const StepButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',
  marginTop: 'auto',
  padding: '0 20px',

  ['>button']: {
    width: '100%',
    padding: '10px 0px',
    ...theme.font.body18Semibold,
    margin: '0',
    border: 'none',
    borderRadius: '8px',

    [':first-of-type']: {
      background: theme.colors.sub_gray11,
      color: theme.colors.sub_gray5,
    },

    [':last-of-type']: {
      background: theme.colors.sub_blue6,
      color: theme.colors.sub_white,

      ['&:disabled']: {
        background: theme.colors.sub_gray8,
        color: theme.colors.sub_black,
      },
    },
  },
});

export { StepHeaderContainer, StepHeaderContents, StepContainer, StepTitleContainer, StepButtonContainer };
