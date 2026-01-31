import styled from '@emotion/styled';
import { deltaToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  boxSizing: 'border-box',
  padding: '0px 20px',
});

const TitleHeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',

  ['p']: {
    margin: '0',

    ['&.name']: {
      ...theme.font.heading24Semibold,
      color: theme.colors.sub_white,
    },

    ['&.price']: {
      ...theme.font.heading24Semibold,
      color: theme.colors.sub_white,
    },
  },
});

const TitleDetailContainer = styled.div(
  ({ delta }: { delta: number }) => ({
    ['p.price-diff']: {
      color: deltaToColor(delta) ?? theme.colors.sub_gray7,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    ['p']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray4,
      margin: '0',
    },

    ['>span']: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',

      ['>img']: {
        height: '13px',
      },
    },

    ['& > *:not(:last-child)']: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      ['::after']: {
        content: '""',
        display: 'block',
        width: '1px',
        height: '12px',
        background: theme.colors.sub_gray6,
      },
    },
  },
);

export { TitleContainer, TitleHeaderContainer, TitleDetailContainer };
