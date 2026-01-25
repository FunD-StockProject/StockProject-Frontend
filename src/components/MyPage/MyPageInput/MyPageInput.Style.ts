import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const MyPageInputContainer = styled.div(
  ({ isError }: { isError: boolean }) => ({
    ['>p']: {
      color: isError ? theme.colors.sub_red : theme.colors.sub_gray3,
    },

    ['>input']: {
      outline: isError ? `1px solid ${theme.colors.sub_red}` : 'none',
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 20px',

    ['>p']: {
      margin: '0',
      ...theme.font.body16Medium,
    },

    ['>input']: {
      border: 'none',
      padding: '20px 16px',
      height: '48px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      background: theme.colors.sub_gray11,
      color: theme.colors.sub_gray3,
      ...theme.font.body16Medium,

      ['&::placeholder']: {
        color: theme.colors.sub_gray8,
      },
    },
  },
);

const MyPageInputSubContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  height: '20px',

  ['>p']: {
    margin: '0',

    ['&.error']: {
      padding: '0 4px',
      ...theme.font.body14Medium,
      color: theme.colors.sub_red,
    },

    ['&.sub']: {
      ...theme.font.body14Regular,
      color: theme.colors.sub_gray3,

      ['>span']: {
        ...theme.font.body14Semibold,
      },
    },
  },
});

export { MyPageInputContainer, MyPageInputSubContainer };
