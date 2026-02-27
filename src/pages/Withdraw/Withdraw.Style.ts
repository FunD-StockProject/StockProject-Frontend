import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const WithdrawTitleContainer = styled.div({
  display: 'flex',
  gap: '10px',
  width: '100%',
  alignItems: 'center',
  padding: '0px 20px',
  boxSizing: 'border-box',

  ['>img']: {
    width: '90px',
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: '999px',
  },

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',

    ['>p']: {
      margin: '0',

      ['&.title']: {
        color: '#F0F0F1',
        fontSize: '20px',
        fontWeight: '600',
      },
      ['&.desc']: {
        color: '#9A9C9E',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
  },
});

const WithdrawButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '0px 20px',
  boxSizing: 'border-box',
  width: '100%',

  ['>button']: {
    background: '#1D1E1F',
    borderRadius: '10px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    ...theme.font.body16Semibold,
    color: theme.colors.sub_gray3,

    ['>svg']: {
      width: '28px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
});

const WithdrawContent = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '32px 0px',
  boxSizing: 'border-box',
  flexGrow: '1',
  color: theme.colors.sub_gray5,

  ['>hr']: {
    background: '#1D1E1F',
    height: '4px',
    width: '100%',
    border: 'none',
  },

  ['>p']: {
    margin: '0',
    padding: '0 20px',
    width: '100%',
    boxSizing: 'border-box',
    fontsize: '16px',
    fontWeight: '500',
  },
});

const RegisterButtonContainer = styled.div({
  padding: '0px 24px 24px',
  width: '100%',
  boxSizing: 'border-box',
  gap: '16px',
  display: 'flex',
  flexDirection: 'column',
});

const RegisterButton = styled.button(
  ({ color }: { color: 'primary' | 'secondary' }) => ({
    background: color === 'primary' ? '#3457FD' : '#525658',
    color: color === 'primary' ? 'white' : '#101010',
  }),
  {
    width: '100%',
    fontSize: '18px',
    fontWeight: '600',
    height: '48px',
    borderRadius: '8px',
    padding: '10px 0px',
    border: 'none',
  },
);

const RegisterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  flexGrow: '1',
});

const RegisterHeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '9px',

  ['>div']: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 20px',
    boxSizing: 'border-box',
    gap: '12px',

    ['>svg,>span']: {
      width: '32px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },

    ['>p']: {
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#FFFFFF',
      flexGrow: '1',
      textAlign: 'center',
    },
  },

  ['>span.divider']: {
    background: '#1D1E1F',
    height: '4px',
  },
});

export {
  WithdrawTitleContainer,
  WithdrawButtonContainer,
  WithdrawContent,
  RegisterButtonContainer,
  RegisterButton,
  RegisterContainer,
  RegisterHeaderContainer,
};
